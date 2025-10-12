import { Hono } from "hono";
import { Env, Marker, MarkerFromDB, NewMarker, MarkerMagicCode } from "../types";
import { CONFIG } from "../config";
import { rateLimitMiddleware } from "../middleware/rateLimit";
import { sanitizeHTML, validateMarkerInput } from "../utils/sanitize";
import { nanoid } from "nanoid";
import { getTrackerStub } from "../utils/durable";
import reports from "./reports";

const markers = new Hono<{ Bindings: Env }>();

// Mount other routes
markers.route("/", reports);

// GET /api/markers - Fetch all markers
markers.get("/", async (c) => {
  const { filter } = c.req.query();
  const showArchived = filter === "all";

  try {
    let query = `
      SELECT
        m.id,
        m.type,
        m.title,
        m.description,
        m.latitude,
        m.longitude,
        m.timestamp,
        m.is_archived,
        m.expires_at,
        (SELECT type FROM upvotes WHERE markerId = m.id ORDER BY timestamp DESC LIMIT 1) as upvote_type,
        GROUP_CONCAT(md.url) as mediaUrls,
        GROUP_CONCAT(md.type) as mediaTypes
      FROM markers m
      LEFT JOIN media md ON m.id = md.markerId
      WHERE m.report_count < ? AND m.hidden = 0
    `;

    if (!showArchived) {
      query += ` AND m.is_archived = 0`;
    }

    query += `
      GROUP BY m.id
      ORDER BY m.timestamp DESC
      LIMIT 200
    `;

    const result = await c.env.LIVESTOCK_DB.prepare(query)
      .bind(CONFIG.REPORT_THRESHOLD)
      .all<MarkerFromDB>();

    const markers: Marker[] = result.results.map((row) => ({
      id: row.id,
      title: row.title,
      type: row.type,
      description: row.description,
      coords: [parseFloat(row.latitude), parseFloat(row.longitude)],
      timestamp: row.timestamp,
      magicCode: row.magic_code,
      media: row.mediaUrls ? row.mediaUrls.split(",") : [],
      upvoteType: row.upvote_type,
    }));

    return c.json(markers);
  } catch (error) {
    console.error("Markers fetch error:", error);
    return c.json({ error: "Failed to fetch markers" }, 500);
  }
});

// POST /api/markers - Create new marker
markers.post("/", async (c) => {
  // Rate limiting
  const rateLimitResult = await rateLimitMiddleware(c, "markers");
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await c.req.json();

    // Validate input
    const validation = validateMarkerInput(body);
    if (!validation.valid) {
      return c.json({ error: validation.errors.join(", ") }, 400);
    }

    // Sanitize inputs
    const marker: NewMarker = {
      id: nanoid(),
      title: sanitizeHTML(body.title.substring(0, CONFIG.MAX_TITLE_LENGTH)),
      type: body.type,
      description: sanitizeHTML(
        body.description.substring(0, CONFIG.MAX_DESCRIPTION_LENGTH)
      ),
      coords: body.coords,
      timestamp: new Date().toISOString(),
      magicCode: body.magicCode || nanoid(10),
      media: Array.isArray(body.media) ? body.media : [],
    };

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Insert into D1
    await c.env.LIVESTOCK_DB.prepare(
      `
      INSERT INTO markers (id, title, type, description, latitude, longitude, timestamp, magic_code, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    )
      .bind(
        marker.id,
        marker.title,
        marker.type,
        marker.description,
        marker.coords[0],
        marker.coords[1],
        marker.timestamp,
        marker.magicCode,
        expiresAt.toISOString()
      )
      .run();

    // Insert media if any
    for (const mediaUrl of marker.media) {
      const mediaType = getMediaType(mediaUrl);
      await c.env.LIVESTOCK_DB.prepare(
        `
        INSERT INTO media (id, markerId, url, type)
        VALUES (?, ?, ?, ?)
      `
      )
        .bind(nanoid(), marker.id, mediaUrl, mediaType)
        .run();
    }

    // Broadcast via Durable Object
    try {
      const durableStub = getTrackerStub(c.env);
      await durableStub.fetch("http://tracker/broadcast", {
        method: "POST",
        body: JSON.stringify({ type: "marker_added", marker }),
      });
    } catch (broadcastError) {
      console.warn("Broadcast failed:", broadcastError);
    }

    return c.json({ success: true, id: marker.id, marker }, 201);
  } catch (error) {
    console.error("Marker creation error:", error);
    return c.json({ error: "Failed to create marker" }, 500);
  }
});

// DELETE /api/markers/:id - Delete marker
markers.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const magicCode = c.req.header("X-Magic-Code");

    // Verify ownership via magic code
    const marker = await c.env.LIVESTOCK_DB.prepare(
      `
      SELECT magic_code FROM markers WHERE id = ?
    `
    )
      .bind(id)
      .first<MarkerMagicCode>();

    if (!marker) {
      return c.json({ error: "Marker not found" }, 404);
    }

    if (marker.magic_code !== magicCode) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    console.log(`Deleting marker ${id}`);

    // Delete marker and related data (CASCADE will handle media/comments)
    await c.env.LIVESTOCK_DB.prepare(
      `
      DELETE FROM markers WHERE id = ?
    `
    )
      .bind(id)
      .run();

    return c.json({ success: true });
  } catch (error) {
    console.error("Marker deletion error:", error);
    return c.json({ error: "Failed to delete marker" }, 500);
  }
});

// Helper function
function getMediaType(url: string): "image" | "video" | "audio" {
  const ext = url.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "avif", "bmp"].includes(ext || ""))
    return "image";
  if (["mp4", "webm", "ogg", "mov", "avi"].includes(ext || "")) return "video";
  return "audio";
}

export default markers;