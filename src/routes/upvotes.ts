import { Hono } from "hono";
import { Env } from "../types";
import { rateLimitMiddleware } from "../middleware/rateLimit";

const upvotes = new Hono<{ Bindings: Env }>();

// POST /api/upvotes/:id
upvotes.post("/:id", async (c) => {
  const rateLimitResult = await rateLimitMiddleware(c, "upvotes"); // Using correct rate limit
  if (rateLimitResult) return rateLimitResult;

  try {
    const id = c.req.param("id");
    const ip = c.req.header("CF-Connecting-IP") || "unknown";
    const sessionKey = `upvoted:${id}:${ip}`;

    // Check if already upvoted
    const alreadyUpvoted = await c.env.PIGMAP_CONFIG.get(sessionKey);
    if (alreadyUpvoted) {
      return c.json({ error: "Already upvoted" }, 400);
    }

    // Increment upvote count in D1
    const result = await c.env.LIVESTOCK_DB.prepare(
      `UPDATE markers SET upvotes = upvotes + 1 WHERE id = ? RETURNING upvotes`
    )
      .bind(id)
      .first<{ upvotes: number }>();

    // Mark as upvoted for this session (24 hours)
    await c.env.PIGMAP_CONFIG.put(sessionKey, "true", { expirationTtl: 86400 });

    return c.json({ success: true, upvotes: result?.upvotes ?? 0 });
  } catch (error) {
    console.error("Upvote error:", error);
    return c.json({ error: "Failed to upvote marker" }, 500);
  }
});

export default upvotes;
