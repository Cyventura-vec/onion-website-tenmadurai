<?php
include 'config.php';



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
