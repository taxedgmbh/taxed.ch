<?php
/**
 * Forum API Endpoints
 * Handles all forum-related API requests
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';
require_once '../models/ForumCategory.php';
require_once '../models/ForumTopic.php';
require_once '../models/ForumPost.php';
require_once '../middleware/auth.php';
require_once '../middleware/validation.php';

// Initialize database connection
$pdo = getDatabase();

// Initialize models
$forumCategory = new ForumCategory($pdo);
$forumTopic = new ForumTopic($pdo);
$forumPost = new ForumPost($pdo);

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['path'] ?? '';

// Route the request
switch ($path) {
    case 'categories':
        handleCategories($method, $forumCategory);
        break;
    case 'topics':
        handleTopics($method, $forumTopic);
        break;
    case 'posts':
        handlePosts($method, $forumPost);
        break;
    case 'search':
        handleSearch($method, $forumTopic, $forumPost);
        break;
    case 'stats':
        handleStats($method, $forumCategory, $forumTopic, $forumPost);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

/**
 * Handle categories endpoints
 */
function handleCategories($method, $forumCategory) {
    switch ($method) {
        case 'GET':
            $categories = $forumCategory->getAll();
            echo json_encode([
                'success' => true,
                'data' => $categories
            ]);
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
}

/**
 * Handle topics endpoints
 */
function handleTopics($method, $forumTopic) {
    switch ($method) {
        case 'GET':
            $categoryId = $_GET['category_id'] ?? null;
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 20);
            $search = $_GET['search'] ?? null;
            
            $filters = [];
            if ($categoryId) $filters['category_id'] = $categoryId;
            if ($search) $filters['search'] = $search;
            
            if ($search) {
                $topics = $forumTopic->search($search, $page, $limit);
            } else {
                $topics = $forumTopic->getAll($page, $limit, $filters);
            }
            
            echo json_encode([
                'success' => true,
                'data' => $topics,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'has_more' => count($topics) === $limit
                ]
            ]);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validate required fields
            if (empty($data['title']) || empty($data['content']) || empty($data['category_id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                return;
            }
            
            $topicId = $forumTopic->create($data);
            
            if ($topicId) {
                echo json_encode([
                    'success' => true,
                    'data' => ['id' => $topicId]
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create topic']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
}

/**
 * Handle posts endpoints
 */
function handlePosts($method, $forumPost) {
    switch ($method) {
        case 'GET':
            $topicId = $_GET['topic_id'] ?? null;
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 20);
            
            if ($topicId) {
                $posts = $forumPost->getByTopic($topicId, $page, $limit);
            } else {
                $posts = $forumPost->getAll($page, $limit);
            }
            
            echo json_encode([
                'success' => true,
                'data' => $posts,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'has_more' => count($posts) === $limit
                ]
            ]);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validate required fields
            if (empty($data['topic_id']) || empty($data['content'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                return;
            }
            
            $postId = $forumPost->create($data);
            
            if ($postId) {
                echo json_encode([
                    'success' => true,
                    'data' => ['id' => $postId]
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create post']);
            }
            break;
            
        case 'PUT':
            $postId = $_GET['id'] ?? null;
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!$postId) {
                http_response_code(400);
                echo json_encode(['error' => 'Post ID required']);
                return;
            }
            
            $result = $forumPost->update($postId, $data);
            
            if ($result) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update post']);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
}

/**
 * Handle search endpoints
 */
function handleSearch($method, $forumTopic, $forumPost) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    $query = $_GET['q'] ?? '';
    $type = $_GET['type'] ?? 'all';
    $page = (int)($_GET['page'] ?? 1);
    $limit = (int)($_GET['limit'] ?? 20);
    
    if (empty($query)) {
        http_response_code(400);
        echo json_encode(['error' => 'Search query required']);
        return;
    }
    
    $results = [];
    
    if ($type === 'all' || $type === 'topics') {
        $topics = $forumTopic->search($query, $page, $limit);
        $results['topics'] = $topics;
    }
    
    if ($type === 'all' || $type === 'posts') {
        $posts = $forumPost->search($query, $page, $limit);
        $results['posts'] = $posts;
    }
    
    echo json_encode([
        'success' => true,
        'data' => $results,
        'query' => $query,
        'type' => $type
    ]);
}

/**
 * Handle stats endpoints
 */
function handleStats($method, $forumCategory, $forumTopic, $forumPost) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    // Get forum statistics
    $categories = $forumCategory->getAll();
    $featuredTopics = $forumTopic->getFeatured(5);
    $expertAnswers = $forumPost->getExpertAnswers(5);
    $solutions = $forumPost->getSolutions(5);
    
    // Calculate totals
    $totalCategories = count($categories);
    $totalTopics = 0;
    $totalPosts = 0;
    
    foreach ($categories as $category) {
        $totalTopics += $category['topic_count'] ?? 0;
        $totalPosts += $category['post_count'] ?? 0;
    }
    
    $stats = [
        'total_categories' => $totalCategories,
        'total_topics' => $totalTopics,
        'total_posts' => $totalPosts,
        'featured_topics' => $featuredTopics,
        'expert_answers' => $expertAnswers,
        'solutions' => $solutions
    ];
    
    echo json_encode([
        'success' => true,
        'data' => $stats
    ]);
}
?>
