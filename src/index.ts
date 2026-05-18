import { nanoid } from "nanoid";
// Force redeploy: 2025-10-21T00:31:02.000Z
import { Hono } from "hono";
import { Env } from "./types";
import markers from "./routes/markers";
import upvotes from "./routes/upvotes";
import comments from "./routes/comments";
import { CONFIG } from "./config";
import { getTrackerStub } from "./utils/durable";
import { sanitizeFilename, stripExif } from "./utils/sanitize";
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

  return c.json({
    uploadUrl: `/api/upload/${key}`,
    publicUrl: `/media/${key}`,
  });
});

app.put("/api/upload/:key{.+}", async (c) => {
  const { key } = c.req.param();
  const contentType = c.req.header('content-type');

  try {
    const imageBlob = await c.req.blob();
    const strippedBlob = await stripExif(imageBlob);

    await c.env.LIVESTOCK_MEDIA.put(key, strippedBlob, {
      httpMetadata: {
        contentType: contentType,
        cacheControl: 'public, max-age=31536000',
      },
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error stripping metadata or uploading to R2:', error);
    return c.json({ error: "Error processing file" }, 500);
  }
});

app.get("/ws", async (c) => {
  const durableStub = getTrackerStub(c.env);
  return durableStub.fetch(c.req.raw);
});

const scheduledHandler = async (event, env, ctx) => {
  try {
    const { results } = await env.LIVESTOCK_DB.prepare(
      `UPDATE markers SET is_archived = 1 WHERE expires_at < ? AND is_archived = 0`
    )
      .bind(new Date().toISOString())
      .run();

    console.log(`Archived ${results.changes} markers.`);
  } catch (error) {
    console.error("Failed to archive markers:", error);
  }
};

app.get("*", (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;

export { LivestockReport } from "./durable_objects/LivestockReport";