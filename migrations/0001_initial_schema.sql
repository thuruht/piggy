-- Migration number: 0001 	 2025-10-12T08:42:51.169Z
-- Migration 0001: Consolidated Initial Schema

-- Create markers table
CREATE TABLE IF NOT EXISTS markers (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT,
  description TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  magic_code TEXT,
  report_count INTEGER DEFAULT 0 NOT NULL,
  hidden BOOLEAN DEFAULT 0,
  is_archived BOOLEAN DEFAULT 0 NOT NULL,
  expires_at DATETIME
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  magic_code TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE,
  FOREIGN KEY (magic_code) REFERENCES pseudonyms(magic_code)
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create upvotes table
CREATE TABLE IF NOT EXISTS upvotes (
  id TEXT PRIMARY KEY,
  markerId TEXT,
  user_identifier TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  type TEXT DEFAULT 'regular',
  FOREIGN KEY(markerId) REFERENCES markers(id) ON DELETE CASCADE
);

-- Create pseudonyms table
CREATE TABLE IF NOT EXISTS pseudonyms (
  magic_code TEXT PRIMARY KEY,
  pseudonym TEXT NOT NULL
);