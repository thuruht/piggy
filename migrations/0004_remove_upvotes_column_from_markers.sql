-- Recreate markers table without upvotes column
CREATE TABLE markers_new (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    magicCode TEXT,
    reportCount INTEGER DEFAULT 0,
    hidden BOOLEAN DEFAULT 0,
    expiresAt DATETIME,
    isArchived BOOLEAN DEFAULT 0
);

INSERT INTO markers_new (id, title, type, description, latitude, longitude, timestamp, magicCode, reportCount, hidden, expiresAt, isArchived)
SELECT id, title, type, description, latitude, longitude, timestamp, magicCode, reportCount, hidden, expiresAt, isArchived FROM markers;

DROP TABLE markers;

ALTER TABLE markers_new RENAME TO markers;