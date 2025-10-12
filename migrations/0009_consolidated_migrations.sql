-- Migration number: 0009 	 2025-10-12T07:09:48.838Z
-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS upvotes;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS markers;

-- Create markers table
CREATE TABLE markers (
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
  type TEXT NOT NULL,
  createdAt INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create upvotes table
CREATE TABLE upvotes (
    id TEXT PRIMARY KEY,
    markerId TEXT,
    user_identifier TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    type TEXT,
    FOREIGN KEY(markerId) REFERENCES markers(id)
);

-- Create indexes
CREATE INDEX idx_markers_timestamp ON markers(timestamp DESC);
CREATE INDEX idx_markers_type ON markers(type);
CREATE INDEX idx_markers_report_count ON markers(report_count);
CREATE INDEX idx_markers_hidden ON markers(hidden);
CREATE INDEX idx_comments_marker ON comments(markerId);
CREATE INDEX idx_comments_timestamp ON comments(createdAt DESC);
CREATE INDEX idx_media_marker ON media(markerId);
CREATE INDEX idx_upvotes_marker ON upvotes(markerId);