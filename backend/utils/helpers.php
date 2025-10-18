<?php

/**
 * General helper functions for the Taxed GmbH application
 */

/**
 * Generate a random string
 */
function generateRandomString($length = 10, $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
    $string = '';
    $charactersLength = strlen($characters);
    
    for ($i = 0; $i < $length; $i++) {
        $string .= $characters[rand(0, $charactersLength - 1)];
    }
    
    return $string;
}

/**
 * Generate a UUID v4
 */
function generateUUID() {
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email address
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate phone number (Swiss format)
 */
function isValidSwissPhone($phone) {
    $pattern = '/^(\+41|0041|0)?[1-9]\d{8}$/';
    return preg_match($pattern, preg_replace('/[\s\-\(\)]/', '', $phone));
}

/**
 * Format Swiss phone number
 */
function formatSwissPhone($phone) {
    $cleaned = preg_replace('/[\s\-\(\)]/', '', $phone);
    
    if (preg_match('/^(\+41|0041|0)([1-9]\d{8})$/', $cleaned, $matches)) {
        $number = $matches[2];
        return '+41 ' . substr($number, 0, 2) . ' ' . substr($number, 2, 3) . ' ' . substr($number, 5, 2) . ' ' . substr($number, 7, 2);
    }
    
    return $phone;
}

/**
 * Format currency (Swiss Francs)
 */
function formatCurrency($amount, $currency = 'CHF') {
    return number_format($amount, 2, '.', "'") . ' ' . $currency;
}

/**
 * Parse currency string to float
 */
function parseCurrency($currencyString) {
    return (float) preg_replace('/[^\d.,]/', '', str_replace(',', '.', $currencyString));
}

/**
 * Generate slug from string
 */
function generateSlug($string, $separator = '-') {
    $slug = strtolower(trim($string));
    $slug = preg_replace('/[^a-z0-9-]/', $separator, $slug);
    $slug = preg_replace('/-+/', $separator, $slug);
    return trim($slug, $separator);
}

/**
 * Convert bytes to human readable format
 */
function formatBytes($bytes, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    
    for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
        $bytes /= 1024;
    }
    
    return round($bytes, $precision) . ' ' . $units[$i];
}

/**
 * Get file extension
 */
function getFileExtension($filename) {
    return strtolower(pathinfo($filename, PATHINFO_EXTENSION));
}

/**
 * Check if file is image
 */
function isImage($filename) {
    $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    return in_array(getFileExtension($filename), $imageExtensions);
}

/**
 * Generate password hash
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

/**
 * Verify password
 */
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

/**
 * Generate CSRF token
 */
function generateCSRFToken() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    return $token;
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken($token) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Get client IP address
 */
