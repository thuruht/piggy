import { Hono } from "hono";
import { Env } from "../types";
import { rateLimitMiddleware } from "../middleware/rateLimit";
import { nanoid } from "nanoid";

const upvotes = new Hono<{ Bindings: Env }>();

upvotes.post("/:markerId", async (c) => {
  const { markerId } = c.req.param();
  const rateLimitResult = await rateLimitMiddleware(c, "upvotes");
  if (rateLimitResult) return rateLimitResult;

  try {
    const { type, magicCode } = await c.req.json();

    if (!magicCode) {
      return c.json({ error: "Missing magicCode" }, 400);
    }

    const upvoteKey = `upvoted_${type}_${markerId}_${magicCode}`;
    const hasUpvoted = await c.env.PIGMAP_CONFIG.get(upvoteKey);

    if (hasUpvoted) {
      return c.json({ error: "Already upvoted" }, 429);
    }

    // Add to upvotes table
    await c.env.LIVESTOCK_DB.prepare(
      "INSERT INTO upvotes (id, markerId, user_identifier, timestamp, type) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(nanoid(), markerId, magicCode, new Date().toISOString(), type)
      .run();

    // If ongoing, extend expiration
    if (type === "ongoing") {
      const expiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ).toISOString();
      await c.env.LIVESTOCK_DB.prepare(
        "UPDATE markers SET expires_at = ? WHERE id = ?"
      )
        .bind(expiresAt, markerId)
        .run();
    }

    await c.env.PIGMAP_CONFIG.put(upvoteKey, "true", { expirationTtl: 86400 }); // 24 hours

    // Get total upvotes for 'regular' type
    const { results } = await c.env.LIVESTOCK_DB.prepare(
      "SELECT COUNT(*) as upvotes FROM upvotes WHERE markerId = ? AND type = 'regular'"
    )
      .bind(markerId)
      .all<{ upvotes: number }>();

    const upvotesCount = results[0]?.upvotes ?? 0;

    return c.json({
      message: "Upvoted successfully",
      upvotes: upvotesCount,
    });
  } catch (error) {
    console.error("Upvote error:", error);
    return c.json({ error: "Failed to upvote" }, 500);
  }
});

export default upvotes;
