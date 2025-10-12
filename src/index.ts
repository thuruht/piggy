import { nanoid } from "nanoid";
import { Hono } from "hono";
import { Env } from "./types";
import markers from "./routes/markers";
import upvotes from "./routes/upvotes";
import comments from "./routes/comments";
import { CONFIG } from "./config";
import { getTrackerStub } from "./utils/durable";
import { sanitizeFilename } from "./utils/sanitize";
import { monitoringMiddleware } from "./middleware/monitoring";
import { cspMiddleware } from "./middleware/csp";

const app = new Hono<{ Bindings: Env }>();

// Apply security middleware
app.use("*", cspMiddleware);

// Apply monitoring middleware to API routes only
app.use("/api/*", monitoringMiddleware);

// API routes
app.route("/api/markers", markers);
app.route("/api/upvotes", upvotes);
app.route("/api/comments", comments);

app.post("/api/upload-url", async (c) => {
  const { filename, contentType, contentLength } = await c.req.json();

  // Validate content type
  const mediaType = contentType.split('/')[0];
  if (!['image', 'video', 'audio'].includes(mediaType) || !CONFIG.ALLOWED_MIME_TYPES[mediaType].includes(contentType)) {
    return c.json({ error: "Invalid file type" }, 400);
  }

  // Validate content length
  if (contentLength > CONFIG.MAX_FILE_SIZES[mediaType]) {
    return c.json({ error: `File size exceeds the limit of ${CONFIG.MAX_FILE_SIZES[mediaType] / 1024 / 1024}MB` }, 400);
  }

  const sanitizedFilename = sanitizeFilename(filename);
  const key = `media/${nanoid()}-${sanitizedFilename}`;

  const presignedUrl = await c.env.LIVESTOCK_MEDIA.createPresignedUrl(
    "PUT",
    key,
    {
      expires: 3600, // URL expires in 1 hour
      httpMetadata: { contentType },
    },
  );

  return c.json({
    uploadUrl: presignedUrl,
    publicUrl: `/media/${key}`,
  });
});

app.get("/ws", async (c) => {
  const durableStub = getTrackerStub(c.env);
  return durableStub.fetch(CONFIG.DO_URLS.WEBSOCKET, c.req.raw);
});

const scheduledHandler = async (event, env, ctx) => {
  try {
    const { results } = await env.LIVESTOCK_DB.prepare(
      `UPDATE markers SET isArchived = 1 WHERE expiresAt < ? AND isArchived = 0`
    )
      .bind(new Date().toISOString())
      .run();

    console.log(`Archived ${results.changes} markers.`);
  } catch (error) {
    console.error("Failed to archive markers:", error);
  }
};

export default {
  fetch: app.fetch,
  scheduled: scheduledHandler,
};

export { LivestockReport } from "./durable_objects/LivestockReport";