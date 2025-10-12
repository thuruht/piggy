import { Context } from 'hono';
import { Env } from '../types';
import { CONFIG } from '../config';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export async function rateLimitMiddleware(
  c: Context<{ Bindings: Env }>,
  endpoint: keyof typeof CONFIG.RATE_LIMITS
) {
  const clonedReq = c.req.raw.clone();
  let identifier: string | undefined;
  try {
    const body = await clonedReq.json();
    identifier = body.magicCode;
  } catch (e) {
    // ignore if body is not present or not json
  }

  // If no magic code, we can't effectively rate limit without using IP.
  // This is a design decision to enforce privacy.
  if (!identifier) {
    identifier = "anonymous"; // This will apply the rate limit globally for all anonymous requests.
  }

  const key = `ratelimit:${endpoint}:${identifier}`;

  const stored = await c.env.PIGMAP_CONFIG.get<RateLimitEntry>(key, 'json');
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour

  if (stored && stored.resetAt > now) {
    if (stored.count >= CONFIG.RATE_LIMITS[endpoint]) {
      return c.json({ error: 'Rate limit exceeded. Try again later.' }, 429);
    }

    await c.env.PIGMAP_CONFIG.put(key, JSON.stringify({
      count: stored.count + 1,
      resetAt: stored.resetAt
    }), { expirationTtl: Math.ceil((stored.resetAt - now) / 1000) });
  } else {
    await c.env.PIGMAP_CONFIG.put(key, JSON.stringify({
      count: 1,
      resetAt: now + windowMs
    }), { expirationTtl: Math.ceil(windowMs / 1000) });
  }

  return null; // Continue to next handler
}