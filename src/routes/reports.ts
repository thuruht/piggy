import { Hono } from 'hono';
import { Env } from '../types';
import { CONFIG } from '../config';
import { rateLimitMiddleware } from '../middleware/rateLimit';

const reports = new Hono<{ Bindings: Env }>();

// POST /api/markers/:id/report
reports.post('/:id', async (c) => {
  const rateLimitResult = await rateLimitMiddleware(c, 'reports');
  if (rateLimitResult) return rateLimitResult;

  try {
    const id = c.req.param('id');
    const ip = c.req.header('CF-Connecting-IP') || 'unknown';
    const sessionKey = `reported:${id}:${ip}`;

    // Check if already reported
    const alreadyReported = await c.env.PIGMAP_CONFIG.get(sessionKey);
    if (alreadyReported) {
      return c.json({ error: 'Already reported' }, 400);
    }

    // Increment report count
    await c.env.LIVESTOCK_DB.prepare(`
      UPDATE markers
      SET reportCount = reportCount + 1,
          hidden = CASE WHEN reportCount + 1 >= ? THEN 1 ELSE 0 END
      WHERE id = ?
    `).bind(CONFIG.REPORT_THRESHOLD, id).run();

    // Mark as reported for this session (24 hours)
    await c.env.PIGMAP_CONFIG.put(sessionKey, 'true', { expirationTtl: 86400 });

    return c.json({ success: true });
  } catch (error) {
    console.error('Report error:', error);
    return c.json({ error: 'Failed to report marker' }, 500);
  }
});

export default reports;