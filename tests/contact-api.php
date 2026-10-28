<?php
declare(strict_types=1);
define('ALANDIS_CONTACT_TEST', true);
require __DIR__ . '/../public/api/contact.php';

function verify(bool $condition, string $label): void {
    if (!$condition) throw new RuntimeException('FAIL: ' . $label);
    echo "PASS: $label\n";
}

$input = ['name' => 'Ana Ștefan', 'phone' => '+40 (764) 900-841', 'interest' => 'Închiriere (Ride-sharing)', 'message' => "Bună ziua!\nDetalii, vă rog.", 'requestId' => '12345678-1234-4234-8234-123456789012'];
$clean = contact_validate($input);
verify($clean !== null && $clean['name'] === 'Ana Ștefan', 'Romanian and international telephone accepted');
foreach (['', 'abc', '123', '+1234567890123456', "0764900841\nBcc: x@y.ro"] as $phone) {
    verify(contact_validate(array_replace($input, ['phone' => $phone])) === null, 'invalid phone rejected');
}
verify(contact_validate(array_replace($input, ['name' => '   '])) === null, 'empty name rejected');
verify(contact_validate(array_replace($input, ['name' => ['invalid']])) === null, 'non-string rejected');
verify(contact_validate(array_replace($input, ['name' => "Ana\nBcc: evil"])) === null, 'header newline rejected');
verify(contact_validate(array_replace($input, ['message' => str_repeat('ă', 2001)])) === null, 'unicode length limit');
verify(contact_validate(array_replace($input, ['message' => ''])) !== null, 'message optional');
verify(contact_validate(array_replace($input, ['requestId' => 'bad'])) === null, 'invalid request ID');
$directory = sys_get_temp_dir() . '/alandis-test-' . bin2hex(random_bytes(6));
$config = ['api_key' => 're_test_only', 'from' => 'ALANDIS <formular@example.com>', 'to' => 'office@example.com', 'state_dir' => $directory, 'per_ip_limit' => 2, 'global_limit' => 3];
$payload = contact_email(array_replace($clean, ['message' => '<script>alert(1)</script>']), $config);
verify(!isset($payload['html']) && $payload['to'] === ['office@example.com'], 'text-only email with fixed recipient');
verify(str_contains($payload['text'], $clean['phone']), 'telephone included in email');
try {
    verify(contact_limit($config, '192.0.2.1'), 'first attempt');
    verify(contact_limit($config, '192.0.2.1'), 'second attempt');
    verify(!contact_limit($config, '192.0.2.1'), 'IP rate limit');
    verify(contact_limit($config, '192.0.2.2'), 'other IP');
    verify(!contact_limit($config, '192.0.2.3'), 'global limit');
    $stored = file_get_contents($directory . '/contact-rate.json');
    verify(!str_contains($stored, '192.0.2.') && !str_contains($stored, 'Ana'), 'no raw IP or message stored');
    file_put_contents($directory . '/contact-rate.json', json_encode([['time' => time() - 3601, 'ip' => 'old']]));
    verify(contact_limit($config, '192.0.2.1'), 'expired state pruned');
    verify(!str_contains(file_get_contents($directory . '/contact-rate.json'), 'old'), 'expired entry removed');
} finally {
    @unlink($directory . '/contact-rate.json');
    @rmdir($directory);
}

// Run with php -n (no cURL extension) to simulate Resend without external mail.
if (!function_exists('curl_init')) {
    foreach (['CURLOPT_POST','CURLOPT_RETURNTRANSFER','CURLOPT_CONNECTTIMEOUT','CURLOPT_TIMEOUT','CURLOPT_HTTPHEADER','CURLOPT_POSTFIELDS','CURLINFO_RESPONSE_CODE'] as $i => $name) define($name, $i);
    function curl_init($url) { verify($url === 'https://api.resend.com/emails', 'fixed provider URL'); return new stdClass(); }
    function curl_setopt_array($handle, $options) { $GLOBALS['options'] = $options; }
    function curl_exec($handle) { return $GLOBALS['providerBody']; }
    function curl_getinfo($handle, $key) { return $GLOBALS['providerStatus']; }
    function curl_close($handle) {}
    $GLOBALS['providerStatus'] = 200;
    $GLOBALS['providerBody'] = '{"id":"test-id"}';
    verify(contact_send($payload, 're_test_only', 'contact/test'), 'provider success accepted');
    verify(in_array('Idempotency-Key: contact/test', $GLOBALS['options'][CURLOPT_HTTPHEADER]), 'idempotency header');
    $GLOBALS['providerStatus'] = 403;
    verify(!contact_send($payload, 're_test_only', 'contact/test'), 'provider error rejected');
    $GLOBALS['providerStatus'] = 200;
    $GLOBALS['providerBody'] = '<html>Bad gateway</html>';
    verify(!contact_send($payload, 're_test_only', 'contact/test'), 'non-JSON response rejected');
    $GLOBALS['providerBody'] = false;
    verify(!contact_send($payload, 're_test_only', 'contact/test'), 'network failure rejected');
}
