<?php
/**
 * Forum API Test Endpoint
 * Simple test to verify forum API is working
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    // Test database connection
    require_once 'config/database.php';
    $pdo = getDatabase();
    
    // Test if forum tables exist
    $tables = ['forum_categories', 'forum_topics', 'forum_posts'];
    $existingTables = [];
    
    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            $existingTables[] = $table;
        }
    }
    
    // Test forum categories
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM forum_categories");
    $categoryCount = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Test forum topics
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM forum_topics");
    $topicCount = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Test forum posts
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM forum_posts");
    $postCount = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    echo json_encode([
        'success' => true,
        'message' => 'Forum API is working correctly!',
        'database_connection' => 'OK',
        'tables_exist' => $existingTables,
        'data_counts' => [
            'categories' => $categoryCount,
            'topics' => $topicCount,
            'posts' => $postCount
        ],
        'api_endpoints' => [
            'https://taxed.ch/backend/forum-api.php?action=categories' => 'Get categories',
            'https://taxed.ch/backend/forum-api.php?action=topics' => 'Get topics',
            'https://taxed.ch/backend/forum-api.php?action=posts' => 'Get posts',
            'https://taxed.ch/backend/forum-api.php?action=stats' => 'Get statistics'
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
}
?>
