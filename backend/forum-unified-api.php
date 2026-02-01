<?php
header('Content-Type: application/json');

// CORS configuration - restrict to specific origins
$allowed_origins = ['https://taxed.ch', 'https://www.taxed.ch', 'http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simplified database connection for unified forum + Reddit API
$db_host = $_ENV['DB_HOST'] ?? 'localhost';
$db_port = $_ENV['DB_PORT'] ?? '3306';
$db_name = $_ENV['DB_NAME'] ?? 'u497646184_taxedgmbh';
$db_user = $_ENV['DB_USER'] ?? 'u497646184_taxedgmbh';
$db_pass = $_ENV['DB_PASS'] ?? '';

try {
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
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

// Helper function to get user ID from token (simplified)
function getUserId($pdo) {
    // In a real implementation, you'd validate JWT token here
    // For now, return a default user ID
    return 1;
}

// Helper function to calculate hot score (Reddit algorithm)
function calculateHotScore($score, $createdAt) {
    $epoch = strtotime('2005-12-08 00:00:00');
    $now = time();
    $age = $now - strtotime($createdAt);
    $order = log10(max(abs($score), 1));
    $sign = $score > 0 ? 1 : ($score < 0 ? -1 : 0);
    return round($order * $sign + ($age / 45000), 2);
}

switch ($action) {
    case 'categories':
        if ($method === 'GET') {
            try {
                $stmt = $pdo->query("
                    SELECT 
                        c.*,
                        COUNT(t.id) as topic_count,
                        COUNT(p.id) as post_count,
                        COALESCE(SUM(t.upvotes), 0) as total_upvotes,
                        COALESCE(SUM(t.score), 0) as total_score,
                        COALESCE(MAX(t.last_reply_at), MAX(t.created_at)) as last_activity
                    FROM forum_categories c
                    LEFT JOIN forum_topics t ON c.id = t.category_id AND t.status = 'active'
                    LEFT JOIN forum_posts p ON t.id = p.topic_id AND p.is_approved = TRUE
                    WHERE c.is_active = TRUE
                    GROUP BY c.id
                    ORDER BY c.sort_order ASC
                ");
                $categories = $stmt->fetchAll();
                echo json_encode(['success' => true, 'data' => $categories]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Failed to fetch categories: ' . $e->getMessage()]);
            }
        }
        break;
        
    case 'topics':
        if ($method === 'GET') {
            $sort = $_GET['sort'] ?? 'hot';
            $category = $_GET['category'] ?? '';
            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 20);
            $offset = ($page - 1) * $limit;
            
            $whereClause = "WHERE t.status = 'active'";
            $params = [];
            
            if ($category) {
                $whereClause .= " AND c.slug = :category";
                $params[':category'] = $category;
            }
            
            $orderBy = "ORDER BY t.created_at DESC";
            if ($sort === 'hot') {
                $orderBy = "ORDER BY t.hot_score DESC, t.created_at DESC";
            } elseif ($sort === 'top') {
                $orderBy = "ORDER BY t.score DESC, t.created_at DESC";
            } elseif ($sort === 'new') {
                $orderBy = "ORDER BY t.created_at DESC";
            } elseif ($sort === 'controversial') {
                $orderBy = "ORDER BY (t.upvotes + t.downvotes) DESC, t.score ASC";
            }
            
            $sql = "
                SELECT 
                    t.id,
                    t.title,
                    t.slug,
                    t.content,
                    t.upvotes,
                    t.downvotes,
                    t.score,
                    t.views,
                    t.replies_count,
                    t.created_at,
                    t.last_reply_at,
                    t.status,
                    t.is_featured,
                    t.is_announcement,
                    t.is_solved,
                    c.name as category_name,
                    c.slug as category_slug,
                    c.color as category_color,
                    u.first_name as author_name,
                    u.last_name as author_lastname,
                    uk.karma_points as author_karma,
                    CASE 
                        WHEN t.created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN 'hot'
                        WHEN t.created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 'trending'
                        ELSE 'normal'
                    END as post_type
                FROM forum_topics t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                LEFT JOIN user_karma uk ON u.id = uk.user_id
                {$whereClause}
                {$orderBy}
                LIMIT :limit OFFSET :offset
            ";
            
            $stmt = $pdo->prepare($sql);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $topics = $stmt->fetchAll();
            
            // Add user vote status (simplified)
            $userId = getUserId($pdo);
            foreach ($topics as &$topic) {
                $voteStmt = $pdo->prepare("
                    SELECT vote_type FROM forum_votes 
                    WHERE user_id = ? AND content_type = 'topic' AND content_id = ?
                ");
                $voteStmt->execute([$userId, $topic['id']]);
                $vote = $voteStmt->fetch();
                $topic['user_vote'] = $vote ? $vote['vote_type'] : null;
            }
            
            echo json_encode(['success' => true, 'data' => $topics]);
        }
        break;
        
    case 'posts':
        if ($method === 'GET') {
            $topicId = (int)($_GET['topic_id'] ?? 0);
            $depth = (int)($_GET['depth'] ?? 0);
            $limit = (int)($_GET['limit'] ?? 50);
            
            $sql = "
                SELECT 
                    p.id,
                    p.content,
                    p.upvotes,
                    p.downvotes,
                    p.score,
                    p.created_at,
                    p.is_solution,
                    p.is_expert_answer,
                    p.parent_id,
                    u.first_name as author_name,
                    u.last_name as author_lastname,
                    uk.karma_points as author_karma
                FROM forum_posts p
                LEFT JOIN clients u ON p.author_id = u.id
                LEFT JOIN user_karma uk ON u.id = uk.user_id
                WHERE p.topic_id = ? AND p.parent_id " . ($depth === 0 ? "IS NULL" : "= ?") . "
                ORDER BY p.score DESC, p.created_at ASC
                LIMIT ?
            ";
            
            $params = [$topicId];
            if ($depth > 0) {
                $params[] = $depth;
            }
            $params[] = $limit;
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $posts = $stmt->fetchAll();
            
            // Add user vote status
            $userId = getUserId($pdo);
            foreach ($posts as &$post) {
                $voteStmt = $pdo->prepare("
                    SELECT vote_type FROM forum_votes 
                    WHERE user_id = ? AND content_type = 'post' AND content_id = ?
                ");
                $voteStmt->execute([$userId, $post['id']]);
                $vote = $voteStmt->fetch();
                $post['user_vote'] = $vote ? $vote['vote_type'] : null;
            }
            
            echo json_encode(['success' => true, 'data' => $posts]);
        }
        break;
        
    case 'vote':
        if ($method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $contentType = $input['content_type'] ?? '';
            $contentId = (int)($input['content_id'] ?? 0);
            $voteType = $input['vote_type'] ?? '';
            $userId = getUserId($pdo);
            
            if (!in_array($voteType, ['upvote', 'downvote']) || !in_array($contentType, ['topic', 'post'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid vote type or content type']);
                break;
            }
            
            try {
                $pdo->beginTransaction();
                
                // Remove existing vote
                $deleteStmt = $pdo->prepare("
                    DELETE FROM forum_votes 
                    WHERE user_id = ? AND content_type = ? AND content_id = ?
                ");
                $deleteStmt->execute([$userId, $contentType, $contentId]);
                
                // Add new vote
                $insertStmt = $pdo->prepare("
                    INSERT INTO forum_votes (user_id, content_type, content_id, vote_type)
                    VALUES (?, ?, ?, ?)
                ");
                $insertStmt->execute([$userId, $contentType, $contentId, $voteType]);
                
                // Update content scores
                $table = $contentType === 'topic' ? 'forum_topics' : 'forum_posts';
                $updateStmt = $pdo->prepare("
                    UPDATE {$table} SET 
                        upvotes = (SELECT COUNT(*) FROM forum_votes WHERE content_type = ? AND content_id = ? AND vote_type = 'upvote'),
                        downvotes = (SELECT COUNT(*) FROM forum_votes WHERE content_type = ? AND content_id = ? AND vote_type = 'downvote'),
                        score = (SELECT COUNT(*) FROM forum_votes WHERE content_type = ? AND content_id = ? AND vote_type = 'upvote') - 
                                (SELECT COUNT(*) FROM forum_votes WHERE content_type = ? AND content_id = ? AND vote_type = 'downvote')
                    WHERE id = ?
                ");
                $updateStmt->execute([
                    $contentType, $contentId, $contentType, $contentId,
                    $contentType, $contentId, $contentType, $contentId,
                    $contentId
                ]);
                
                // Update hot score for topics
                if ($contentType === 'topic') {
                    $hotStmt = $pdo->prepare("
                        UPDATE forum_topics 
                        SET hot_score = ? 
                        WHERE id = ?
                    ");
                    $topicStmt = $pdo->prepare("SELECT score, created_at FROM forum_topics WHERE id = ?");
                    $topicStmt->execute([$contentId]);
                    $topic = $topicStmt->fetch();
                    $hotScore = calculateHotScore($topic['score'], $topic['created_at']);
                    $hotStmt->execute([$hotScore, $contentId]);
                }
                
                $pdo->commit();
                echo json_encode(['success' => true, 'message' => 'Vote recorded']);
                
            } catch (Exception $e) {
                $pdo->rollBack();
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Failed to record vote: ' . $e->getMessage()]);
            }
        }
        break;
        
    case 'user-profile':
        if ($method === 'GET') {
            $userId = (int)($_GET['user_id'] ?? getUserId($pdo));
            
            // Get user basic info
            $userStmt = $pdo->prepare("
                SELECT 
                    u.id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.created_at,
                    uk.karma_points,
                    uk.post_karma,
                    uk.comment_karma
                FROM clients u
                LEFT JOIN user_karma uk ON u.id = uk.user_id
                WHERE u.id = ?
            ");
            $userStmt->execute([$userId]);
            $user = $userStmt->fetch();
            
            if (!$user) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'User not found']);
                break;
            }
            
            // Get user stats
            $statsStmt = $pdo->prepare("
                SELECT 
                    COUNT(DISTINCT t.id) as posts_created,
                    COUNT(DISTINCT p.id) as comments_created,
                    COUNT(DISTINCT CASE WHEN p.is_solution = 1 THEN p.id END) as solutions_marked,
                    COUNT(DISTINCT v.id) as votes_received
                FROM clients u
                LEFT JOIN forum_topics t ON u.id = t.author_id
                LEFT JOIN forum_posts p ON u.id = p.author_id
                LEFT JOIN forum_votes v ON (v.content_type = 'post' AND v.content_id = p.id) OR (v.content_type = 'topic' AND v.content_id = t.id)
                WHERE u.id = ?
            ");
            $statsStmt->execute([$userId]);
            $stats = $statsStmt->fetch();
            
            // Get user rank
            $rankStmt = $pdo->prepare("
                SELECT COUNT(*) + 1 as rank
                FROM user_karma uk2
                WHERE uk2.karma_points > (SELECT karma_points FROM user_karma WHERE user_id = ?)
            ");
            $rankStmt->execute([$userId]);
            $rank = $rankStmt->fetchColumn();
            
            $user['stats'] = $stats;
            $user['stats']['rank'] = $rank;
            
            echo json_encode(['success' => true, 'data' => $user]);
        }
        break;
        
    case 'trending':
        if ($method === 'GET') {
            $limit = (int)($_GET['limit'] ?? 10);
            
            $sql = "
                SELECT 
                    t.id,
                    t.title,
                    t.slug,
                    t.score,
                    t.hot_score,
                    t.created_at,
                    c.name as category_name,
                    c.slug as category_slug,
                    c.color as category_color,
                    u.first_name as author_name,
                    u.last_name as author_lastname
                FROM forum_topics t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                WHERE t.status = 'active' AND t.created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
                ORDER BY t.hot_score DESC
                LIMIT ?
            ";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$limit]);
            $trending = $stmt->fetchAll();
            
            echo json_encode(['success' => true, 'data' => $trending]);
        }
        break;
        
    case 'leaderboard':
        if ($method === 'GET') {
            $limit = (int)($_GET['limit'] ?? 20);
            
            $sql = "
                SELECT 
                    u.id,
                    u.first_name,
                    u.last_name,
                    uk.karma_points,
                    uk.post_karma,
                    uk.comment_karma,
                    COUNT(DISTINCT t.id) as topics_created,
                    COUNT(DISTINCT p.id) as posts_created,
                    RANK() OVER (ORDER BY uk.karma_points DESC) as rank
                FROM clients u
                LEFT JOIN user_karma uk ON u.id = uk.user_id
                LEFT JOIN forum_topics t ON u.id = t.author_id
                LEFT JOIN forum_posts p ON u.id = p.author_id
                WHERE uk.karma_points > 0
                GROUP BY u.id, u.first_name, u.last_name, uk.karma_points, uk.post_karma, uk.comment_karma
                ORDER BY uk.karma_points DESC
                LIMIT ?
            ";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$limit]);
            $leaderboard = $stmt->fetchAll();
            
            echo json_encode(['success' => true, 'data' => $leaderboard]);
        }
        break;
        
    case 'stats':
        if ($method === 'GET') {
            try {
                $totalCategories = $pdo->query("SELECT COUNT(*) FROM forum_categories WHERE is_active = TRUE")->fetchColumn();
                $totalTopics = $pdo->query("SELECT COUNT(*) FROM forum_topics WHERE status = 'active'")->fetchColumn();
                $totalPosts = $pdo->query("SELECT COUNT(*) FROM forum_posts WHERE is_approved = TRUE")->fetchColumn();
                $totalUsers = $pdo->query("SELECT COUNT(*) FROM clients")->fetchColumn();
                $totalVotes = $pdo->query("SELECT COUNT(*) FROM forum_votes")->fetchColumn();
                
                echo json_encode(['success' => true, 'data' => [
                    'total_categories' => (int)$totalCategories,
                    'total_topics' => (int)$totalTopics,
                    'total_posts' => (int)$totalPosts,
                    'total_users' => (int)$totalUsers,
                    'total_votes' => (int)$totalVotes,
                ]]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Failed to fetch stats: ' . $e->getMessage()]);
            }
        }
        break;
        
    default:
        echo json_encode([
            'success' => false, 
            'message' => 'Invalid API action. Available actions: categories, topics, posts, vote, user-profile, trending, leaderboard, stats'
        ]);
        break;
}
?>
