<?php
/**
 * Client Portal Authentication System
 * Taxed.ch - Swiss Tax Consulting
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$db_config = [
    'host' => 'localhost',
    'dbname' => 'u497646184_taxedgmbh',
    'username' => 'u497646184_taxedgmbh',
    'password' => 'Hauskauf629!',
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

// Get request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Helper functions
function generateSessionToken() {
    return bin2hex(random_bytes(32));
}

function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function logAudit($pdo, $userId, $userType, $action, $tableName = null, $recordId = null, $oldValues = null, $newValues = null) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO audit_log (user_id, user_type, action, table_name, record_id, old_values, new_values, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $userId,
            $userType,
            $action,
            $tableName,
            $recordId,
            $oldValues ? json_encode($oldValues) : null,
            $newValues ? json_encode($newValues) : null,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
    } catch (Exception $e) {
        // Log error but don't fail the main operation
        error_log("Audit log error: " . $e->getMessage());
    }
}

// Route requests
switch ($action) {
    case 'register':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if (empty($input['email']) || empty($input['password']) || empty($input['firstName']) || empty($input['lastName'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            break;
        }
        
        $email = sanitizeInput($input['email']);
        $password = $input['password'];
        $firstName = sanitizeInput($input['firstName']);
        $lastName = sanitizeInput($input['lastName']);
        $company = isset($input['company']) ? sanitizeInput($input['company']) : null;
        $phone = isset($input['phone']) ? sanitizeInput($input['phone']) : null;
        
        // Validate email
        if (!validateEmail($email)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email format']);
            break;
        }
        
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM clients WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already registered']);
            break;
        }
        
        // Create new client
        try {
            $stmt = $pdo->prepare("
                INSERT INTO clients (email, password_hash, first_name, last_name, company, phone, status)
                VALUES (?, ?, ?, ?, ?, ?, 'pending')
            ");
            $stmt->execute([
                $email,
                hashPassword($password),
                $firstName,
                $lastName,
                $company,
                $phone
            ]);
            
            $clientId = $pdo->lastInsertId();
            
            // Log audit
            logAudit($pdo, $clientId, 'client', 'register', 'clients', $clientId, null, [
                'email' => $email,
                'first_name' => $firstName,
                'last_name' => $lastName
            ]);
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Registration successful. Your account is pending approval.',
                'clientId' => $clientId
            ]);
            
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Registration failed']);
        }
        break;
        
    case 'login':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['email']) || empty($input['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password required']);
            break;
        }
        
        $email = sanitizeInput($input['email']);
        $password = $input['password'];
        
        // Get client data
        $stmt = $pdo->prepare("
            SELECT id, email, password_hash, first_name, last_name, company, status, last_login
            FROM clients WHERE email = ?
        ");
        $stmt->execute([$email]);
        $client = $stmt->fetch();
        
        if (!$client || !verifyPassword($password, $client['password_hash'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            break;
        }
        
        if ($client['status'] !== 'active') {
            http_response_code(403);
            echo json_encode(['error' => 'Account not active. Please contact support.']);
            break;
        }
        
        // Create session
        $sessionToken = generateSessionToken();
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
        
        $stmt = $pdo->prepare("
            INSERT INTO client_sessions (client_id, session_token, expires_at, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $client['id'],
            $sessionToken,
            $expiresAt,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
        
        // Update last login
        $stmt = $pdo->prepare("UPDATE clients SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$client['id']]);
        
        // Log audit
        logAudit($pdo, $client['id'], 'client', 'login', 'clients', $client['id']);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'sessionToken' => $sessionToken,
            'expiresAt' => $expiresAt,
            'client' => [
                'id' => $client['id'],
                'email' => $client['email'],
                'firstName' => $client['first_name'],
                'lastName' => $client['last_name'],
                'company' => $client['company']
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
            SELECT c.id, c.email, c.first_name, c.last_name, c.company, cs.expires_at
            FROM clients c
            JOIN client_sessions cs ON c.id = cs.client_id
            WHERE cs.session_token = ? AND cs.expires_at > NOW() AND c.status = 'active'
        ");
        $stmt->execute([$sessionToken]);
        $client = $stmt->fetch();
        
        if (!$client) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired session']);
            break;
        }
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'client' => [
                'id' => $client['id'],
                'email' => $client['email'],
                'firstName' => $client['first_name'],
                'lastName' => $client['last_name'],
                'company' => $client['company']
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
        
        // Get client ID for audit log
        $stmt = $pdo->prepare("SELECT client_id FROM client_sessions WHERE session_token = ?");
        $stmt->execute([$sessionToken]);
        $session = $stmt->fetch();
        
        // Delete session
        $stmt = $pdo->prepare("DELETE FROM client_sessions WHERE session_token = ?");
        $stmt->execute([$sessionToken]);
        
        if ($session) {
            logAudit($pdo, $session['client_id'], 'client', 'logout', 'client_sessions');
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
        if ($bypassCode !== 'TAXED_CLIENT_2024_BYPASS') {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid bypass code']);
            break;
        }
        
        // Create temporary client session
        $sessionToken = generateSessionToken();
        $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour')); // 1 hour
        
        // Get or create bypass client user
        $stmt = $pdo->prepare("SELECT id FROM clients WHERE email = 'bypass@taxed.ch'");
        $stmt->execute();
        $bypassClient = $stmt->fetch();
        
        if (!$bypassClient) {
            // Create bypass client user
            $stmt = $pdo->prepare("
                INSERT INTO clients (email, password_hash, first_name, last_name, company, status)
                VALUES ('bypass@taxed.ch', ?, 'Bypass', 'Client', 'Taxed GmbH', 'active')
            ");
            $stmt->execute([hashPassword('bypass_secure_2024')]);
            $clientId = $pdo->lastInsertId();
        } else {
            $clientId = $bypassClient['id'];
        }
        
        // Create session
        $stmt = $pdo->prepare("
            INSERT INTO client_sessions (client_id, session_token, expires_at, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $clientId,
            $sessionToken,
            $expiresAt,
            $_SERVER['REMOTE_ADDR'] ?? null,
            $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
        
        logAudit($pdo, $clientId, 'client', 'bypass_login', 'clients', $clientId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'sessionToken' => $sessionToken,
            'expiresAt' => $expiresAt,
            'client' => [
                'id' => $clientId,
                'email' => 'bypass@taxed.ch',
                'firstName' => 'Bypass',
                'lastName' => 'Client',
                'company' => 'Taxed GmbH'
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
