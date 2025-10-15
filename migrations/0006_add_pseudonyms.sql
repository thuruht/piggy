
-- Migration number: 0006 	 

-- Create pseudonyms table
CREATE TABLE IF NOT EXISTS pseudonyms (
  magic_code TEXT PRIMARY KEY,
  pseudonym TEXT NOT NULL
);

-- Alter comments table
CREATE TABLE comments_new (
  id TEXT PRIMARY KEY,
  markerId TEXT NOT NULL,
  magic_code TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (markerId) REFERENCES markers(id) ON DELETE CASCADE,
  FOREIGN KEY (magic_code) REFERENCES pseudonyms(magic_code)
);

INSERT INTO comments_new (id, markerId, magic_code, content, timestamp)
SELECT id, markerId, 'anonymous', content, timestamp FROM comments;

DROP TABLE comments;

ALTER TABLE comments_new RENAME TO comments;

