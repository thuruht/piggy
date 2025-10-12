import { Context, Next } from 'hono';

export async function cspMiddleware(c: Context, next: Next) {
  await next();

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // 'unsafe-inline' is needed for inline scripts, consider refactoring to remove them
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // 'unsafe-inline' is needed for inline styles, consider refactoring to remove them
    "img-src 'self' data: https://*.tile.openstreetmap.org https://server.arcgisonline.com https://map1.vis.earthdata.nasa.gov",
    "connect-src 'self' wss: ws: https://nominatim.openstreetmap.org",
    "font-src 'self' https://cdn.jsdelivr.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');

  c.res.headers.set('Content-Security-Policy', csp);
  c.res.headers.set('X-Content-Type-Options', 'nosniff');
  c.res.headers.set('X-Frame-Options', 'DENY');
  c.res.headers.set('X-XSS-Protection', '1; mode=block');
}
