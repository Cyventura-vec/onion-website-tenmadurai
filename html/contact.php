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

// Keep a small server-side intake log for the admin archive view.
$log_dir  = __DIR__ . '/tmp';
$log_file = $log_dir . '/contacts.json';

$entry = [
    'name'      => $name,
    'email'     => $email,
    'message'   => $message,
    'timestamp' => gmdate('c'),
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
];

if (!is_dir($log_dir)) {
    mkdir($log_dir, 0775, true);
}

$handle = fopen($log_file, 'c+');
if ($handle !== false) {
    if (flock($handle, LOCK_EX)) {
        $raw = stream_get_contents($handle);
        $decoded = json_decode($raw ?: '[]', true);
        $log = is_array($decoded) ? $decoded : [];
        $log[] = $entry;
        $log = array_slice($log, -100);

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($log, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        fflush($handle);
        flock($handle, LOCK_UN);
    }
    fclose($handle);
}

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
    // Mail failure is non-fatal; submission logging already ran.
    echo 'Message transmitted to the archive.';
}
