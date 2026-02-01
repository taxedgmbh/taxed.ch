<?php
/**
 * Simplified Forum API
 * Standalone version without external dependencies
 */

header('Content-Type: application/json');

// CORS configuration - restrict to specific origins
$allowed_origins = ['https://taxed.ch', 'https://www.taxed.ch', 'http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple database connection using environment variables
function getSimpleDatabase() {
    try {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $dbname = $_ENV['DB_NAME'] ?? 'u497646184_taxedgmbh';
        $username = $_ENV['DB_USER'] ?? 'u497646184_taxedgmbh';
        $password = $_ENV['DB_PASS'] ?? '';

        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        return null;
    }
}

// Get request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Route the request
switch ($action) {
    case 'categories':
        handleCategories($method);
        break;
    case 'topics':
        handleTopics($method);
        break;
    case 'posts':
        handlePosts($method);
        break;
    case 'stats':
        handleStats($method);
        break;
    default:
        echo json_encode([
            'success' => true,
            'message' => 'Forum API is working',
            'available_endpoints' => [
                'GET ?action=categories' => 'Get all categories',
                'GET ?action=topics' => 'Get topics',
                'GET ?action=posts' => 'Get posts',
                'GET ?action=stats' => 'Get forum statistics'
            ]
        ]);
        break;
}

function handleCategories($method) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    try {
        $pdo = getSimpleDatabase();
        if (!$pdo) {
            throw new Exception('Database connection failed');
        }
        
        $sql = "SELECT * FROM forum_categories WHERE is_active = 1 ORDER BY sort_order ASC, name ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $categories,
            'count' => count($categories)
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

function handleTopics($method) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    try {
        $pdo = getSimpleDatabase();
        if (!$pdo) {
            throw new Exception('Database connection failed');
        }
        
        $categoryId = $_GET['category_id'] ?? null;
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 20);
        $offset = ($page - 1) * $limit;
        
        $where = "WHERE t.status = 'active'";
        $params = [];
        
        if ($categoryId) {
            $where .= " AND t.category_id = ?";
            $params[] = $categoryId;
        }
        
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color
                FROM forum_topics t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                $where
                ORDER BY t.is_announcement DESC, t.is_featured DESC, t.created_at DESC
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $topics,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'has_more' => count($topics) === $limit
            ]
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

function handlePosts($method) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    try {
        $pdo = getSimpleDatabase();
        if (!$pdo) {
            throw new Exception('Database connection failed');
        }
        
        $topicId = $_GET['topic_id'] ?? null;
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 20);
        $offset = ($page - 1) * $limit;
        
        if (!$topicId) {
            http_response_code(400);
            echo json_encode(['error' => 'Topic ID required']);
            return;
        }
        
        $sql = "SELECT p.*, u.first_name, u.last_name
                FROM forum_posts p
                LEFT JOIN clients u ON p.author_id = u.id
                WHERE p.topic_id = ? AND p.is_approved = 1
                ORDER BY p.is_solution DESC, p.created_at ASC
                LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$topicId, $limit, $offset]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $posts,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'has_more' => count($posts) === $limit
            ]
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

function handleStats($method) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    try {
        $pdo = getSimpleDatabase();
        if (!$pdo) {
            throw new Exception('Database connection failed');
        }
        
        // Get basic statistics
        $sql = "SELECT 
                    COUNT(DISTINCT c.id) as total_categories,
                    COUNT(DISTINCT t.id) as total_topics,
                    COUNT(DISTINCT p.id) as total_posts
                FROM forum_categories c
                LEFT JOIN forum_topics t ON c.id = t.category_id AND t.status = 'active'
                LEFT JOIN forum_posts p ON t.id = p.topic_id AND p.is_approved = 1
                WHERE c.is_active = 1";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $stats
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
}
?>
