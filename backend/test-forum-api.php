<?php
// Forum API Test Script
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$test_results = [
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => [],
    'overall_status' => 'success'
];

// Test 1: Database Connection
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
    
    $test_results['tests']['database_connection'] = [
        'status' => 'success',
        'message' => 'Database connection successful'
    ];
    
} catch (PDOException $e) {
    $test_results['tests']['database_connection'] = [
        'status' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ];
    $test_results['overall_status'] = 'error';
}

// Test 2: Forum Categories
try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM forum_categories");
    $result = $stmt->fetch();
    $test_results['tests']['forum_categories'] = [
        'status' => 'success',
        'count' => $result['count'],
        'message' => "Found {$result['count']} forum categories"
    ];
} catch (PDOException $e) {
    $test_results['tests']['forum_categories'] = [
        'status' => 'error',
        'message' => 'Failed to query forum categories: ' . $e->getMessage()
    ];
    $test_results['overall_status'] = 'error';
}

// Test 3: Forum Tags
try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM forum_tags");
    $result = $stmt->fetch();
    $test_results['tests']['forum_tags'] = [
        'status' => 'success',
        'count' => $result['count'],
        'message' => "Found {$result['count']} forum tags"
    ];
} catch (PDOException $e) {
    $test_results['tests']['forum_tags'] = [
        'status' => 'error',
        'message' => 'Failed to query forum tags: ' . $e->getMessage()
    ];
    $test_results['overall_status'] = 'error';
}

// Test 4: Post Flairs
try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM post_flairs");
    $result = $stmt->fetch();
    $test_results['tests']['post_flairs'] = [
        'status' => 'success',
        'count' => $result['count'],
        'message' => "Found {$result['count']} post flairs"
    ];
} catch (PDOException $e) {
    $test_results['tests']['post_flairs'] = [
        'status' => 'error',
        'message' => 'Failed to query post flairs: ' . $e->getMessage()
    ];
    $test_results['overall_status'] = 'error';
}

// Test 5: Admin Users
try {
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users");
    $result = $stmt->fetch();
    $test_results['tests']['admin_users'] = [
        'status' => 'success',
        'count' => $result['count'],
        'message' => "Found {$result['count']} admin users"
    ];
} catch (PDOException $e) {
    $test_results['tests']['admin_users'] = [
        'status' => 'error',
        'message' => 'Failed to query admin users: ' . $e->getMessage()
    ];
    $test_results['overall_status'] = 'error';
}

// Test 6: Forum API Endpoints
$endpoints_to_test = [
    'categories' => 'forum-unified-api.php?action=categories',
    'topics' => 'forum-unified-api.php?action=topics',
    'stats' => 'forum-unified-api.php?action=stats'
];

foreach ($endpoints_to_test as $name => $endpoint) {
    $test_results['tests']["api_{$name}"] = [
        'status' => 'info',
        'endpoint' => $endpoint,
        'message' => "Test manually: https://taxed.ch/{$endpoint}"
    ];
}

echo json_encode($test_results, JSON_PRETTY_PRINT);
?>
