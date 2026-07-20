<?php
/**
 * WhatsApp lead logger for taxed.ch
 *
 * Replaces the old Firestore tracker (writes were rejected by security
 * rules, so no lead was ever stored). Each WhatsApp-button click is
 * appended to whatsapp-leads/leads.jsonl one level ABOVE public_html
 * (not web-accessible) and info@taxed.ch is notified by email, throttled
 * to at most one mail per 10 minutes so the endpoint cannot be abused
 * to flood the inbox.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://taxed.ch');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method-not-allowed']);
    exit;
}

$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) {
    $data = [];
}

$clean = static function (string $key, int $max = 300) use ($data): string {
    $v = isset($data[$key]) ? (string) $data[$key] : '';
    return mb_substr(trim($v), 0, $max);
};

$lead = [
    'timestamp'   => gmdate('c'),
    'source'      => $clean('source', 60),
    'page'        => $clean('page'),
    'referrer'    => $clean('referrer'),
    'language'    => $clean('language', 20),
    'screenSize'  => $clean('screenSize', 20),
    'userAgent'   => $clean('userAgent', 400),
    'utmSource'   => $clean('utmSource', 100),
    'utmMedium'   => $clean('utmMedium', 100),
    'utmCampaign' => $clean('utmCampaign', 100),
];

// public_html/api/ -> two levels up = domains/taxed.ch/ (outside the webroot)
$dir = dirname(__DIR__, 2) . '/whatsapp-leads';
if (!is_dir($dir)) {
    @mkdir($dir, 0755, true);
}

$stored = @file_put_contents(
    $dir . '/leads.jsonl',
    json_encode($lead, JSON_UNESCAPED_SLASHES) . "\n",
    FILE_APPEND | LOCK_EX
) !== false;

$marker = $dir . '/.last-mail';
if ($stored && (!file_exists($marker) || time() - filemtime($marker) > 600)) {
    @touch($marker);
    $body = "A visitor clicked the WhatsApp button on taxed.ch.\n\n"
          . "Time (UTC): {$lead['timestamp']}\n"
          . "Page:       {$lead['page']}\n"
          . "Source:     {$lead['source']}\n"
          . "Referrer:   {$lead['referrer']}\n"
          . "Language:   {$lead['language']}\n\n"
          . "All clicks are stored in whatsapp-leads/leads.jsonl (one level above public_html).\n"
          . "Notifications are limited to one email per 10 minutes.\n";
    @mail(
        'info@taxed.ch',
        'New WhatsApp lead on taxed.ch',
        $body,
        "From: noreply@taxed.ch\r\nReply-To: info@taxed.ch"
    );
}

echo json_encode(['ok' => $stored]);
