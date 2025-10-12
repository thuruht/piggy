-- Add expiresAt and isArchived columns to the markers table
ALTER TABLE markers ADD COLUMN expiresAt DATETIME;
ALTER TABLE markers ADD COLUMN isArchived BOOLEAN DEFAULT 0;

-- Add type column to the upvotes table
ALTER TABLE upvotes ADD COLUMN type TEXT DEFAULT 'regular';