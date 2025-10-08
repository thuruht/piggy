import { describe, it, expect, beforeEach } from "vitest";
import { Env } from "../src/types";
import app from "../src/index";
import { ExecutionContext } from "@cloudflare/workers-types";

describe("API Routes", () => {
  let mockEnv: Env;
  let executionContext: ExecutionContext;

  beforeEach(() => {
    mockEnv = {
      LIVESTOCK_DB: {
        prepare: (query: string) => ({
          bind: (...args: any[]) => ({
            run: async () => ({ success: true }),
            all: async () => ({
              results: [
                {
                  id: "1",
                  title: "Test Marker",
                  type: "ICE",
                  description: "Test description",
                  latitude: "39.0997",
                  longitude: "-94.5786",
                  timestamp: new Date().toISOString(),
                  magicCode: "test-code",
                  mediaUrls: null,
                  upvotes: 0,
                },
              ],
            }),
            first: async () => ({
              magicCode: "test-code",
            }),
          }),
        }),
      } as any,
      PIGMAP_CONFIG: {
        get: async (key: string) => {
          if (key.startsWith("ratelimit:")) {
            return null;
          }
          return null;
        },
        put: async () => {},
      } as any,
      LIVESTOCK_MEDIA: {
        createPresignedUrl: async () => "http://dummy-url.com/upload",
      } as any,
      LIVESTOCK_REPORTS: {
        idFromName: () => ({
          get: () => ({
            fetch: async () => new Response("OK"),
          }),
        }),
      } as any,
      ASSETS: {
        fetch: async (req: Request) => new Response("Asset fetched"),
      },
    };
    executionContext = {
      waitUntil: (promise) => promise,
      passThroughOnException: () => {},
    };
  });

  it("should fetch markers", async () => {
    const req = new Request("http://localhost/api/markers");
    const res = await app.fetch(req, mockEnv, executionContext);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].title).toBe("Test Marker");
  });

  it("should validate marker input", async () => {
    const req = new Request("http://localhost/api/markers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invalid: "data" }),
    });
    const res = await app.fetch(req, mockEnv, executionContext);
    expect(res.status).toBe(400);
  });

  it("should handle rate limiting", async () => {
    const requests = [];
    const ip = "1.2.3.4";
    let count = 0;

    mockEnv.PIGMAP_CONFIG.get = async (key: string) => {
      // Simulate rate limit being hit after 10 requests
      if (count >= 10) {
        return { count: count++, resetAt: Date.now() + 10000 };
      }
      count++;
      return null;
    };

    for (let i = 0; i < 15; i++) {
      const req = new Request("http://localhost/api/markers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CF-Connecting-IP": ip,
        },
        body: JSON.stringify({
          title: "Test",
          type: "ICE",
          description: "Test",
          coords: [39.0997, -94.5786],
          magicCode: "test-code",
        }),
      });
      requests.push(app.fetch(req, mockEnv, executionContext));
    }

    const responses = await Promise.all(requests);
    const rateLimitedResponse = responses.find((res) => res.status === 429);
    expect(rateLimitedResponse).toBeDefined();
  });
});