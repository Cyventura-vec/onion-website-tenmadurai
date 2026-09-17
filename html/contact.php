<?php

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

// ── Log the submission ─────────────────────────────────────────────────────
$log_file = __DIR__ . '/tmp/contacts.json';

$entry = [
    'name'      => $name,
    'email'     => $email,
    'message'   => $message,
    'timestamp' => date('Y-m-d H:i:s'),
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
];

$log = [];
if (file_exists($log_file)) {
    $raw = file_get_contents($log_file);
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $log = $decoded;
    }
}
$log[] = $entry;
file_put_contents($log_file, json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
// ──────────────────────────────────────────────────────────────────────────

$mail = new PHPMailer(true);

$mail->setFrom($email ?: 'noreply@localhost', $name ?: 'Anonymous');
$mail->addAddress('root@localhost');
$mail->Subject = 'Project Aazhi Contact';
$mail->Body    = $message;

$mail->isMail();

try {
    $mail->send();
    echo 'Message transmitted to the archive.';
} catch (Exception $e) {
    // Mail failure is non-fatal – submission is already logged.
    echo 'Message transmitted to the archive.';
}
