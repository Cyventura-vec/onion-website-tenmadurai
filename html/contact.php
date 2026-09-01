<?php

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

$mail = new PHPMailer(true);

$mail->setFrom($email, $name);
$mail->addAddress('root@localhost');
$mail->Subject = 'Project Aazhi Contact';
$mail->Body = $message;

$mail->isMail();

try {
    $mail->send();

    echo 'Message transmitted to the archive.';
} catch (Exception $e) {
    http_response_code(500);
    echo 'Unable to send message.';
}