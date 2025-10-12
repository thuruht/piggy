-- Migration number: 0001 	 2025-10-12T08:42:51.169Z

-- Create markers table
CREATE TABLE IF NOT EXISTS markers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  magic_code TEXT,
  report_count INTEGER DEFAULT 0,
  hidden BOOLEAN DEFAULT 0,
  is_archived BOOLEAN DEFAULT 0,
  expires_at DATETIME
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  author TEXT,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  createdAt INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create upvotes table
CREATE TABLE IF NOT EXISTS upvotes (
    id TEXT PRIMARY KEY,
    markerId TEXT,
    user_identifier TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    type TEXT,
    FOREIGN KEY(markerId) REFERENCES markers(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_markers_timestamp ON markers(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_markers_type ON markers(type);
CREATE INDEX IF NOT EXISTS idx_markers_report_count ON markers(report_count);
CREATE INDEX IF NOT EXISTS idx_markers_hidden ON markers(hidden);
CREATE INDEX IF NOT EXISTS idx_comments_marker ON comments(markerId);
CREATE INDEX IF NOT EXISTS idx_comments_timestamp ON comments(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_media_marker ON media(markerId);
CREATE INDEX IF NOT EXISTS idx_upvotes_marker ON upvotes(markerId);

-- Add is_archived and expires_at columns to markers table if they don't exist
ALTER TABLE markers ADD COLUMN is_archived BOOLEAN DEFAULT 0;
ALTER TABLE markers ADD COLUMN expires_at DATETIME;
ALTER TABLE upvotes ADD COLUMN type TEXT;