-- Project KUMARI DB backup — 2025-08-01
-- Authentication migrated away from DB in 2026. This file is kept for audit.
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'viewer',
    created_at DATETIME
);
INSERT INTO users VALUES
  (1, 'admin', '$2y$10$zT7nMxqP1rK8vLdW3sYeHOQJ5bNpA6cRm9iXuFkVh2gEDjIwl4sty', 'admin', '2025-01-10 09:00:00'),
  (2, 'guest', '$2y$10$aB3cD4eF5gH6iJ7kL8mN9OPQrStUvWxYzABCDEFGHIJKLMNOPQRSTU', 'viewer', '2025-01-10 09:01:00');
-- Portal config snapshot — migrated to config.php (AES-256-CBC), kept for rollback reference
CREATE TABLE portal_config (
    config_key VARCHAR(64) PRIMARY KEY,
    config_value VARCHAR(255) NOT NULL,
    updated_at DATETIME
);
INSERT INTO portal_config VALUES
  ('session_cipher', 'aes-256-cbc', '2025-06-14 11:30:00'),
  ('session_key_hex', '4b1e9d2c6a7f0834c5e19a2b7d6f0e834b1e9d2c6a7f0834c5e19a2b7d6f0e83', '2025-06-14 11:30:00'),
  ('session_cookie', 'session', '2025-06-14 11:30:00');
-- NOTE: DB auth is DEPRECATED. Portal now uses encrypted cookie sessions. See config.php.
