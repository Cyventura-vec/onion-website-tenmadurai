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
