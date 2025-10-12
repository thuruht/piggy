import { Hono } from "hono";
import { Env } from "../types";
import { nanoid } from "nanoid";

const upvotes = new Hono<{ Bindings: Env }>();

upvotes.post("/:markerId", async (c) => {
  const { markerId } = c.req.param();
  const { type } = await c.req.json();
  const clientIp = c.req.header("cf-connecting-ip");

  if (!clientIp) {
    return c.json({ error: "Could not determine client IP" }, 400);
  }

  const upvoteKey = `upvoted_${type}_${markerId}_${clientIp}`;
  const hasUpvoted = await c.env.PIGMAP_CONFIG.get(upvoteKey);

  if (hasUpvoted) {
    return c.json({ error: "Already upvoted" }, 429);
  }

  try {
    // Add to upvotes table
    await c.env.LIVESTOCK_DB.prepare(
      "INSERT INTO upvotes (id, markerId, timestamp, type) VALUES (?, ?, ?, ?)"
    )
      .bind(nanoid(), markerId, new Date().toISOString(), type)
      .run();

    // If ongoing, extend expiration
    if (type === "ongoing") {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await c.env.LIVESTOCK_DB.prepare(
        "UPDATE markers SET expiresAt = ? WHERE id = ?"
      )
        .bind(expiresAt, markerId)
        .run();
    }

    await c.env.PIGMAP_CONFIG.put(upvoteKey, "true", { expirationTtl: 86400 }); // 24 hours

    // Get total upvotes
    const { results: upvoteResults } = await c.env.LIVESTOCK_DB.prepare(
      "SELECT COUNT(*) as upvotes FROM upvotes WHERE markerId = ? AND type = 'regular'"
    )
      .bind(markerId)
      .all();

    const upvotes = upvoteResults[0].upvotes;

    return c.json({
      message: "Upvoted successfully",
      upvotes,
    });
  } catch (error) {
    console.error("Upvote error:", error);
    return c.json({ error: "Failed to upvote" }, 500);
  }
});

export default upvotes;