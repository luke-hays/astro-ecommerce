CREATE TABLE IF NOT EXISTS cart (
  session_id TEXT PRIMARY KEY NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  items JSON
);