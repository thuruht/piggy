Comprehensive Implementation Guide: Piggy Improvements
You are an expert full-stack developer tasked with implementing comprehensive improvements to the "Piggy" application (a Kansas City community tracking map) based on insights from the "Oddity" project and fresh analysis. Follow this guide systematically.

Project Context
Current Stack:

Frontend: Vanilla JavaScript, OpenLayers for maps, Leaflet-style markers
Backend: Cloudflare Workers with Hono framework
Storage: Cloudflare KV (PIGMAP_CONFIG), R2 (LIVESTOCK_MEDIA), D1 (LIVESTOCK_DB - underutilized)
Real-time: Durable Objects (LIVESTOCK_REPORTS) for WebSocket broadcasting
Languages: 16 languages supported (en, es, fr, ar, zh, am, ht, kar, ku, my, ne, pt, so, sw, ur, vi)
File Structure:


Apply
piggy/
├── src/
│   └── worker.js          # Main Cloudflare Worker
├── public/
│   ├── index.html         # Main UI
│   ├── index.js          # Client-side logic (ICEPIGTracker class)
│   ├── style.css         # Styling
│   └── data-viz.js       # Data visualization
├── wrangler.toml         # Cloudflare configuration
├── pmaptranslate.json    # Translation strings
└── package.json
Implementation Phases
PHASE 1: Foundation & Architecture (Days 1-3)
1.1 Migrate to TypeScript
This code contains potentially dangerous commands. Please review and understand the code before running.
Run
# Install dependencies
npm install -D typescript @cloudflare/workers-types

# Create tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "types": ["@cloudflare/workers-types"],
    "jsx": "react",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
Action: Convert src/worker.js to src/worker.ts with proper types:


Apply
// src/types.ts
export interface Marker {
  id: string;
  title: string;
  type: 'ICE' | 'PIG';
  description: string;
  coords: [number, number];
  timestamp: string;
  magicCode: string;
  media: string[];
  reportCount?: number;
}

export interface Comment {
  id: string;
  markerId: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface Env {
  PIGMAP_CONFIG: KVNamespace;
  LIVESTOCK_MEDIA: R2Bucket;
  LIVESTOCK_DB: D1Database;
  LIVESTOCK_REPORTS: DurableObjectNamespace;
}
1.2 Restructure Backend
Create new directory structure:


Apply
src/
├── index.ts              # Main entry point
├── types.ts              # TypeScript interfaces
├── config.ts             # Configuration constants
├── middleware/
│   ├── cors.ts          # CORS middleware
│   ├── rateLimit.ts     # Rate limiting
│   └── validation.ts    # Input validation
├── routes/
│   ├── markers.ts       # Marker CRUD operations
│   ├── comments.ts      # Comment operations
│   ├── media.ts         # Media upload handling
│   └── reports.ts       # Report moderation
├── db/
│   ├── schema.ts        # D1 schema definitions
│   └── migrate.ts       # Migration utilities
└── utils/
    ├── sanitize.ts      # XSS protection
    └── errors.ts        # Error handling
Action: Create src/config.ts:


Apply
export const CONFIG = {
  REPORT_THRESHOLD: 5,
  MAX_FILE_SIZES: {
    image: 5 * 1024 * 1024,   // 5MB
    video: 25 * 1024 * 1024,  // 25MB
    audio: 10 * 1024 * 1024   // 10MB
  },
  ALLOWED_MIME_TYPES: {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/bmp'],
    video: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
    audio: ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac']
  },
  RATE_LIMITS: {
    markers: 5,      // 5 markers per hour
    comments: 20,    // 20 comments per hour
    reports: 10      // 10 reports per hour
  },
  CACHE_TTL: 60,     // 60 seconds for KV cache
  REFRESH_INTERVAL: 60000, // 60 seconds for client refresh
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_COMMENT_LENGTH: 500
} as const;
1.3 Migrate from KV to D1
Action: Create database schema in migrations/0001_initial_schema.sql:


Apply
-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS markers;

-- Create markers table
CREATE TABLE markers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('ICE', 'PIG')),
  description TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  timestamp TEXT NOT NULL,
  magicCode TEXT NOT NULL,
  reportCount INTEGER DEFAULT 0,
  hidden INTEGER DEFAULT 0,
  createdAt INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Create comments table
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  createdAt INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create media table
CREATE TABLE media (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('image', 'video', 'audio')),
  createdAt INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_markers_timestamp ON markers(timestamp DESC);
CREATE INDEX idx_markers_type ON markers(type);
CREATE INDEX idx_markers_report_count ON markers(reportCount);
CREATE INDEX idx_markers_hidden ON markers(hidden);
CREATE INDEX idx_comments_marker ON comments(markerId);
CREATE INDEX idx_comments_timestamp ON comments(createdAt DESC);
CREATE INDEX idx_media_marker ON media(markerId);
Action: Create migration script:

This code contains potentially dangerous commands. Please review and understand the code before running.
Run
wrangler d1 execute LIVESTOCK_DB --file=./migrations/0001_initial_schema.sql --remote
Action: Create data migration script scripts/migrate-kv-to-d1.ts:


Apply
import { Env } from '../src/types';

