import { Context } from 'hono';
import { Env } from '../types';

export async function monitoringMiddleware(c: Context<{ Bindings: Env }>, next: () => Promise<void>) {
  const start = Date.now();
  const path = new URL(c.req.url).pathname;

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;

  // Log slow requests
  if (duration > 1000) {
    console.warn(`Slow request: ${path} took ${duration}ms`);
  }

  // Log errors
  if (status >= 500) {
    console.error(`Server error: ${path} returned ${status}`);
  }

  // Add metrics header
  c.res.headers.set('X-Response-Time', `${duration}ms`);
}
