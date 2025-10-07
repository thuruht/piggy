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