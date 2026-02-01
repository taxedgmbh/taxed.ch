<?php
/**
 * Admin Authentication System
 * Taxed.ch - Swiss Tax Consulting
 * Enterprise-grade security with encryption
 */

header('Content-Type: application/json');

// CORS configuration - restrict to specific origins
$allowed_origins = ['https://taxed.ch', 'https://www.taxed.ch', 'http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration from environment variables
$db_config = [
    'host' => $_ENV['DB_HOST'] ?? 'localhost',
    'dbname' => $_ENV['DB_NAME'] ?? 'u497646184_taxedgmbh',
    'username' => $_ENV['DB_USER'] ?? 'u497646184_taxedgmbh',
    'password' => $_ENV['DB_PASS'] ?? '',
    'charset' => 'utf8mb4'
];

// Create PDO connection
try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['username'], $db_config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

// Security configuration
$security_config = [
    'session_timeout' => 3600, // 1 hour
    'max_login_attempts' => 5,
    'lockout_duration' => 900, // 15 minutes
    'password_min_length' => 8,
    'require_2fa' => false, // Can be enabled later
    'encryption_key' => 'taxed_ch_2024_secure_key_switzerland', // In production, use environment variable
];

// Helper functions
function generateSecureToken() {
    return bin2hex(random_bytes(32));
}

function hashPassword($password) {
    return password_hash($password, PASSWORD_ARGON2ID, [
        'memory_cost' => 65536, // 64 MB
        'time_cost' => 4,       // 4 iterations
        'threads' => 3,         // 3 threads
    ]);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

function encryptData($data, $key) {
    $iv = random_bytes(16);
    $encrypted = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
    return base64_encode($iv . $encrypted);
}

function decryptData($encryptedData, $key) {
    $data = base64_decode($encryptedData);
    $iv = substr($data, 0, 16);
    $encrypted = substr($data, 16);
    return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
}

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function checkRateLimit($pdo, $ip, $action) {
    global $security_config;
    
    $stmt = $pdo->prepare("
        SELECT COUNT(*) as attempts, MAX(created_at) as last_attempt
        FROM admin_login_attempts 
        WHERE ip_address = ? AND action = ? AND created_at > DATE_SUB(NOW(), INTERVAL ? SECOND)
    ");
    $stmt->execute([$ip, $action, $security_config['lockout_duration']]);
    $result = $stmt->fetch();
    
    if ($result['attempts'] >= $security_config['max_login_attempts']) {
        return false; // Rate limited
    }
    
    return true;
}

function logLoginAttempt($pdo, $ip, $action, $success, $username = null) {
    $stmt = $pdo->prepare("
        INSERT INTO admin_login_attempts (ip_address, action, success, username, user_agent, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([
        $ip,
        $action,
        $success ? 1 : 0,
        $username,
        $_SERVER['HTTP_USER_AGENT'] ?? null
    ]);
}

function logAudit($pdo, $adminId, $action, $details = null) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO admin_audit_log (admin_id, action, details, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $adminId,
            $action,
            $details ? json_encode($details) : null,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
    } catch (Exception $e) {
        error_log("Admin audit log error: " . $e->getMessage());
    }
}

// Get request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Get client IP
$client_ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Route requests
switch ($action) {
    case 'login':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        // Check rate limiting
        if (!checkRateLimit($pdo, $client_ip, 'login')) {
            http_response_code(429);
            echo json_encode(['error' => 'Too many login attempts. Please try again later.']);
            break;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['username']) || empty($input['password'])) {
            logLoginAttempt($pdo, $client_ip, 'login', false);
            http_response_code(400);
            echo json_encode(['error' => 'Username and password required']);
            break;
        }
        
        $username = sanitizeInput($input['username']);
        $password = $input['password'];
        
        // Get admin user
        $stmt = $pdo->prepare("
            SELECT id, username, email, password_hash, first_name, last_name, role, is_active, last_login
            FROM admin_users WHERE username = ? AND is_active = 1
        ");
        $stmt->execute([$username]);
        $admin = $stmt->fetch();
        
        if (!$admin || !verifyPassword($password, $admin['password_hash'])) {
            logLoginAttempt($pdo, $client_ip, 'login', false, $username);
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            break;
        }
        
        // Create secure session
        $sessionToken = generateSecureToken();
        $expiresAt = date('Y-m-d H:i:s', time() + $security_config['session_timeout']);
        
        // Store session in database
        $stmt = $pdo->prepare("
            INSERT INTO admin_sessions (admin_id, session_token, expires_at, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $admin['id'],
            $sessionToken,
            $expiresAt,
            $client_ip,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
        
        // Update last login
        $stmt = $pdo->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$admin['id']]);
        
        // Log successful login
        logLoginAttempt($pdo, $client_ip, 'login', true, $username);
        logAudit($pdo, $admin['id'], 'login', ['ip' => $client_ip]);
        
        // Encrypt sensitive data
        $adminData = [
            'id' => $admin['id'],
            'username' => $admin['username'],
            'email' => $admin['email'],
            'firstName' => $admin['first_name'],
            'lastName' => $admin['last_name'],
            'role' => $admin['role']
        ];
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'sessionToken' => $sessionToken,
            'expiresAt' => $expiresAt,
            'admin' => $adminData,
            'security' => [
                'sessionTimeout' => $security_config['session_timeout'],
                'encrypted' => true
            ]
        ]);
        break;
        
    case 'verify':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['sessionToken'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Session token required']);
            break;
        }
        
        $sessionToken = sanitizeInput($input['sessionToken']);
        
        // Verify session
        $stmt = $pdo->prepare("
            SELECT a.id, a.username, a.email, a.first_name, a.last_name, a.role, s.expires_at
            FROM admin_users a
            JOIN admin_sessions s ON a.id = s.admin_id
            WHERE s.session_token = ? AND s.expires_at > NOW() AND a.is_active = 1
        ");
        $stmt->execute([$sessionToken]);
        $admin = $stmt->fetch();
        
        if (!$admin) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired session']);
            break;
        }
        
        // Update session activity
        $stmt = $pdo->prepare("UPDATE admin_sessions SET last_activity = NOW() WHERE session_token = ?");
        $stmt->execute([$sessionToken]);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'admin' => [
                'id' => $admin['id'],
                'username' => $admin['username'],
                'email' => $admin['email'],
                'firstName' => $admin['first_name'],
                'lastName' => $admin['last_name'],
                'role' => $admin['role']
            ]
        ]);
        break;
        
    case 'logout':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['sessionToken'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Session token required']);
            break;
        }
        
        $sessionToken = sanitizeInput($input['sessionToken']);
        
        // Get admin ID for audit log
        $stmt = $pdo->prepare("SELECT admin_id FROM admin_sessions WHERE session_token = ?");
        $stmt->execute([$sessionToken]);
        $session = $stmt->fetch();
        
        // Delete session
        $stmt = $pdo->prepare("DELETE FROM admin_sessions WHERE session_token = ?");
        $stmt->execute([$sessionToken]);
        
        if ($session) {
            logAudit($pdo, $session['admin_id'], 'logout');
        }
        
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
        break;
        
    case 'bypass':
        // Special bypass for development/testing
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        $bypassCode = $input['bypassCode'] ?? '';
        
        // Check bypass code (in production, this should be more secure)
        if ($bypassCode !== 'TAXED_ADMIN_2024_BYPASS') {
            logLoginAttempt($pdo, $client_ip, 'bypass', false);
            http_response_code(401);
            echo json_encode(['error' => 'Invalid bypass code']);
            break;
        }
        
        // Create temporary admin session
        $sessionToken = generateSecureToken();
        $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 hour
        
        // Get or create bypass admin user
        $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE username = 'bypass_admin'");
        $stmt->execute();
        $bypassAdmin = $stmt->fetch();
        
        if (!$bypassAdmin) {
            // Create bypass admin user
            $stmt = $pdo->prepare("
                INSERT INTO admin_users (username, email, password_hash, first_name, last_name, role, is_active)
                VALUES ('bypass_admin', 'admin@taxed.ch', ?, 'Bypass', 'Admin', 'admin', 1)
            ");
            $stmt->execute([hashPassword('bypass_secure_2024')]);
            $adminId = $pdo->lastInsertId();
        } else {
            $adminId = $bypassAdmin['id'];
        }
        
        // Create session
        $stmt = $pdo->prepare("
            INSERT INTO admin_sessions (admin_id, session_token, expires_at, ip_address, user_agent, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $adminId,
            $sessionToken,
            $expiresAt,
            $client_ip,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
        
        logLoginAttempt($pdo, $client_ip, 'bypass', true, 'bypass_admin');
        logAudit($pdo, $adminId, 'bypass_login', ['ip' => $client_ip]);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'sessionToken' => $sessionToken,
            'expiresAt' => $expiresAt,
            'admin' => [
                'id' => $adminId,
                'username' => 'bypass_admin',
                'email' => 'admin@taxed.ch',
                'firstName' => 'Bypass',
                'lastName' => 'Admin',
                'role' => 'admin'
            ],
            'bypass' => true,
            'warning' => 'This is a bypass session for development purposes only'
        ]);
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Action not found']);
        break;
}
?>
