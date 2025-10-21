import { Context, Next } from 'hono';

export async function cspMiddleware(c, next) {
  await next();

  // Skip CSP for WebSocket upgrade requests
  if (c.req.path === '/ws') {
    return;
  }

  const policy = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    "img-src": [
      "'self'",
      "data:",
      "https://*.tile.openstreetmap.org",
      "https://server.arcgisonline.com",
      "https://map1.vis.earthdata.nasa.gov"
    ],
    "connect-src": [
      "'self'",
      "wss:",
      "ws:",
      "https://nominatim.openstreetmap.org"
    ],
    "font-src": ["'self'", "https://cdn.jsdelivr.net"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"]
  };

  const policyString = Object.entries(policy)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key} ${value.join(" ")}`;
      }
      return `${key} ${value}`;
    })
    .join("; ");

  c.res.headers.set("Content-Security-Policy", policyString);
  c.res.headers.set("X-Content-Type-Options", "nosniff");
  c.res.headers.set("X-Frame-Options", "DENY");
  c.res.headers.set("X-XSS-Protection", "1; mode=block");
}
