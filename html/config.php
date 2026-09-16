<?php
// AES-256-CBC session encryption
// Key must be exactly 32 bytes
$key = hex2bin('4b1e9d2c6a7f0834c5e19a2b7d6f0e834b1e9d2c6a7f0834c5e19a2b7d6f0e83');
$iv_size = openssl_cipher_iv_length('aes-256-cbc'); // 16

function encrypt_session($data) {
    global $key, $iv_size;
    $iv = openssl_random_pseudo_bytes($iv_size);
    $ciphertext = openssl_encrypt($data, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($iv . $ciphertext);
}

function decrypt_session($cookie) {
    global $key, $iv_size;

    // Try to detect format: hex or base64
    $decoded = null;

    // Try base64 first
    $base64_decoded = base64_decode($cookie, true);
    if ($base64_decoded !== false && strlen($base64_decoded) >= $iv_size) {
        $decoded = $base64_decoded;
    }

    // If base64 failed, try hex
    if ($decoded === null && ctype_xdigit($cookie) && strlen($cookie) % 2 === 0) {
        $hex_decoded = hex2bin($cookie);
        if ($hex_decoded !== false && strlen($hex_decoded) >= $iv_size) {
            $decoded = $hex_decoded;
        }
    }

    if ($decoded === null) {
        return null;
    }

    $iv = substr($decoded, 0, $iv_size);
    $ciphertext = substr($decoded, $iv_size);

    if (strlen($ciphertext) === 0 || strlen($ciphertext) % 16 !== 0) {
        return null;
    }

    $plaintext = openssl_decrypt($ciphertext, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    if ($plaintext === false) {
        return null;
    }

    return $plaintext;
}
?>
