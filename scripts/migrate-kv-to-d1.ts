import { Env } from '../src/types';
import { nanoid } from 'nanoid';

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