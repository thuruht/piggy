import { Hono } from 'hono';
import { Env } from '../types';
import { sanitizeHTML } from '../utils/sanitize';
import { nanoid } from 'nanoid';
import { CONFIG } from '../config';
import { generateRandomName } from '../utils/pseudonyms';

const comments = new Hono<{ Bindings: Env }>();

// GET /api/comments/:markerId - Fetch all comments for a marker
comments.get('/:markerId', async (c) => {
  const { markerId } = c.req.param();

  try {
    const { results } = await c.env.LIVESTOCK_DB.prepare(
      `
      SELECT
        c.id,
        c.content,
        c.timestamp,
        p.pseudonym as author
      FROM comments c
      JOIN pseudonyms p ON c.magic_code = p.magic_code
      WHERE c.markerId = ?
      ORDER BY c.timestamp DESC
      `
    ).bind(markerId).all();

    return c.json(results);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return c.json({ error: 'Failed to fetch comments' }, 500);
  }
});

// POST /api/comments - Create a new comment
comments.post('/', async (c) => {
  try {
    let { markerId, text, magicCode } = await c.req.json();

    if (!markerId || !text) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (text.length > CONFIG.MAX_COMMENT_LENGTH) {
      return c.json({ error: `Comment must be less than ${CONFIG.MAX_COMMENT_LENGTH} characters` }, 400);
    }

    if (!magicCode) {
      magicCode = nanoid();
      const pseudonym = generateRandomName();
      await c.env.LIVESTOCK_DB.prepare(
        'INSERT INTO pseudonyms (magic_code, pseudonym) VALUES (?, ?)'
      ).bind(magicCode, pseudonym).run();
    }

    const sanitizedText = sanitizeHTML(text);

    await c.env.LIVESTOCK_DB.prepare(
      'INSERT INTO comments (id, markerId, content, magic_code, timestamp) VALUES (?, ?, ?, ?, ?)'
    ).bind(nanoid(), markerId, sanitizedText, magicCode, new Date().toISOString()).run();

    return c.json({ success: true, magicCode }, 201);

  } catch (error) {
    console.error('Failed to save comment:', error);
    return c.json({ error: 'Failed to save comment' }, 500);
  }
});

// POST /api/comments/claim - Claim a pseudonym
comments.post('/claim', async (c) => {
  try {
    const { magicCode, pseudonym } = await c.req.json();

    if (!magicCode || !pseudonym) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    await c.env.LIVESTOCK_DB.prepare(
      'INSERT OR REPLACE INTO pseudonyms (magic_code, pseudonym) VALUES (?, ?)'
    ).bind(magicCode, pseudonym).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Failed to claim pseudonym:', error);
    return c.json({ error: 'Failed to claim pseudonym' }, 500);
  }
});

export default comments;