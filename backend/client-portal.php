<?php
/**
 * Client Portal API
 * Taxed.ch - Swiss Tax Consulting
 */

header('Content-Type: application/json');

// CORS configuration - restrict to specific origins
$allowed_origins = ['https://taxed.ch', 'https://www.taxed.ch', 'http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
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

// Helper functions
function getClientFromSession($pdo, $sessionToken) {
    $stmt = $pdo->prepare("
        SELECT c.id, c.email, c.first_name, c.last_name, c.company, cs.expires_at
        FROM clients c
        JOIN client_sessions cs ON c.id = cs.client_id
        WHERE cs.session_token = ? AND cs.expires_at > NOW() AND c.status = 'active'
    ");
    $stmt->execute([$sessionToken]);
    return $stmt->fetch();
}

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
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
        error_log("Audit log error: " . $e->getMessage());
    }
}

// Get request method and action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Get session token from Authorization header or request body
$sessionToken = null;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $sessionToken = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
} else {
    $input = json_decode(file_get_contents('php://input'), true);
    $sessionToken = $input['sessionToken'] ?? null;
}

// Verify session for protected routes
$client = null;
if (in_array($action, ['dashboard', 'cases', 'documents', 'messages', 'appointments', 'profile', 'upload'])) {
    if (!$sessionToken) {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication required']);
        exit();
    }
    
    $client = getClientFromSession($pdo, $sessionToken);
    if (!$client) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired session']);
        exit();
    }
}