export async function migrateKVToD1(env: Env) {
  // Get all markers from KV
  const markers = await env.PIGMAP_CONFIG.get('markers', 'json') || [];
  const comments = await env.PIGMAP_CONFIG.get('comments', 'json') || [];

  // Insert markers into D1
  for (const marker of markers) {
    await env.LIVESTOCK_DB.prepare(`
      INSERT INTO markers (id, title, type, description, latitude, longitude, timestamp, magicCode, reportCount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
    `).bind(
      marker.id,
      marker.title,
      marker.type,
      marker.description,
      marker.coords[0],
      marker.coords[1],
      marker.timestamp,
      marker.magicCode
    ).run();

    // Insert media
    for (const mediaUrl of marker.media || []) {
      const mediaType = getMediaType(mediaUrl);
      await env.LIVESTOCK_DB.prepare(`
        INSERT INTO media (id, markerId, url, type)
        VALUES (?, ?, ?, ?)
      `).bind(nanoid(), marker.id, mediaUrl, mediaType).run();
    }
  }

  // Insert comments into D1
  for (const comment of comments) {
    await env.LIVESTOCK_DB.prepare(`
      INSERT INTO comments (id, markerId, text, author, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      comment.id,
      comment.markerId,
      comment.text,
      comment.author,
      comment.timestamp
    ).run();
  }

  console.log(`Migrated ${markers.length} markers and ${comments.length} comments`);
}

function getMediaType(url: string): 'image' | 'video' | 'audio' {
  const ext = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'bmp'].includes(ext || '')) return 'image';
  if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext || '')) return 'video';
  return 'audio';
}
1.4 Implement Security Middleware
Action: Create src/middleware/rateLimit.ts:


Apply
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
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${endpoint}:${ip}`;

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
Action: Create src/utils/sanitize.ts:


Apply
export function sanitizeHTML(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

export function validateMarkerInput(data: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required');
  } else if (data.title.length > CONFIG.MAX_TITLE_LENGTH) {
    errors.push(`Title must be less than ${CONFIG.MAX_TITLE_LENGTH} characters`);
  }

  if (!data.type || !['ICE', 'PIG'].includes(data.type)) {
    errors.push('Type must be ICE or PIG');
  }

  if (!data.description || typeof data.description !== 'string') {
    errors.push('Description is required');
  } else if (data.description.length > CONFIG.MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description must be less than ${CONFIG.MAX_DESCRIPTION_LENGTH} characters`);
  }

  if (!data.coords || !Array.isArray(data.coords) || data.coords.length !== 2) {
    errors.push('Invalid coordinates');
  } else {
    const [lat, lng] = data.coords;
    if (typeof lat !== 'number' || typeof lng !== 'number' ||
        lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      errors.push('Coordinates out of range');
    }
  }

  return { valid: errors.length === 0, errors };
}
PHASE 2: Backend API Enhancement (Days 4-6)
2.1 Refactor Routes with D1
Action: Create src/routes/markers.ts:


Apply
import { Hono } from 'hono';
import { Env, Marker } from '../types';
import { CONFIG } from '../config';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { sanitizeHTML, validateMarkerInput } from '../utils/sanitize';
import { nanoid } from 'nanoid';

const markers = new Hono<{ Bindings: Env }>();

// GET /api/markers - Fetch all markers
markers.get('/', async (c) => {
  try {
    const result = await c.env.LIVESTOCK_DB.prepare(`
      SELECT m.*,
        GROUP_CONCAT(md.url) as mediaUrls,
        GROUP_CONCAT(md.type) as mediaTypes
      FROM markers m
      LEFT JOIN media md ON m.id = md.markerId
      WHERE m.reportCount < ? AND m.hidden = 0
      GROUP BY m.id
      ORDER BY m.timestamp DESC
      LIMIT 200
    `).bind(CONFIG.REPORT_THRESHOLD).all();

    const markers = result.results.map((row: any) => ({
      id: row.id,
      title: row.title,
      type: row.type,
      description: row.description,
      coords: [parseFloat(row.latitude), parseFloat(row.longitude)],
      timestamp: row.timestamp,
      magicCode: row.magicCode,
      media: row.mediaUrls ? row.mediaUrls.split(',') : []
    }));

    return c.json(markers);
  } catch (error) {
    console.error('Markers fetch error:', error);
    return c.json({ error: 'Failed to fetch markers' }, 500);
  }
});

// POST /api/markers - Create new marker
markers.post('/', async (c) => {
  // Rate limiting
  const rateLimitResult = await rateLimitMiddleware(c, 'markers');
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await c.req.json();

    // Validate input
    const validation = validateMarkerInput(body);
    if (!validation.valid) {
      return c.json({ error: validation.errors.join(', ') }, 400);
    }

    // Sanitize inputs
    const marker: Marker = {
      id: nanoid(),
      title: sanitizeHTML(body.title.substring(0, CONFIG.MAX_TITLE_LENGTH)),
      type: body.type,
      description: sanitizeHTML(body.description.substring(0, CONFIG.MAX_DESCRIPTION_LENGTH)),
      coords: body.coords,
      timestamp: new Date().toISOString(),
      magicCode: body.magicCode || nanoid(10),
      media: body.media || []
    };

    // Insert into D1
    await c.env.LIVESTOCK_DB.prepare(`
      INSERT INTO markers (id, title, type, description, latitude, longitude, timestamp, magicCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      marker.id,
      marker.title,
      marker.type,
      marker.description,
      marker.coords[0],
      marker.coords[1],
      marker.timestamp,
      marker.magicCode
    ).run();

    // Insert media if any
    for (const mediaUrl of marker.media) {
      const mediaType = getMediaType(mediaUrl);
      await c.env.LIVESTOCK_DB.prepare(`
        INSERT INTO media (id, markerId, url, type)
        VALUES (?, ?, ?, ?)
      `).bind(nanoid(), marker.id, mediaUrl, mediaType).run();
    }

    // Broadcast via Durable Object
    try {
      const durableId = c.env.LIVESTOCK_REPORTS.idFromName('tracker');
      const durableStub = c.env.LIVESTOCK_REPORTS.get(durableId);
      await durableStub.fetch('http://tracker/broadcast', {
        method: 'POST',
        body: JSON.stringify({ type: 'marker_added', marker })
      });
    } catch (broadcastError) {
      console.warn('Broadcast failed:', broadcastError);
    }

    return c.json({ success: true, id: marker.id, marker }, 201);
  } catch (error) {
    console.error('Marker creation error:', error);
    return c.json({ error: 'Failed to create marker' }, 500);
  }
});

// DELETE /api/markers/:id - Delete marker
markers.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const magicCode = c.req.header('X-Magic-Code');

    // Verify ownership via magic code
    const marker = await c.env.LIVESTOCK_DB.prepare(`
      SELECT magicCode FROM markers WHERE id = ?
    `).bind(id).first();

    if (!marker) {
      return c.json({ error: 'Marker not found' }, 404);
    }

    if (marker.magicCode !== magicCode) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    // Delete marker and related data (CASCADE will handle media/comments)
    await c.env.LIVESTOCK_DB.prepare(`
      DELETE FROM markers WHERE id = ?
    `).bind(id).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Marker deletion error:', error);
    return c.json({ error: 'Failed to delete marker' }, 500);
  }
});

