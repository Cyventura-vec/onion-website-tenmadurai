# Project KUMARI – CTF Web Challenge

**Project KUMARI** is a dockerized, intentionally vulnerable PHP 7.4 web application designed as a security CTF challenge.

## Challenge Overview & Intended Solve Path

1. **Information Gathering**:
   - Inspect page source or `robots.txt` to notice disallowed entries (`/backups/`, `/admin.php`).
   - Check page footer / comments referencing the legacy Obsidian desktop companion app (`app://local/`).

2. **LFI Vulnerability Exploitation**:
   - Use the LFI parameter `?page=app://local/backups/old_site_map.txt` to read migration notes referencing Obsidian companion v1.2.7 (CVE-2023-2110).
   - Use `?page=app://local/config.php` to exfiltrate raw PHP source code and retrieve the AES-256-CBC session key:
     `4b1e9d2c6a7f0834c5e19a2b7d6f0e834b1e9d2c6a7f0834c5e19a2b7d6f0e83`

3. **Session Cookie Forgery**:
   - Decrypt your current session cookie to analyze the JSON structure:
     `{"user": "guest", "role": "viewer", "expires": "...", "access_level": 1}`
   - Forge a new cookie encrypted with the extracted key containing:
     `{"user": "kabilan", "role": "admin", "expires": "2027-09-23", "access_level": 5}`

4. **Privilege Escalation & Flag Extraction**:
   - Send the forged session cookie to `admin.php`.
   - Access the restricted archives read from `/opt/kumari_classified/` to reveal the flag:
     `FLAG: KUMARI{0bs1d1an_l0cal_p4th_t0_4dm1n_f0rg3d}`

---

## Quick Start & Deployment

### Prerequisites
- Docker

### Building and Running the Container

```bash
# Build the Docker image
docker build -t project_kumari .

# Run the container on port 80
docker run -d -p 80:80 --name kumari_challenge project_kumari
```

Once running, access the application at `http://localhost`.

---

## Directory Structure

```
.
├── Dockerfile
├── README.md
├── solve.py
├── classified/
│   ├── 01_tenmadurai_fall.txt
│   ├── 02_street_academy.txt
│   ├── 03_public_apathy.txt
│   └── 04_consequences.txt            <-- Contains CTF Flag
└── html/
    ├── .htaccess
    ├── admin.php
    ├── config.php
    ├── index.php
    ├── login.php
    ├── robots.txt
    ├── backups/
    │   ├── db_backup.sql
    │   └── old_site_map.txt
    ├── docs/
    │   ├── public/
    │   └── tenmadurai/                <-- Decoy documents archive
    ├── includes/
    │   ├── footer.php
    │   └── header.php
    └── tmp/
        └── error_logs/
```

---

## Verification & Acceptance Checklist

- [x] Initial visit to `/` sets a valid encrypted `session` cookie (`guest`/`viewer`).
- [x] `?page=app://local/config.php` returns raw `config.php` code containing the 32-byte hex key.
- [x] `?page=app://local/backups/old_site_map.txt` returns migration notes referencing Obsidian v1.2.7.
- [x] Decoy path `docs/tenmadurai/` provides a complete story ending with a definitive closing line.
- [x] Traversal to `/opt/kumari_classified/` via LFI is prevented.
- [x] Valid admin forged session cookie (`role=admin`, `expires=2027-09-23`) on `admin.php` returns all four restricted documents including the flag.
- [x] `role=admin` with any other `expires` date returns `"Error: Session expired."`.
- [x] `role=viewer` on `admin.php` returns `"Error: Insufficient privileges."`.