// Route requests
switch ($action) {
    case 'dashboard':
        if ($method !== 'GET') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        // Get dashboard data
        $clientId = $client['id'];
        
        // Get case count by status
        $stmt = $pdo->prepare("
            SELECT status, COUNT(*) as count
            FROM tax_cases
            WHERE client_id = ?
            GROUP BY status
        ");
        $stmt->execute([$clientId]);
        $caseStats = $stmt->fetchAll();
        
        // Get recent cases
        $stmt = $pdo->prepare("
            SELECT id, case_number, tax_year, case_type, status, priority, created_at, due_date
            FROM tax_cases
            WHERE client_id = ?
            ORDER BY created_at DESC
            LIMIT 5
        ");
        $stmt->execute([$clientId]);
        $recentCases = $stmt->fetchAll();
        
        // Get unread messages count
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as unread_count
            FROM messages
            WHERE client_id = ? AND sender_type = 'admin' AND is_read = FALSE
        ");
        $stmt->execute([$clientId]);
        $unreadMessages = $stmt->fetch()['unread_count'];
        
        // Get upcoming appointments
        $stmt = $pdo->prepare("
            SELECT id, title, appointment_date, meeting_type, status
            FROM appointments
            WHERE client_id = ? AND appointment_date > NOW() AND status IN ('scheduled', 'confirmed')
            ORDER BY appointment_date ASC
            LIMIT 3
        ");
        $stmt->execute([$clientId]);
        $upcomingAppointments = $stmt->fetchAll();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'caseStats' => $caseStats,
                'recentCases' => $recentCases,
                'unreadMessages' => $unreadMessages,
                'upcomingAppointments' => $upcomingAppointments
            ]
        ]);
        break;
        
    case 'cases':
        if ($method !== 'GET') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $clientId = $client['id'];
        
        $stmt = $pdo->prepare("
            SELECT id, case_number, tax_year, case_type, status, priority, description, 
                   assigned_to, created_at, updated_at, due_date, filed_date
            FROM tax_cases
            WHERE client_id = ?
            ORDER BY created_at DESC
        ");
        $stmt->execute([$clientId]);
        $cases = $stmt->fetchAll();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $cases
        ]);
        break;
        
    case 'documents':
        if ($method !== 'GET') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $clientId = $client['id'];
        $caseId = $_GET['caseId'] ?? null;
        
        $sql = "
            SELECT d.id, d.filename, d.original_filename, d.file_size, d.mime_type, 
                   d.document_type, d.description, d.uploaded_by, d.created_at,
                   tc.case_number, tc.tax_year
            FROM documents d
            LEFT JOIN tax_cases tc ON d.case_id = tc.id
            WHERE d.client_id = ?
        ";
        $params = [$clientId];
        
        if ($caseId) {
            $sql .= " AND d.case_id = ?";
            $params[] = $caseId;
        }
        
        $sql .= " ORDER BY d.created_at DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $documents = $stmt->fetchAll();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $documents
        ]);
        break;
        
    case 'messages':
        if ($method === 'GET') {
            $clientId = $client['id'];
            $caseId = $_GET['caseId'] ?? null;
            
            $sql = "
                SELECT m.id, m.subject, m.message, m.sender_type, m.is_read, m.created_at,
                       tc.case_number, tc.tax_year
                FROM messages m
                LEFT JOIN tax_cases tc ON m.case_id = tc.id
                WHERE m.client_id = ?
            ";
            $params = [$clientId];
            
            if ($caseId) {
                $sql .= " AND m.case_id = ?";
                $params[] = $caseId;
            }
            
            $sql .= " ORDER BY m.created_at DESC";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $messages = $stmt->fetchAll();
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $messages
            ]);
            
        } elseif ($method === 'POST') {
            // Send message
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (empty($input['subject']) || empty($input['message'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Subject and message required']);
                break;
            }
            
            $clientId = $client['id'];
            $caseId = $input['caseId'] ?? null;
            $subject = sanitizeInput($input['subject']);
            $message = sanitizeInput($input['message']);
            
            $stmt = $pdo->prepare("
                INSERT INTO messages (client_id, case_id, sender_type, subject, message)
                VALUES (?, ?, 'client', ?, ?)
            ");
            $stmt->execute([$clientId, $caseId, $subject, $message]);
            
            $messageId = $pdo->lastInsertId();
            
            logAudit($pdo, $clientId, 'client', 'send_message', 'messages', $messageId);
            
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Message sent successfully',
                'messageId' => $messageId
            ]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    case 'appointments':
        if ($method !== 'GET') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
        }
        
        $clientId = $client['id'];
        
        $stmt = $pdo->prepare("
            SELECT id, title, description, appointment_date, duration_minutes, 
                   status, meeting_type, meeting_link, notes, created_at
            FROM appointments
            WHERE client_id = ?
            ORDER BY appointment_date DESC
        ");
        $stmt->execute([$clientId]);
        $appointments = $stmt->fetchAll();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => $appointments
        ]);
        break;
        
    case 'profile':
        if ($method === 'GET') {
            $clientId = $client['id'];
            
            $stmt = $pdo->prepare("
                SELECT id, email, first_name, last_name, company, phone, address, 
                       city, postal_code, country, tax_id, created_at, last_login
                FROM clients
                WHERE id = ?
            ");
            $stmt->execute([$clientId]);
            $profile = $stmt->fetch();
            
            // Remove sensitive data
            unset($profile['id']);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $profile
            ]);
            
        } elseif ($method === 'PUT') {
            // Update profile
            $input = json_decode(file_get_contents('php://input'), true);
            $clientId = $client['id'];
            
            $allowedFields = ['first_name', 'last_name', 'company', 'phone', 'address', 'city', 'postal_code', 'country', 'tax_id'];
            $updateFields = [];
            $updateValues = [];
            
            foreach ($allowedFields as $field) {
                if (isset($input[$field])) {
                    $updateFields[] = "$field = ?";
                    $updateValues[] = sanitizeInput($input[$field]);
                }
            }
            
            if (empty($updateFields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No valid fields to update']);
                break;
            }
            
            $updateValues[] = $clientId;
            
            $sql = "UPDATE clients SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($updateValues);
            
            logAudit($pdo, $clientId, 'client', 'update_profile', 'clients', $clientId);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Profile updated successfully'
            ]);
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Action not found']);
        break;
}
?>
