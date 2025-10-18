<?php
// API Diagnostic Script
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$diagnostics = [
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server_info' => [
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'Unknown',
        'request_uri' => $_SERVER['REQUEST_URI'] ?? 'Unknown'
    ],
    'file_checks' => [],
    'database_connection' => null,
    'errors' => []
];

// Check if files exist
$files_to_check = [
    'forum-unified-api.php',
    'forum-simple.php',
    'test-api.php',
    'diagnose-api.php'
];

foreach ($files_to_check as $file) {
    $file_path = __DIR__ . '/' . $file;
    $diagnostics['file_checks'][$file] = [
        'exists' => file_exists($file_path),
        'readable' => is_readable($file_path),
        'size' => file_exists($file_path) ? filesize($file_path) : 0
    ];
}

// Test database connection
try {
    $db_host = 'localhost';
    $db_port = '3306';
    $db_name = 'u497646184_taxedgmbh';
    $db_user = 'u497646184_taxedgmbh';
    $db_pass = 'Hauskauf629!';
    
    $pdo = new PDO(
        "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
    
    $diagnostics['database_connection'] = [
        'status' => 'success',
        'host' => $db_host,
        'database' => $db_name,
        'user' => $db_user
    ];
    
    // Test a simple query
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM forum_categories");
    $result = $stmt->fetch();
    $diagnostics['database_connection']['forum_categories_count'] = $result['count'];
    
} catch (PDOException $e) {
    $diagnostics['database_connection'] = [
        'status' => 'error',
        'message' => $e->getMessage()
    ];
    $diagnostics['errors'][] = 'Database connection failed: ' . $e->getMessage();
}

// Check for common issues
if (!extension_loaded('pdo')) {
    $diagnostics['errors'][] = 'PDO extension not loaded';
}

if (!extension_loaded('pdo_mysql')) {
    $diagnostics['errors'][] = 'PDO MySQL extension not loaded';
}

echo json_encode($diagnostics, JSON_PRETTY_PRINT);
?>
