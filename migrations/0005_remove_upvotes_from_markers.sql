-- Migration number: 0005 	 2025-10-12T03:34:33.379Z
CREATE TABLE markers_new (
    id TEXT PRIMARY KEY,
    type TEXT,
    title TEXT,
    description TEXT,
    latitude REAL,
    longitude REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    magic_code TEXT,
    media TEXT,
    is_archived INTEGER DEFAULT 0,
    expires_at DATETIME
);

INSERT INTO markers_new (id, type, title, description, latitude, longitude, timestamp, magic_code, media, is_archived, expires_at)
SELECT id, type, title, description, latitude, longitude, timestamp, magic_code, media, is_archived, expires_at
FROM markers;

DROP TABLE markers;

ALTER TABLE markers_new RENAME TO markers;

-- Add a type column to the upvotes table
ALTER TABLE upvotes ADD COLUMN type TEXT;