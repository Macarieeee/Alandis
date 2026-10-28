<?php
declare(strict_types=1);

// PHP 8.1+ and cURL. No Composer dependencies or credentials in this file.
function contact_reply(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
}

function contact_validate(array $data): ?array
{
    $limits = ['name' => 100, 'phone' => 30, 'interest' => 160, 'message' => 2000];
    $clean = [];
    foreach ($limits as $field => $limit) {
        if (!isset($data[$field]) || !is_string($data[$field])) return null;
        $value = trim($data[$field]);
        $length = preg_match_all('/./us', $value);
        if ($length === false || $length > $limit || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value)) return null;
        if ($field !== 'message' && ($value === '' || preg_match('/[\r\n]/', $value))) return null;
        $clean[$field] = $value;
    }
    $digits = preg_replace('/\D/', '', $clean['phone']);
    if (!preg_match('/^\+?[0-9 ().-]+$/', $clean['phone']) || strlen($digits) < 7 || strlen($digits) > 15) return null;
    if (!isset($data['requestId']) || !is_string($data['requestId']) || !preg_match('/^[a-f0-9-]{36}$/i', $data['requestId'])) return null;
    $clean['requestId'] = $data['requestId'];
    return $clean;
}

function contact_email(array $data, array $config): array
{
    return [
        'from' => $config['from'],
        'to' => [$config['to']],
        'subject' => 'Solicitare nouă de pe alandis.ro',
        // Plain text prevents user-controlled HTML from being interpreted.
        'text' => "Solicitare din formularul ALANDIS\n\nNume: {$data['name']}\nTelefon: {$data['phone']}\nServiciu: {$data['interest']}\n\nMesaj:\n" . ($data['message'] ?: '(Fără mesaj suplimentar)') . "\n\nRăspunde solicitantului la numărul de telefon de mai sus.",
    ];
}

function contact_limit(array $config, string $ip): bool
{
    $dir = $config['state_dir'];
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('state');
    $file = @fopen($dir . '/contact-rate.json', 'c+');
    if (!$file || !flock($file, LOCK_EX)) throw new RuntimeException('lock');
    try {
        $stored = stream_get_contents($file);
        $entries = $stored === '' ? [] : json_decode($stored, true, 512, JSON_THROW_ON_ERROR);
        $now = time();
        $entries = array_values(array_filter($entries, fn($entry) => $entry['time'] > $now - 3600));
        $key = hash_hmac('sha256', $ip, $config['api_key']);
        $recent = count(array_filter($entries, fn($entry) => $entry['ip'] === $key && $entry['time'] > $now - 900));
        $allowed = $recent < $config['per_ip_limit'] && count($entries) < $config['global_limit'];
        if ($allowed) $entries[] = ['time' => $now, 'ip' => $key];
        $encoded = json_encode($entries, JSON_THROW_ON_ERROR);
        rewind($file);
        if (!ftruncate($file, 0) || fwrite($file, $encoded) !== strlen($encoded) || !fflush($file)) throw new RuntimeException('write');
        return $allowed;
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function contact_send(array $payload, string $key, string $idempotencyKey): bool
{
    $curl = curl_init('https://api.resend.com/emails');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $key, 'Content-Type: application/json', 'Idempotency-Key: ' . $idempotencyKey],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
    ]);
    $body = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);
    $result = is_string($body) ? json_decode($body, true) : null;
    // Never return or log the API response, submitted content, or API key.
    return $status >= 200 && $status < 300 && is_array($result) && !empty($result['id']);
}

function contact_handle(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        contact_reply(405, ['error' => 'Folosește formularul de contact pentru trimitere.']);
        return;
    }
    try {
        $path = getenv('ALANDIS_CONFIG_PATH') ?: dirname(__DIR__, 2) . '/alandis-private/resend.php';
        $real = realpath($path);
        $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__));
        if (!$real || ($root && str_starts_with($real, $root . DIRECTORY_SEPARATOR))) throw new RuntimeException('config');
        $config = require $real;
        if (!is_array($config) || !str_starts_with($config['api_key'] ?? '', 're_') || !function_exists('curl_init')) throw new RuntimeException('config');
        if (empty($config['from']) || !filter_var($config['to'] ?? '', FILTER_VALIDATE_EMAIL) || empty($config['allowed_origins']) || empty($config['state_dir'])) throw new RuntimeException('config');
        $statePath = realpath($config['state_dir']) ?: $config['state_dir'];
        if ($root && str_starts_with($statePath, $root . DIRECTORY_SEPARATOR)) throw new RuntimeException('state');
        $config['per_ip_limit'] = max(1, (int) ($config['per_ip_limit'] ?? 5));
        $config['global_limit'] = max(1, (int) ($config['global_limit'] ?? 50));
        // Exact origins only; no CORS. Proxy-forwarded IP headers are not trusted.
        if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', $config['allowed_origins'], true)) {
            contact_reply(403, ['error' => 'Te rugăm să trimiți mesajul din pagina Contact.']);
            return;
        }
        if (strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') {
            contact_reply(415, ['error' => 'Formatul cererii nu este acceptat.']);
            return;
        }
        $raw = file_get_contents('php://input', false, null, 0, 16385);
        if ($raw === false || strlen($raw) > 16384 || (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
            contact_reply(413, ['error' => 'Mesajul este prea lung.']);
            return;
        }
        $data = json_decode($raw, true);
        if (!is_array($data) || !isset($data['website']) || !is_string($data['website']) || $data['website'] !== '') {
            contact_reply(422, ['error' => 'Verifică datele completate.']);
            return;
        }
        $clean = contact_validate($data);
        if (!$clean) {
            contact_reply(422, ['error' => 'Completează numele, un număr de telefon valid și serviciul dorit.']);
            return;
        }
        if (!contact_limit($config, $_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
            header('Retry-After: 900');
            contact_reply(429, ['error' => 'Au fost trimise prea multe solicitări. Încearcă mai târziu sau contactează-ne telefonic.']);
            return;
        }
        $payload = contact_email($clean, $config);
        $id = 'contact/' . hash_hmac('sha256', $clean['requestId'] . json_encode($payload, JSON_UNESCAPED_UNICODE), $config['api_key']);
        if (!contact_send($payload, $config['api_key'], $id)) {
            contact_reply(502, ['error' => 'Trimiterea nu a putut fi confirmată. Poți reîncerca sau ne poți contacta telefonic.']);
            return;
        }
        contact_reply(200, ['ok' => true]);
    } catch (Throwable $error) {
        contact_reply(503, ['error' => 'Formularul este temporar indisponibil. Contactează-ne telefonic sau la office@alandis.ro.']);
    }
}

if (!defined('ALANDIS_CONTACT_TEST')) contact_handle();
