<?php
/**
 * Authentication API endpoints
 * Handles user login, registration, and session management
 */

header('Content-Type: application/json');

// Apply security headers
require_once __DIR__ . '/../middleware/security.php';
SecurityMiddleware::applyAll();

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

require_once '../config/database.php';
require_once '../utils/helpers.php';
require_once '../utils/security.php';

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api/auth', '', $path);

try {
    switch ($method) {
        case 'POST':
            if ($path === '/login') {
                handleLogin();
            } elseif ($path === '/register') {
                handleRegister();
            } elseif ($path === '/logout') {
                handleLogout();
            } else {
                throw new Exception('Invalid endpoint');
            }
            break;
            
        case 'GET':
            if ($path === '/me') {
                handleGetUser();
            } else {
                throw new Exception('Invalid endpoint');
            }
            break;
            
        default:
            throw new Exception('Method not allowed');
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

function handleLogin() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['email']) || !isset($input['password'])) {
        throw new Exception('Email and password are required');
    }
    
    $email = sanitizeInput($input['email']);
    $password = $input['password'];
    
    if (!isValidEmail($email)) {
        throw new Exception('Invalid email format');
    }
    
    // Get user from database
    $stmt = $GLOBALS['pdo']->prepare("
        SELECT id, email, name, password_hash, role, is_active, last_login_at 
        FROM users 
        WHERE email = ? AND is_active = 1
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user || !password_verify($password, $user['password_hash'])) {
        throw new Exception('Invalid credentials');
    }
    
    // Update last login
    $updateStmt = $GLOBALS['pdo']->prepare("
        UPDATE users 
        SET last_login_at = NOW() 
        WHERE id = ?
    ");
    $updateStmt->execute([$user['id']]);
    
    // Generate session token
    $token = generateSecureToken();
    
    // Store session in database
    $sessionStmt = $GLOBALS['pdo']->prepare("
        INSERT INTO user_sessions (user_id, token, expires_at, created_at) 
        VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR), NOW())
    ");
    $sessionStmt->execute([$user['id'], $token]);
    
    // Log successful login
    logActivity($user['id'], 'login', 'User logged in successfully');
    
    echo json_encode([
        'success' => true,
        'data' => [
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role']
            ],
            'token' => $token
        ]
    ]);
}

function handleRegister() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $required = ['email', 'password', 'name'];
    foreach ($required as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            throw new Exception("Field '{$field}' is required");
        }
    }
    
    $email = sanitizeInput($input['email']);
    $password = $input['password'];
    $name = sanitizeInput($input['name']);
    
    if (!isValidEmail($email)) {
        throw new Exception('Invalid email format');
    }
    
    if (strlen($password) < 8) {
        throw new Exception('Password must be at least 8 characters');
    }
    
    // Check if user already exists
    $checkStmt = $GLOBALS['pdo']->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->execute([$email]);
    if ($checkStmt->fetch()) {
        throw new Exception('User already exists');
    }
    
    // Hash password
    $passwordHash = password_hash($password, PASSWORD_ARGON2ID);
    
    // Create user
    $stmt = $GLOBALS['pdo']->prepare("
        INSERT INTO users (email, name, password_hash, role, is_active, created_at) 
        VALUES (?, ?, ?, 'client', 1, NOW())
    ");
    $stmt->execute([$email, $name, $passwordHash]);
    $userId = $GLOBALS['pdo']->lastInsertId();
    
    // Log registration
    logActivity($userId, 'register', 'User registered successfully');
    
    echo json_encode([
        'success' => true,
        'data' => [
            'user' => [
                'id' => $userId,
                'email' => $email,
                'name' => $name,
                'role' => 'client'
            ]
        ]
    ]);
}

function handleLogout() {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if ($token) {
        // Remove session from database
        $stmt = $GLOBALS['pdo']->prepare("DELETE FROM user_sessions WHERE token = ?");
        $stmt->execute([$token]);
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
}

function handleGetUser() {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if (!$token) {
        throw new Exception('No authentication token provided');
    }
    
    // Verify token and get user
    $stmt = $GLOBALS['pdo']->prepare("
        SELECT u.id, u.email, u.name, u.role, u.last_login_at
        FROM users u
        JOIN user_sessions s ON u.id = s.user_id
        WHERE s.token = ? AND s.expires_at > NOW() AND u.is_active = 1
    ");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        throw new Exception('Invalid or expired token');
    }
    
    echo json_encode([
        'success' => true,
        'data' => [
            'user' => $user
        ]
    ]);
}
?>
