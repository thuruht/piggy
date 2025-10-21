PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  comment TEXT,
  longitude REAL NOT NULL,
  latitude REAL NOT NULL,
  timestamp INTEGER NOT NULL,
  reporter_ip TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
, icon TEXT DEFAULT 'local_police_128dp_BFF4CD_FILL0_wght400_GRAD0_opsz48.png');
CREATE TABLE edit_tokens (
  token TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);
CREATE TABLE comment_media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id TEXT NOT NULL,
  url TEXT NOT NULL,
  content_type TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);
CREATE TABLE d1_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" VALUES(1,'0001_initial_schema.sql','2025-10-12 08:16:26');
INSERT INTO "d1_migrations" VALUES(2,'0002_add_upvotes.sql','2025-10-12 08:16:27');
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
, upvotes INTEGER DEFAULT 0);
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  createdAt INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);
CREATE TABLE media (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('image', 'video', 'audio')),
  createdAt INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE
);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('d1_migrations',2);
CREATE INDEX idx_reports_timestamp ON reports (timestamp DESC);
CREATE INDEX idx_reports_location ON reports (latitude, longitude);
CREATE INDEX idx_reports_type ON reports (type);
CREATE INDEX idx_edit_tokens_report_id ON edit_tokens (report_id);
CREATE INDEX idx_edit_tokens_expires_at ON edit_tokens (expires_at);
CREATE INDEX idx_comment_media_comment_id ON comment_media (comment_id);
CREATE INDEX idx_markers_timestamp ON markers(timestamp DESC);
CREATE INDEX idx_markers_type ON markers(type);
CREATE INDEX idx_markers_report_count ON markers(reportCount);
CREATE INDEX idx_markers_hidden ON markers(hidden);
CREATE INDEX idx_comments_marker ON comments(markerId);
CREATE INDEX idx_comments_timestamp ON comments(createdAt DESC);
CREATE INDEX idx_media_marker ON media(markerId);
CREATE INDEX idx_markers_upvotes ON markers(upvotes);
