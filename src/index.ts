import { Hono } from "hono";
import { Env } from "./types";
import markers from "./routes/markers";
import reports from "./routes/reports";
import upvotes from "./routes/upvotes";
import { CONFIG } from "./config";

import { monitoringMiddleware } from "./middleware/monitoring";

const app = new Hono<{ Bindings: Env }>();

// Apply monitoring middleware to API routes only
app.use("/api/*", monitoringMiddleware);

// API routes
app.route("/api/markers", markers);
app.route("/api/reports", reports);
app.route("/api/upvotes", upvotes);

// Enhanced Media Upload
async function handleDirectUpload(request: Request, env: Env, headers: any) {
  try {
    const url = new URL(request.url);
    const key = url.pathname.substring("/api/upload-handler/".length);

    if (!key) {
      return new Response(JSON.stringify({ error: "Missing key" }), {
        status: 400,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const contentLength = parseInt(
      request.headers.get("Content-Length") || "0"
    );
    const contentType = request.headers.get("Content-Type") || "";

    let mediaType: "image" | "video" | "audio" = "image";
    if (contentType.startsWith("video/")) mediaType = "video";
    else if (contentType.startsWith("audio/")) mediaType = "audio";

    const maxSize = CONFIG.MAX_FILE_SIZES[mediaType];

    if (contentLength > maxSize) {
      return new Response(
        JSON.stringify({
          error: `File too large. Max ${Math.round(
            maxSize / (1024 * 1024)
          )}MB for ${mediaType}`,
        }),
        {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        }
      );
    }

    const allowedTypes = CONFIG.ALLOWED_MIME_TYPES[mediaType];
    if (!allowedTypes.includes(contentType)) {
      return new Response(
        JSON.stringify({
          error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}`,
        }),
        {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        }
      );
    }

    await env.LIVESTOCK_MEDIA.put(key, request.body, {
      httpMetadata: {
        contentType: contentType,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Direct upload error:", error);
    return new Response(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
}

app.put("/api/upload-handler/*", async (c) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "X-Robots-Tag": "noindex, nofollow",
    "Referrer-Policy": "no-referrer",
  };
  return handleDirectUpload(c.req.raw, c.env, headers);
});

// Serve static assets
app.get("*", (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

app.get("/ws", async (c) => {
  const durableId = c.env.LIVESTOCK_REPORTS.idFromName("tracker");
  const durableStub = c.env.LIVESTOCK_REPORTS.get(durableId);
  return durableStub.fetch("http://tracker/websocket", c.req.raw);
});

export default app;

export { LivestockReport } from "./durable_objects/LivestockReport";
