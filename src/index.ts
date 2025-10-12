import { nanoid } from "nanoid";
import { Hono } from "hono";
import { Env } from "./types";
import markers from "./routes/markers";
import reports from "./routes/reports";
import upvotes from "./routes/upvotes";
import comments from "./routes/comments";
import { CONFIG } from "./config";
import { getTrackerStub } from "./utils/durable";

import { monitoringMiddleware } from "./middleware/monitoring";

const app = new Hono<{ Bindings: Env }>();

// Apply monitoring middleware to API routes only
app.use("/api/*", monitoringMiddleware);

// API routes
app.route("/api/markers", markers);
app.route("/api/reports", reports);
app.route("/api/upvotes", upvotes);
app.route("/api/comments", comments);

app.post("/api/upload-url", async (c) => {
  const { filename, contentType } = await c.req.json();
  const key = `media/${nanoid()}-${filename}`;

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


export default app;

export { LivestockReport } from "./durable_objects/LivestockReport";