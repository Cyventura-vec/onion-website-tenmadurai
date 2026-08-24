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
-- NOTE: DB auth is DEPRECATED. Portal now uses encrypted cookie sessions. See config.php.
