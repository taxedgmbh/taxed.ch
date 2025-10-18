<?php
// Simple API test script
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'success',
    'message' => 'API is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => [
        'php_version' => phpversion(),
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'Unknown'
    ],
    'available_endpoints' => [
        'test' => '/backend/test-api.php',
        'forum_categories' => '/backend/forum-unified-api.php?action=categories',
        'forum_topics' => '/backend/forum-unified-api.php?action=topics',
        'forum_posts' => '/backend/forum-unified-api.php?action=posts',
        'forum_stats' => '/backend/forum-unified-api.php?action=stats'
    ]
]);
?>
