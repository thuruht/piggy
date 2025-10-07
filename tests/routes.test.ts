import { describe, it, expect, beforeAll } from 'vitest';
import app from '../src/index';

describe('API Routes', () => {
  let env: any;

  beforeAll(() => {
    // Mock environment
    env = {
      LIVESTOCK_DB: {
        prepare: (query: string) => ({
          bind: (...args: any[]) => ({
            run: async () => ({ success: true }),
            all: async () => ({ results: [] }),
            first: async () => null
          })
        })
      },
      PIGMAP_CONFIG: {
        get: async () => null,
        put: async () => {}
      },
      LIVESTOCK_MEDIA: {
        put: async () => {}
      }
    };
  });

  it('should fetch markers', async () => {
    const req = new Request('http://localhost/api/markers');
    const res = await app.request(req, env);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should validate marker input', async () => {
    const req = new Request('http://localhost/api/markers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invalid: 'data' })
    });

    const res = await app.request(req, env);
    expect(res.status).toBe(400);
  });

  it('should rate limit requests', async () => {
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        app.request(new Request('http://localhost/api/markers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'CF-Connecting-IP': '192.168.1.1'
          },
          body: JSON.stringify({
            title: 'Test',
            type: 'ICE',
            description: 'Test',
            coords: [39.0997, -94.5786]
          })
        }), env)
      );
    }

    const results = await Promise.all(requests);
    const rateLimited = results.filter(r => r.status === 429);

    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
