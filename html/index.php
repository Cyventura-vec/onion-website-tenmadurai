<?php
include 'config.php';

$allowed_docs = [
    'docs/public/about.txt' => 'docs/public/about.txt',
    'docs/public/contact.txt' => 'docs/public/contact.txt',
    'docs/tenmadurai/01_tenmadurai_fall.txt' => 'docs/tenmadurai/01_tenmadurai_fall.txt',
    'docs/tenmadurai/02_street_academy.txt' => 'docs/tenmadurai/02_street_academy.txt',
    'docs/tenmadurai/03_public_apathy.txt' => 'docs/tenmadurai/03_public_apathy.txt',
    'docs/tenmadurai/04_consequences.txt' => 'docs/tenmadurai/04_consequences.txt',
    'docs/tenmadurai/01_mythological_overview.txt' => 'docs/tenmadurai/01_mythological_overview.txt',
    'docs/tenmadurai/02_serpent_mother_legend.txt' => 'docs/tenmadurai/02_serpent_mother_legend.txt',
    'docs/tenmadurai/03_golden_peacock_incident.txt' => 'docs/tenmadurai/03_golden_peacock_incident.txt',
    'docs/tenmadurai/04_aazhiyaan_decoder.txt' => 'docs/tenmadurai/04_aazhiyaan_decoder.txt',
    'docs/tenmadurai/05_curse_of_greed.txt' => 'docs/tenmadurai/05_curse_of_greed.txt',
];

if (isset($_GET['page'])) {
    $slug = $_GET['page'];
    if (!isset($allowed_docs[$slug])) {
        http_response_code(404);
        die('Document not found.');
    }
    $path = __DIR__ . '/' . $allowed_docs[$slug];
    if (file_exists($path) && is_file($path)) {
        header('Content-Type: text/plain');
        readfile($path);
        exit;
    }
    http_response_code(404);
    die('Document not found.');
}

$cookie = $_COOKIE['session'] ?? '';

if ($cookie) {
    $decrypted = decrypt_session($cookie);
    if ($decrypted === null) {
        die('Error: Invalid session.');
    }
    $data = json_decode($decrypted, true);
    if ($data === null) {
        die('Error: Invalid session.');
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

if (file_exists(__DIR__ . '/dist/index.html')) {
    echo file_get_contents(__DIR__ . '/dist/index.html');
} else {
    echo "Frontend build not found.";
}
?>