function getClientIP() {
    $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/**
 * Get user agent
 */
function getUserAgent() {
    return $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
}

/**
 * Log activity
 */
function logActivity($message, $level = 'info', $context = []) {
    $logFile = __DIR__ . '/../logs/activity.log';
    $timestamp = date('Y-m-d H:i:s');
    $contextStr = !empty($context) ? ' ' . json_encode($context) : '';
    $logEntry = "[{$timestamp}] [{$level}] {$message}{$contextStr}" . PHP_EOL;
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Send email
 */
function sendEmail($to, $subject, $message, $headers = []) {
    $defaultHeaders = [
        'From' => 'noreply@taxedgmbh.ch',
        'Reply-To' => 'info@taxedgmbh.ch',
        'Content-Type' => 'text/html; charset=UTF-8',
        'X-Mailer' => 'Taxed GmbH Mailer'
    ];
    
    $headers = array_merge($defaultHeaders, $headers);
    $headerString = '';
    
    foreach ($headers as $key => $value) {
        $headerString .= "{$key}: {$value}\r\n";
    }
    
    return mail($to, $subject, $message, $headerString);
}

/**
 * Send HTML email
 */
function sendHTMLEmail($to, $subject, $htmlMessage, $textMessage = null) {
    $boundary = uniqid('boundary_');
    $headers = [
        'From' => 'noreply@taxedgmbh.ch',
        'Reply-To' => 'info@taxedgmbh.ch',
        'MIME-Version' => '1.0',
        'Content-Type' => "multipart/alternative; boundary=\"{$boundary}\"",
        'X-Mailer' => 'Taxed GmbH Mailer'
    ];
    
    $body = "--{$boundary}\r\n";
    
    if ($textMessage) {
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= $textMessage . "\r\n";
        $body .= "--{$boundary}\r\n";
    }
    
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlMessage . "\r\n";
    $body .= "--{$boundary}--\r\n";
    
    return sendEmail($to, $subject, $body, $headers);
}

/**
 * Generate pagination data
 */
function generatePagination($currentPage, $totalItems, $itemsPerPage, $baseUrl) {
    $totalPages = ceil($totalItems / $itemsPerPage);
    $currentPage = max(1, min($currentPage, $totalPages));
    
    $pagination = [
        'current_page' => $currentPage,
        'total_pages' => $totalPages,
        'total_items' => $totalItems,
        'items_per_page' => $itemsPerPage,
        'has_previous' => $currentPage > 1,
        'has_next' => $currentPage < $totalPages,
        'previous_page' => $currentPage > 1 ? $currentPage - 1 : null,
        'next_page' => $currentPage < $totalPages ? $currentPage + 1 : null,
        'pages' => []
    ];
    
    // Generate page numbers
    $start = max(1, $currentPage - 2);
    $end = min($totalPages, $currentPage + 2);
    
    for ($i = $start; $i <= $end; $i++) {
        $pagination['pages'][] = [
            'number' => $i,
            'url' => $baseUrl . '?page=' . $i,
            'is_current' => $i === $currentPage
        ];
    }
    
    return $pagination;
}

/**
 * Convert array to CSV
 */
function arrayToCSV($data, $filename = 'export.csv') {
    if (empty($data)) {
        return false;
    }
    
    $output = fopen('php://temp', 'r+');
    
    // Add headers
    fputcsv($output, array_keys($data[0]));
    
    // Add data
    foreach ($data as $row) {
        fputcsv($output, $row);
    }
    
    rewind($output);
    $csv = stream_get_contents($output);
    fclose($output);
    
    return $csv;
}

/**
 * Convert CSV to array
 */
function csvToArray($csvString) {
    $lines = str_getcsv($csvString, "\n");
    $data = [];
    
    if (empty($lines)) {
        return $data;
    }
    
    $headers = str_getcsv($lines[0]);
    
    for ($i = 1; $i < count($lines); $i++) {
        $row = str_getcsv($lines[$i]);
        if (count($row) === count($headers)) {
            $data[] = array_combine($headers, $row);
        }
    }
    
    return $data;
}

/**
 * Generate QR code data URL
 */
function generateQRCode($data, $size = 200) {
    $url = 'https://api.qrserver.com/v1/create-qr-code/';
    $params = http_build_query([
        'size' => $size . 'x' . $size,
        'data' => $data
    ]);
    
    return $url . '?' . $params;
}

/**
 * Get time ago string
 */
function timeAgo($datetime) {
    $time = time() - strtotime($datetime);
    
    if ($time < 60) {
        return 'just now';
    } elseif ($time < 3600) {
        $minutes = floor($time / 60);
        return $minutes . ' minute' . ($minutes > 1 ? 's' : '') . ' ago';
    } elseif ($time < 86400) {
        $hours = floor($time / 3600);
        return $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
    } elseif ($time < 2592000) {
        $days = floor($time / 86400);
        return $days . ' day' . ($days > 1 ? 's' : '') . ' ago';
    } else {
        return date('M j, Y', strtotime($datetime));
    }
}

/**
 * Check if string is JSON
 */
function isJson($string) {
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
}

/**
 * Deep merge arrays
 */
function arrayMergeDeep($array1, $array2) {
    $merged = $array1;
    
    foreach ($array2 as $key => $value) {
        if (is_array($value) && isset($merged[$key]) && is_array($merged[$key])) {
            $merged[$key] = arrayMergeDeep($merged[$key], $value);
        } else {
            $merged[$key] = $value;
        }
    }
    
    return $merged;
}

/**
 * Get configuration value
 */
function config($key, $default = null) {
    static $config = null;
    
    if ($config === null) {
        $configFile = __DIR__ . '/../config/app.php';
        if (file_exists($configFile)) {
            $config = include $configFile;
        } else {
            $config = [];
        }
    }
    
    $keys = explode('.', $key);
    $value = $config;
    
    foreach ($keys as $k) {
        if (isset($value[$k])) {
            $value = $value[$k];
        } else {
            return $default;
        }
    }
    
    return $value;
}

/**
 * Environment helper
 */
function env($key, $default = null) {
    $value = getenv($key);
    return $value !== false ? $value : $default;
}

/**
 * Check if running in production
 */
function isProduction() {
    return env('APP_ENV', 'development') === 'production';
}

/**
 * Check if running in development
 */
function isDevelopment() {
    return env('APP_ENV', 'development') === 'development';
}






