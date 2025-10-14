import { describe, it, expect, beforeAll } from 'vitest';
import app from '../src/index';

describe('Comments API', () => {
  let env: any;
  let markerId: string;

  beforeAll(async () => {
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
      LIVESTOCK_REPORTS: {
        idFromName: () => ({}),
        get: () => ({
          fetch: async () => new Response('OK')
        })
      }
    };

    // Create a marker to add comments to
    const marker = {
      id: 'test-marker',
      title: 'Test Marker',
      type: 'PIG',
      description: 'Test Description',
      coords: [-94.5786, 39.0997],
      timestamp: new Date().toISOString(),
      magicCode: 'test-code'
    };
    await app.fetch(new Request('http://localhost/api/markers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marker)
    }), env);
    markerId = marker.id;
  });

  it('should create a new comment', async () => {
    const comment = {
      markerId,
      text: 'This is a test comment.',
      author: 'Test User'
    };

    const req = new Request('http://localhost/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });

    const res = await app.fetch(req, env);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it('should return a list of comments for a marker', async () => {
    const req = new Request(`http://localhost/api/comments/${markerId}`);
    const res = await app.fetch(req, env);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should return a 400 error for missing fields', async () => {
    const comment = {
      markerId
    };

    const req = new Request('http://localhost/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });

    const res = await app.fetch(req, env);
    expect(res.status).toBe(400);
  });
});
