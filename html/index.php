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
