<?php
include 'config.php';

$cookie = $_COOKIE['session'] ?? '';

if (!$cookie) {
    header('Location: login.php');
    exit;
}

$decrypted = decrypt_session($cookie);

if ($decrypted === null) {
    die('Error: Invalid session.');
}

$data = json_decode($decrypted, true);

if ($data === null) {
    die('Error: Invalid session.');
}

if (!isset($data['role']) || $data['role'] !== 'admin' || !isset($data['access_level']) || (int)$data['access_level'] < 5) {
    die('Error: Invalid session.');
}

if (!isset($data['expires']) || $data['expires'] !== '2027-09-23') {
    die('Error: Invalid session.');
}

if (isset($_GET['action']) && $_GET['action'] === 'contacts') {
    header('Content-Type: application/json');
    $log_file = __DIR__ . '/tmp/contacts.json';
    if (file_exists($log_file)) {
        $raw     = file_get_contents($log_file);
        $entries = json_decode($raw, true);
        echo json_encode(is_array($entries) ? $entries : []);
    } else {
        echo json_encode([]);
    }
    exit;
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
echo "FLAG: CYV{KUMARI_ADMIN_0x1}\n";
echo str_repeat('=', 80) . "\n";
echo "VM Access: http://vm.projectkumari.onion:8080\n";
echo "Credentials: researcher / " . htmlspecialchars($data['user']) . "\n";
echo str_repeat('=', 80) . "\n";
?>
