import { nanoid } from "nanoid";
import { Hono } from "hono";
import { Env } from "./types";
import markers from "./routes/markers";
import reports from "./routes/reports";
import upvotes from "./routes/upvotes";
import search from "./routes/search";
import { CONFIG } from "./config";

import { monitoringMiddleware } from "./middleware/monitoring";

const app = new Hono<{ Bindings: Env }>();

// Apply monitoring middleware to API routes only
app.use("/api/*", monitoringMiddleware);

// API routes
app.route("/api/markers", markers);
app.route("/api/reports", reports);
app.route("/api/upvotes", upvotes);
app.route("/api/search", search);

app.post("/api/upload-url", async (c) => {
  const { filename, contentType } = await c.req.json();
  const key = `media/${nanoid()}-${filename}`;

  // Generate a signed URL for PUT request
  const signedUrl = await c.env.LIVESTOCK_MEDIA.createSignedUrl("put", key, {
    httpMetadata: { contentType },
    expires: 3600, // URL expires in 1 hour
  });

  return c.json({
    uploadUrl: signedUrl,
    publicUrl: `/media/${key}`,
  });
});

app.get("/ws", async (c) => {
  const durableId = c.env.LIVESTOCK_REPORTS.idFromName("tracker");
  const durableStub = c.env.LIVESTOCK_REPORTS.get(durableId);
  return durableStub.fetch("http://tracker/websocket", c.req.raw);
});

// Serve static assets from the assets service.
app.get("*", (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;

export { LivestockReport } from "./durable_objects/LivestockReport";
