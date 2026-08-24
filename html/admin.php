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
