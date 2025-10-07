-- Add upvotes column to markers table
ALTER TABLE markers ADD COLUMN upvotes INTEGER DEFAULT 0;

-- Create an index for upvotes
CREATE INDEX idx_markers_upvotes ON markers(upvotes);