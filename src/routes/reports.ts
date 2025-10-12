import { Hono } from "hono";
import { Env } from "../types";
import { CONFIG } from "../config";
import { rateLimitMiddleware } from "../middleware/rateLimit";

const reports = new Hono<{ Bindings: Env }>();

// POST /api/markers/:id/report
reports.post("/:id/report", async (c) => {
  const rateLimitResult = await rateLimitMiddleware(c, "reports");
  if (rateLimitResult) return rateLimitResult;

  try {
    const id = c.req.param("id");
    const { magicCode } = await c.req.json();
    const sessionKey = `reported:${id}:${magicCode}`;

    // Check if already reported
    const alreadyReported = await c.env.PIGMAP_CONFIG.get(sessionKey);
    if (alreadyReported) {
      return c.json({ error: "Already reported" }, 400);
    }

    // Increment report count and check hide logic
    const result = (await c.env.LIVESTOCK_DB.prepare(
      `
  UPDATE markers
  SET reportCount = reportCount + 1,
      hidden = CASE 
                WHEN (reportCount + 1 >= ?) AND ((reportCount + 1) > (upvotes * 2)) THEN 1 
                ELSE 0 
              END
  WHERE id = ?
  RETURNING hidden
`
    )
      .bind(CONFIG.REPORT_THRESHOLD, id)
      .first()) as { hidden: number } | null;

    // Mark as reported for this session (24 hours)
    await c.env.PIGMAP_CONFIG.put(sessionKey, "true", { expirationTtl: 86400 });

    return c.json({ success: true, hidden: result?.hidden || 0 });
  } catch (error) {
    console.error("Report error:", error);
    return c.json({ error: "Failed to report marker" }, 500);
  }
});

export default reports;
