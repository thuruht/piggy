import { Hono } from 'hono';
import { Env } from '../types';
import { sanitizeHTML } from '../utils/sanitize';
import { nanoid } from 'nanoid';
import { CONFIG } from '../config';

const comments = new Hono<{ Bindings: Env }>();

// GET /api/comments/:markerId - Fetch all comments for a marker
comments.get('/:markerId', async (c) => {
  const { markerId } = c.req.param();

  try {
    const { results } = await c.env.LIVESTOCK_DB.prepare(
      'SELECT * FROM comments WHERE markerId = ? ORDER BY createdAt DESC'
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
    const { markerId, text, author } = await c.req.json();

    if (!markerId || !text || !author) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (text.length > CONFIG.MAX_COMMENT_LENGTH) {
      return c.json({ error: `Comment must be less than ${CONFIG.MAX_COMMENT_LENGTH} characters` }, 400);
    }

    if (author.length > CONFIG.MAX_AUTHOR_LENGTH) {
      return c.json({ error: `Author must be less than ${CONFIG.MAX_AUTHOR_LENGTH} characters` }, 400);
    }

    const sanitizedText = sanitizeHTML(text);
    const sanitizedAuthor = sanitizeHTML(author);

    await c.env.LIVESTOCK_DB.prepare(
      'INSERT INTO comments (id, markerId, text, author, timestamp) VALUES (?, ?, ?, ?, ?)'
    ).bind(nanoid(), markerId, sanitizedText, sanitizedAuthor, new Date().toISOString()).run();

    return c.json({ success: true }, 201);

  } catch (error) {
    console.error('Failed to save comment:', error);
    return c.json({ error: 'Failed to save comment' }, 500);
  }
});

export default comments;