// Helper function
function getMediaType(url: string): 'image' | 'video' | 'audio' {
  const ext = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'bmp'].includes(ext || '')) return 'image';
  if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext || '')) return 'video';
  return 'audio';
}

export default markers;
2.2 Implement Report System
Action: Create src/routes/reports.ts:


Apply
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
2.3 Enhanced Media Upload
Action: Update src/worker.ts media upload handler:


Apply
async function handleDirectUpload(request, env, headers) {
  try {
    const url = new URL(request.url);
    const key = url.pathname.substring('/api/upload-handler/'.length);

    if (!key) {
      return new Response(JSON.stringify({ error: 'Missing key' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    // Validate file size from Content-Length header
    const contentLength = parseInt(request.headers.get('Content-Length') || '0');
    const contentType = request.headers.get('Content-Type') || '';

    // Determine media type and max size
    let mediaType: 'image' | 'video' | 'audio' = 'image';
    if (contentType.startsWith('video/')) mediaType = 'video';
    else if (contentType.startsWith('audio/')) mediaType = 'audio';

    const maxSize = CONFIG.MAX_FILE_SIZES[mediaType];

    if (contentLength > maxSize) {
      return new Response(JSON.stringify({
        error: `File too large. Max ${Math.round(maxSize / (1024 * 1024))}MB for ${mediaType}`
      }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    // Validate MIME type
    const allowedTypes = CONFIG.ALLOWED_MIME_TYPES[mediaType];
    if (!allowedTypes.includes(contentType)) {
      return new Response(JSON.stringify({
        error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
      }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }

    // Upload to R2
    await env.LIVESTOCK_MEDIA.put(key, request.body, {
      httpMetadata: {
        contentType: contentType
      }
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Direct upload error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}
PHASE 3: Frontend Map Enhancements (Days 7-9)
3.1 Add Custom Layer Control
Action: Create public/map-layers.js:


Apply
// Define tile layer configurations
export const TILE_LAYERS = {
  // DARK & NIGHT MAPS
  'NASA City Lights': {
    url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
    options: {
      attribution: '&copy; NASA',
      maxZoom: 8,
      format: 'jpg'
    },
    category: 'dark'
  },
  'Carto Dark': {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    options: {
      attribution: '&copy; OpenStreetMap | &copy; CARTO'
    },
    category: 'dark'
  },

  // SATELLITE & IMAGERY
  'ESRI Satellite': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: '&copy; Esri, DigitalGlobe'
    },
    category: 'satellite'
  },

  // STREET MAPS
  'OpenStreetMap': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    },
    category: 'street'
  },

  // Add more layers from oddity...
};

export const OVERLAY_LAYERS = {
  'Railway Lines': {
    url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; OpenRailwayMap',
      opacity: 0.7,
      transparent: true
    }
  },
  'Cycling Routes': {
    url: 'https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; Waymarked Trails',
      opacity: 0.8,
      transparent: true
    }
  }
};

// Create layer control UI
export function createLayerControl(map) {
  const container = document.createElement('div');
  container.className = 'layer-control';
  container.innerHTML = `
    <button class="layer-control-btn" id="layer-btn">
      <span>🗺️</span>
      <span id="current-layer">OpenStreetMap</span>
    </button>
    <div class="layer-menu" id="layer-menu" style="display:none;">
      <div class="layer-section">
        <h4>Base Layers</h4>
        <div id="base-layers"></div>
      </div>
      <div class="layer-section">
        <h4>Overlays</h4>
        <div id="overlay-layers"></div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Populate layers
  const baseLayers = document.getElementById('base-layers');
  const overlayLayers = document.getElementById('overlay-layers');

  Object.entries(TILE_LAYERS).forEach(([name, config]) => {
    const option = document.createElement('div');
    option.className = 'layer-option';
    option.innerHTML = `
      <input type="radio" name="base-layer" id="layer-${name.replace(/\s/g, '-')}"
        ${name === 'OpenStreetMap' ? 'checked' : ''}>
      <label for="layer-${name.replace(/\s/g, '-')}">${name}</label>
    `;
    baseLayers.appendChild(option);

    option.querySelector('input').addEventListener('change', () => {
      switchBaseLayer(map, name, config);
    });
  });

  Object.entries(OVERLAY_LAYERS).forEach(([name, config]) => {
    const option = document.createElement('div');
    option.className = 'layer-option';
    option.innerHTML = `
      <input type="checkbox" id="overlay-${name.replace(/\s/g, '-')}">
      <label for="overlay-${name.replace(/\s/g, '-')}">${name}</label>
    `;
    overlayLayers.appendChild(option);

    option.querySelector('input').addEventListener('change', (e) => {
      toggleOverlay(map, name, config, e.target.checked);
    });
  });

  // Toggle menu
  document.getElementById('layer-btn').addEventListener('click', () => {
    const menu = document.getElementById('layer-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });
}

let currentBaseLayer = null;
const overlayLayersActive = new Map();

function switchBaseLayer(map, name, config) {
  if (currentBaseLayer) {
    map.removeLayer(currentBaseLayer);
  }

  currentBaseLayer = ol.layer.Tile({
    source: new ol.source.XYZ({
      url: config.url,
      ...config.options
    })
  });

  map.getLayers().insertAt(0, currentBaseLayer);
  document.getElementById('current-layer').textContent = name;
}

function toggleOverlay(map, name, config, enabled) {
  if (enabled) {
    const overlay = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: config.url,
        ...config.options
      })
    });
    overlayLayersActive.set(name, overlay);
    map.addLayer(overlay);
  } else {
    const overlay = overlayLayersActive.get(name);
    if (overlay) {
      map.removeLayer(overlay);
      overlayLayersActive.delete(name);
    }
  }
}
Action: Add CSS for layer control in public/style.css:


Apply
.layer-control {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.layer-control-btn {
  background: rgba(0, 0, 0, 0.8);
  color: #0f0;
  border: 2px solid #0f0;
  padding: 10px 15px;
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.layer-control-btn:hover {
  background: rgba(0, 255, 0, 0.1);
}

.layer-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #0f0;
  padding: 15px;
  min-width: 250px;
  max-height: 400px;
  overflow-y: auto;
}

.layer-section {
  margin-bottom: 15px;
}

.layer-section h4 {
  color: #0f0;
  margin: 0 0 10px 0;
  font-size: 14px;
  text-transform: uppercase;
}

.layer-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  margin-bottom: 5px;
}

.layer-option input[type="radio"],
.layer-option input[type="checkbox"] {
  accent-color: #0f0;
}

.layer-option label {
  color: #fff;
  cursor: pointer;
  font-size: 13px;
}

.layer-option:hover {
  background: rgba(0, 255, 0, 0.1);
}
3.2 Implement Marker Tracking & Refresh
Action: Update public/index.js to add tracking:


Apply
class ICEPIGTracker {
  constructor() {
    this.translations = {};
    this.currentLang = 'en';
    this.magicCode = this.generateMagicCode();
    this.vectorSource = new ol.source.Vector();
    this.displayedMarkerIds = new Set(); // NEW: Track displayed markers
    this.init();
  }

  // ... existing methods ...

  addMarkerToMap(marker) {
    // Check if already displayed
    if (this.displayedMarkerIds.has(marker.id)) {
      console.log(`Marker ${marker.id} already displayed, skipping`);
      return null;
    }

    // Normalize longitude
    let lng = ((marker.coords[1] + 180) % 360) - 180;

    // Validate coordinates
    if (isNaN(marker.coords[0]) || isNaN(lng)) {
      console.error('Invalid coordinates for marker:', marker);
      return null;
    }

    // Color code by type and age
    const color = this.getMarkerColor(marker);
    const icon = this.createMarkerIcon(color);

    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, marker.coords[0]])),
      ...marker
    });

    this.vectorSource.addFeature(feature);
    this.displayedMarkerIds.add(marker.id);

    // Add pulse animation for new markers
    setTimeout(() => {
      const pixel = this.map.getPixelFromCoordinate(
        ol.proj.fromLonLat([lng, marker.coords[0]])
      );
      if (pixel) {
        this.animateMarkerPulse(pixel);
      }
    }, 100);

    return feature;
  }

  getMarkerColor(marker) {
    // Color by type
    const baseColor = marker.type === 'ICE' ? 'red' : 'blue';

    // Fade older markers
    const age = Date.now() - new Date(marker.timestamp).getTime();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (age < dayInMs) return baseColor + '-bright'; // Less than 1 day
    if (age < 7 * dayInMs) return baseColor; // Less than 1 week
    return baseColor + '-faded'; // Older than 1 week
  }

  createMarkerIcon(color) {
    const colors = {
      'red-bright': '#ff0000',
      'red': '#cc0000',
      'red-faded': '#880000',
      'blue-bright': '#0000ff',
      'blue': '#0000cc',
      'blue-faded': '#000088'
    };

    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({ color: colors[color] || '#ff0000' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
      })
    });
  }

  animateMarkerPulse(pixel) {
    const pulseEl = document.createElement('div');
    pulseEl.className = 'marker-pulse';
    pulseEl.style.left = pixel[0] + 'px';
    pulseEl.style.top = pixel[1] + 'px';
    document.body.appendChild(pulseEl);

    setTimeout(() => pulseEl.remove(), 2000);
  }

  async refreshMarkers() {
    try {
      const response = await fetch('/api/markers');
      const markers = await response.json();

      let newCount = 0;
      markers.forEach(marker => {
        if (!this.displayedMarkerIds.has(marker.id)) {
          this.addMarkerToMap(marker);
          newCount++;
        }
      });

      if (newCount > 0) {
        this.showToast(`Added ${newCount} new marker(s)`, 'success');
      } else {
        this.showToast('Map is up to date', 'success');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      this.showToast('Failed to refresh markers', 'error');
    }
  }

  startAutoRefresh() {
    // Refresh every 60 seconds
    setInterval(() => this.refreshMarkers(), 60000);
  }

  // Call in init()
  async init() {
    await this.loadTranslations();
    this.setupMap();
    this.loadMarkers();
    this.updateUIText();
    this.startAutoRefresh(); // NEW: Start auto-refresh
    this.setupRefreshButton(); // NEW: Add manual refresh button
    document.getElementById('langSelect').addEventListener('change', (e) => this.changeLang(e.target.value));
  }

  setupRefreshButton() {
    const refreshBtn = document.createElement('button');
    refreshBtn.id = 'refresh-btn';
    refreshBtn.className = 'control-btn';
    refreshBtn.innerHTML = '↻';
    refreshBtn.title = 'Refresh Map';
    refreshBtn.addEventListener('click', () => {
      refreshBtn.innerHTML = '...';
      this.refreshMarkers().finally(() => {
        refreshBtn.innerHTML = '↻';
      });
    });

    document.querySelector('.controls').appendChild(refreshBtn);
  }
}
Action: Add pulse animation CSS:


Apply
.marker-pulse {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 255, 0, 0.3);
  border: 2px solid #0f0;
  transform: translate(-50%, -50%);
  animation: pulse 2s ease-out;
  pointer-events: none;
  z-index: 999;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
3.3 Add Report Functionality
Action: Update modal to include report button:


Apply
showMarkerDetails(feature) {
  const data = feature.getProperties();

  // Check if already reported
  const reportKey = `reported_${data.id}`;
  const alreadyReported = sessionStorage.getItem(reportKey);

  document.getElementById('modal-body').innerHTML = `
    <h3>${data.title}</h3>
    <p><strong>${this.t('label_type')}:</strong> ${data.type}</p>
    <p><strong>${this.t('label_description')}:</strong> ${data.description}</p>
    <p><strong>${this.t('label_posted')}:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
    ${data.media.map(url => this.renderMedia(url)).join('')}
    <div id="comments"></div>
    <textarea id="newComment" placeholder="${this.t('add_comment')}"></textarea>
    <input id="commentAuthor" placeholder="${this.t('author')}">
    <button onclick="tracker.addComment('${data.id}')">${this.t('add_comment')}</button>
    ${this.canEdit(data) ? `
      <button onclick="tracker.editMarker('${data.id}')">${this.t('edit')}</button>
      <button onclick="tracker.deleteMarker('${data.id}')">${this.t('delete')}</button>
    ` : ''}
    <button id="report-btn" onclick="tracker.reportMarker('${data.id}')"
      ${alreadyReported ? 'disabled' : ''}>
      ${alreadyReported ? '✓ Reported' : '⚠ Report'}
    </button>
  `;
  this.loadComments(data.id);
  document.getElementById('modal').style.display = 'block';
}

renderMedia(url) {
  const ext = url.split('.').pop().toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'bmp'].includes(ext)) {
    return `<img src="${url}" style="max-width:100%;margin:5px 0;">`;
  } else if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext)) {
    return `
      <video controls style="max-width:100%;margin:5px 0;">
        <source src="${url}" type="video/${ext === 'mov' ? 'quicktime' : ext}">
      </video>
    `;
  } else if (['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac'].includes(ext)) {
    return `
      <div style="padding:10px;background:#1a1a1a;margin:5px 0;">
        <div style="font-size:2rem;text-align:center;margin-bottom:10px;">🎵</div>
        <audio controls style="width:100%;">
          <source src="${url}" type="audio/${ext}">
        </audio>
      </div>
    `;
  }

  return `<a href="${url}" target="_blank">View attachment</a>`;
}

async reportMarker(markerId) {
  if (!confirm(this.t('confirm_report') || 'Are you sure you want to report this?')) {
    return;
  }

  try {
    const response = await fetch(`/api/markers/${markerId}/report`, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Report failed');
    }

    sessionStorage.setItem(`reported_${markerId}`, 'true');

    const reportBtn = document.getElementById('report-btn');
    if (reportBtn) {
      reportBtn.disabled = true;
      reportBtn.textContent = '✓ Reported';
    }

    this.showToast('Report submitted. Thank you.', 'success');
  } catch (error) {
    console.error('Report error:', error);
    this.showToast('Failed to submit report', 'error');
  }
}
Action: Add translation for report confirmation:


Apply
// Add to pmaptranslate.json for all languages
"confirm_report": "Are you sure you want to report this post? It will be hidden after 5 reports."
3.4 Add Haptic Feedback & Audio
Action: Add utility functions to public/index.js:


Apply
class ICEPIGTracker {
  // ... existing code ...

  triggerHaptic(pattern = 20) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  playSound(type) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'success') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'error') {
        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      }
    } catch (error) {
      console.log('Audio not supported');
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 3000);

    // Add feedback
    if (type === 'success') {
      this.triggerHaptic(20);
      this.playSound('success');
    } else if (type === 'error') {
      this.triggerHaptic([50, 50, 50]);
      this.playSound('error');
    }
  }
}
PHASE 4: Advanced Features (Days 10-12)
4.1 Implement WebSocket Real-Time Updates
Action: Update Durable Object in src/worker.ts:


Apply
export class LivestockReport {
  state: DurableObjectState;
  sessions: Set<WebSocket>;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.sessions = new Set();
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === '/websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      this.sessions.add(server);

      server.addEventListener('close', () => {
        this.sessions.delete(server);
      });

      server.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data as string);

        // Handle client messages (e.g., user location, typing indicators)
        if (data.type === 'user_location') {
          this.broadcast({
            type: 'active_users',
            count: this.sessions.size,
            locations: [data.location] // Could aggregate
          });
        }
      });

      // Send current stats on connect
      server.send(JSON.stringify({
        type: 'welcome',
        activeUsers: this.sessions.size
      }));

      return new Response(null, {
        status: 101,
        webSocket: client
      });
    }

    if (url.pathname === '/broadcast') {
      const data = await request.json();
      this.broadcast(data);
      return new Response('OK');
    }

    if (url.pathname === '/stats') {
      return new Response(JSON.stringify({
        activeSessions: this.sessions.size
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }

  broadcast(data: any) {
    const message = JSON.stringify(data);
    this.sessions.forEach(session => {
      try {
        session.send(message);
      } catch (error) {
        this.sessions.delete(session);
      }
    });
  }
}
Action: Add WebSocket client in public/index.js:


Apply
class ICEPIGTracker {
  constructor() {
    // ... existing code ...
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  async init() {
    await this.loadTranslations();
    this.setupMap();
    this.loadMarkers();
    this.updateUIText();
    this.startAutoRefresh();
    this.setupRefreshButton();
    this.connectWebSocket(); // NEW: Connect to WebSocket
    document.getElementById('langSelect').addEventListener('change', (e) => this.changeLang(e.target.value));
  }

  connectWebSocket() {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.showToast('Connected to live updates', 'success');
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleWebSocketMessage(data);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.reconnectWebSocket();
      };
    } catch (error) {
      console.error('Failed to establish WebSocket:', error);
    }
  }

  reconnectWebSocket() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      this.reconnectAttempts++;

      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      setTimeout(() => this.connectWebSocket(), delay);
    } else {
      this.showToast('Live updates disconnected. Refresh page to reconnect.', 'error');
    }
  }

  handleWebSocketMessage(data) {
    console.log('WebSocket message:', data);

    switch (data.type) {
      case 'welcome':
        console.log(`Connected. ${data.activeUsers} active users`);
        this.updateActiveUsers(data.activeUsers);
        break;

      case 'marker_added':
        // Add new marker without full refresh
        if (!this.displayedMarkerIds.has(data.marker.id)) {
          this.addMarkerToMap(data.marker);
          this.showToast('New report added', 'info');
          this.triggerHaptic(20);
        }
        break;

      case 'active_users':
        this.updateActiveUsers(data.count);
        break;

      default:
        console.log('Unknown message type:', data.type);
    }
  }

  updateActiveUsers(count) {
    let userIndicator = document.getElementById('active-users');
    if (!userIndicator) {
      userIndicator = document.createElement('div');
      userIndicator.id = 'active-users';
      userIndicator.className = 'active-users-indicator';
      document.querySelector('.controls').appendChild(userIndicator);
    }
    userIndicator.textContent = `👥 ${count} online`;
  }

  sendUserLocation() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const center = this.map.getView().getCenter();
      const lonLat = ol.proj.toLonLat(center);

      this.ws.send(JSON.stringify({
        type: 'user_location',
        location: {
          lat: lonLat[1],
          lng: lonLat[0]
        }
      }));
    }
  }
}
Action: Add WebSocket route to worker:


Apply
// In src/worker.ts
app.get('/ws', async (c) => {
  const durableId = c.env.LIVESTOCK_REPORTS.idFromName('tracker');
  const durableStub = c.env.LIVESTOCK_REPORTS.get(durableId);
  return durableStub.fetch('http://tracker/websocket', c.req.raw);
});
4.2 Add PWA Features
Action: Create public/manifest.json:


Apply
{
  "name": "PigMap - Kansas City Tracker",
  "short_name": "PigMap",
  "description": "Anonymous community tracking for Kansas City",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#00ff00",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "categories": ["news", "social"],
  "screenshots": [
    {
      "src": "/screenshot1.png",
      "sizes": "1280x720",
      "type": "image/png"
    }
  ]
}
Action: Update public/index.html:


Apply
<head>
  <meta charset="utf-8">
  <title data-translate-key="page_title">PigMap.org - Kansas City Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#00ff00">
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" type="image/png" href="/icon-192.png">
  <link rel="apple-touch-icon" href="/icon-192.png">
  <link rel="stylesheet" href="/ol.css">
  <link rel="stylesheet" href="/style.css">
</head>
Action: Enhanced Service Worker public/sw.js:


Apply
const CACHE_NAME = 'pigmap-v1';
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/data-viz.js',
  '/map-layers.js',
  '/ol.css',
  '/ol.js',
  '/gsap.min.js',
  '/d3.min.js',
  '/pmaptranslate.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first for API, cache first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful GET requests
          if (request.method === 'GET' && response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If offline, try to return cached version
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response(JSON.stringify({
              error: 'Network error. You are offline.'
            }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          });
        })
    );
    return;
  }

  // Static assets - cache first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-markers') {
    event.waitUntil(syncMarkers());
  }
});

async function syncMarkers() {
  // Get pending actions from IndexedDB
  const db = await openDB();
  const pending = await db.getAll('pending');

  for (const action of pending) {
    try {
      await fetch(action.url, {
        method: action.method,
        headers: action.headers,
        body: action.body
      });

      await db.delete('pending', action.id);
    } catch (error) {
      console.error('Failed to sync:', error);
    }
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pigmap-offline', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending')) {
        db.createObjectStore('pending', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}
4.3 Add Install Prompt
Action: Add to public/index.js:


Apply
class ICEPIGTracker {
  constructor() {
    // ... existing code ...
    this.deferredPrompt = null;
    this.setupInstallPrompt();
  }

  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
      this.deferredPrompt = null;
      this.hideInstallButton();
      this.showToast('App installed! Open from your home screen.', 'success');
    });
  }

  showInstallButton() {
    const installBtn = document.createElement('button');
    installBtn.id = 'install-btn';
    installBtn.className = 'control-btn';
    installBtn.innerHTML = '📱 Install App';
    installBtn.addEventListener('click', () => this.promptInstall());

    document.querySelector('.controls').appendChild(installBtn);
  }

  hideInstallButton() {
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
      installBtn.remove();
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    console.log(`Install prompt outcome: ${outcome}`);
    this.deferredPrompt = null;
    this.hideInstallButton();
  }
}
PHASE 5: Testing, Optimization & Documentation (Days 13-14)
5.1 Add Unit Tests
Action: Create tests/routes.test.ts:


Apply
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
Action: Add test script to package.json:


Apply
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "deploy": "wrangler deploy",
    "db:migrate": "wrangler d1 migrations apply LIVESTOCK_DB --remote"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240620.0",
    "wrangler": "^3.62.0",
    "typescript": "^5.4.5",
    "vitest": "^1.0.0"
  }
}
5.2 Add Performance Monitoring
Action: Create src/middleware/monitoring.ts:


Apply
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
5.3 Optimize Bundle Size
Action: Create build.js:


Apply
import { build } from 'esbuild';
import { readdirSync } from 'fs';

// Bundle client-side JavaScript
build({
  entryPoints: ['public/index.js', 'public/data-viz.js', 'public/map-layers.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'es2020',
  outdir: 'public/dist',
  splitting: true,
  format: 'esm',
  loader: {
    '.js': 'js'
  }
}).catch(() => process.exit(1));

console.log('Client bundle built successfully');
Action: Update package.json:


Apply
{
  "scripts": {
    "build": "node build.js",
    "dev": "npm run build && wrangler dev",
    "deploy": "npm run build && wrangler deploy"
  },
  "devDependencies": {
    "esbuild": "^0.19.0"
  }
}
5.4 Create Comprehensive Documentation
Action: Create docs/API.md:


Apply
# PigMap API Documentation

## Base URL
```
https://pigmap.org/api
```

## Authentication
All endpoints use magic codes for authentication where applicable.

## Rate Limits
- Markers: 5 per hour
- Comments: 20 per hour
- Reports: 10 per hour

## Endpoints

### GET /api/markers
Fetch all visible markers (not hidden by reports).

**Response:**
```json
[
  {
    "id": "abc123",
    "title": "ICE Activity",
    "type": "ICE",
    "description": "Spotted at 5th and Main",
    "coords": [39.0997, -94.5786],
    "timestamp": "2024-01-15T10:30:00Z",
    "magicCode": "xyz789",
    "media": ["https://m3d14.pigmap.org/media/image1.jpg"]
  }
]
```

### POST /api/markers
Create a new marker.

**Request:**
```json
{
  "title": "ICE Activity",
  "type": "ICE",
  "description": "Description here",
  "coords": [39.0997, -94.5786],
  "magicCode": "xyz789",
  "media": []
}
```

**Response:**
```json
{
  "success": true,
  "id": "abc123",
  "marker": { /* full marker object */ }
}
```

### DELETE /api/markers/:id
Delete a marker (requires magic code in X-Magic-Code header).

**Headers:**
```
X-Magic-Code: xyz789
```

**Response:**
```json
{
  "success": true
}
```

### POST /api/markers/:id/report
Report a marker for moderation.

**Response:**
```json
{
  "success": true
}
```

### GET /api/comments/:markerId
Get all comments for a marker.

**Response:**
```json
[
  {
    "id": "comment1",
    "markerId": "abc123",
    "text": "I saw this too",
    "author": "Anonymous",
    "timestamp": "2024-01-15T11:00:00Z"
  }
]
```

### POST /api/comments
Create a new comment.

**Request:**
```json
{
  "markerId": "abc123",
  "text": "Comment text",
  "author": "Anonymous"
}
```

### POST /api/upload-url
Request an upload URL for media.

**Request:**
```json
{
  "filename": "image.jpg",
  "contentType": "image/jpeg"
}
```

**Response:**
```json
{
  "uploadUrl": "/api/upload-handler/media/abc123-image.jpg",
  "key": "media/abc123-image.jpg",
  "publicUrl": "https://m3d14.pigmap.org/media/abc123-image.jpg"
}
```

### PUT /api/upload-handler/:key
Upload media file (used by client after requesting upload URL).

**Headers:**
```
Content-Type: image/jpeg
Content-Length: 1234567
```

**Body:** Binary file data

**Response:**
```json
{
  "success": true
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate limit exceeded. Try again later."
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to process request"
}
```
```

**Action:** Create `docs/DEPLOYMENT.md`:
```markdown
# Deployment Guide

## Prerequisites
1. Cloudflare account
2. Wrangler CLI installed
3. Node.js 18+ installed

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Wrangler
Login to Cloudflare:
```bash
npx wrangler login
```

### 3. Create D1 Database
```bash
npx wrangler d1 create LIVESTOCK_DB
```

Copy the database ID and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "LIVESTOCK_DB"
database_name = "livestock"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 4. Create R2 Bucket
```bash
npx wrangler r2 bucket create livestock-media
```

### 5. Run Database Migrations
```bash
npm run db:migrate
```

### 6. Deploy
```bash
npm run deploy
```

## Environment Variables

Set these in the Cloudflare dashboard:
- `R2_PUBLIC_URL`: Your R2 custom domain (e.g., `https://m3d14.pigmap.org`)

## Custom Domain Setup

1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages > Your Worker > Settings > Triggers
3. Add Custom Domain: `pigmap.org`

## Monitoring

View logs:
```bash
npx wrangler tail
```

View analytics in Cloudflare Dashboard.

## Rollback

To rollback to a previous deployment:
```bash
npx wrangler deployments list
npx wrangler rollback [deployment-id]
```
```

**Action:** Create `docs/CONTRIBUTING.md`:
```markdown
# Contributing to PigMap

## Code of Conduct
- Be respectful
- Protect user privacy
- No discrimination

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/my-feature`
5. Make changes
6. Test locally: `npm test`
7. Commit: `git commit -m "feat: add feature"`
8. Push: `git push origin feature/my-feature`
9. Create Pull Request

## Commit Convention
Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance

## Testing
```bash
npm test
npm run test:watch
```

## Code Style
- Use TypeScript for backend
- Use ESLint for linting
- Format with Prettier
- Write descriptive variable names
- Add JSDoc comments for complex functions

## Pull Request Process
1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers
```

---

### PHASE 6: Final Touches & Launch (Day 15)

#### 6.1 Security Audit Checklist
Create `docs/SECURITY_CHECKLIST.md`:
```markdown
# Security Audit Checklist

- [ ] All user input is sanitized (HTML escaping)
- [ ] Rate limiting is enabled on all POST endpoints
- [ ] CORS headers are properly configured
- [ ] CSP headers are set
- [ ] HTTPS is enforced
- [ ] File uploads are validated (MIME type, size, content)
- [ ] Database queries use parameterized statements
- [ ] Secrets are in environment variables, not code
- [ ] Error messages don't leak sensitive info
- [ ] Session tokens (magic codes) are sufficiently random
- [ ] Report threshold prevents abuse
- [ ] Media URLs are served from separate domain
- [ ] No PII is logged
```

#### 6.2 Performance Checklist
Create `docs/PERFORMANCE_CHECKLIST.md`:
```markdown
# Performance Checklist

- [ ] Static assets are cached
- [ ] Database queries have indexes
- [ ] Images are compressed
- [ ] JavaScript is minified and bundled
- [ ] CSS is minified
- [ ] Fonts are subset
- [ ] Service Worker caches assets
- [ ] API responses are compressed
- [ ] Long-running operations are async
- [ ] WebSockets are used for real-time updates
- [ ] Map tiles are cached
- [ ] Debouncing on map events
- [ ] Lazy loading for images
```

#### 6.3 Launch Checklist
Create `docs/LAUNCH_CHECKLIST.md`:
```markdown
# Launch Checklist

## Pre-Launch
- [ ] All tests pass
- [ ] Documentation is complete
- [ ] Privacy policy is published
- [ ] Terms of service are published
- [ ] Analytics are configured
- [ ] Error logging is set up
- [ ] Backup strategy is in place
- [ ] Rate limits are tested
- [ ] Load testing completed
- [ ] Security scan performed
- [ ] Accessibility audit done
- [ ] Mobile testing completed
- [ ] Cross-browser testing done

## Launch Day
- [ ] Deploy to production
- [ ] Verify all functionality
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Announce launch
- [ ] Monitor social media
- [ ] Have rollback plan ready

## Post-Launch
- [ ] Monitor performance metrics
- [ ] Gather user feedback
- [ ] Address critical bugs within 24h
- [ ] Plan next iteration
- [ ] Update roadmap
Ongoing Maintenance
Daily Tasks
Check error logs
Review analytics
Monitor server costs
Check for abuse/spam
Weekly Tasks
Review user feedback
Update documentation
Security updates
Performance analysis
Monthly Tasks
Database cleanup (old data)
Cost optimization review
Feature planning
User survey
Quarterly Tasks
Major version updates
Architecture review
Security audit
User retention analysis
Success Metrics
Track these KPIs:

Daily Active Users (DAU)
Markers Created per Day
Comment Rate
Retention Rate (7-day, 30-day)
Average Session Duration
Page Load Time (target < 2s)
Error Rate (target < 0.1%)
Uptime (target 99.9%)
Cost per User (Cloudflare usage)
Rollout Strategy
Phase 1: Beta (Week 1-2)
Invite 50 trusted users
Gather feedback
Fix critical bugs
Monitor performance
Phase 2: Soft Launch (Week 3-4)
Open to public with limited promotion
Monitor growth
Optimize based on usage patterns
Prepare infrastructure for scale
Phase 3: Full Launch (Week 5+)
Announce publicly
Press release
Social media campaign
Community engagement
Emergency Procedures
If Site Goes Down
Check Cloudflare status
Review error logs
Rollback if needed
Post status update
Investigate root cause
Implement fix
Post-mortem report
If Data Breach Suspected
Immediately investigate
Isolate affected systems
Notify users if confirmed
Change all credentials
Conduct full security audit
Implement additional safeguards
Public transparency report
This comprehensive guide provides a complete roadmap for implementing all 60 improvements systematically. Follow the phases in order, test thoroughly at each step, and maintain good documentation throughout. The entire implementation should take approximately 15 working days for a skilled developer, with additional time for testing and refinement.










