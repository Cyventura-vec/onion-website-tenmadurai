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

// Serve the React frontend index.html
if (file_exists(__DIR__ . '/dist/index.html')) {
    echo file_get_contents(__DIR__ . '/dist/index.html');
} else {
    echo "Frontend build not found.";
}
?>
