

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