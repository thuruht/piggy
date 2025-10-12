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
    reports: 10,     // 10 reports per hour
    upvotes: 20      // 20 upvotes per hour
  },
  CACHE_TTL: 60,     // 60 seconds for KV cache
  REFRESH_INTERVAL: 60000, // 60 seconds for client refresh
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_COMMENT_LENGTH: 500,
  MAX_AUTHOR_LENGTH: 50,
  DO_URLS: {
    WEBSOCKET: "http://tracker/websocket",
    BROADCAST: "http://tracker/broadcast",
  },
  DO_EVENTS: {
    MARKER_ADDED: "marker_added",
  }
} as const;