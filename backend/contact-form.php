<?php
// Contact Form Handler for Taxed.ch
// This file should be uploaded to Hostinger and can use your MySQL database

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://taxed.ch');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Database configuration
$db_config = [
    'host' => 'localhost',
    'dbname' => 'u497646184_taxedgmbh',
    'username' => 'u497646184_taxedgmbh',
    'password' => 'YOUR_MYSQL_PASSWORD_HERE', // Replace with your actual password
    'charset' => 'utf8mb4'
];

try {
    // Create database connection
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['username'], $db_config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Create contacts table if it doesn't exist
    $createTable = "
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            subject VARCHAR(255),
            message TEXT NOT NULL,
            ip_address VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    $pdo->exec($createTable);

    // Get form data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON data');
    }

    // Validate required fields
    $required_fields = ['name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            throw new Exception("Field '{$field}' is required");
        }
    }

    // Sanitize and validate data
    $name = trim($input['name']);
    $email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
    $phone = isset($input['phone']) ? trim($input['phone']) : null;
    $subject = isset($input['subject']) ? trim($input['subject']) : 'Contact Form Submission';
    $message = trim($input['message']);

    if (!$email) {
        throw new Exception('Invalid email address');
    }

    // Get client information
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

    // Insert into database
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, phone, subject, message, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([$name, $email, $phone, $subject, $message, $ip_address, $user_agent]);
    $contact_id = $pdo->lastInsertId();

    // Send email notification (optional)
    $to = 'info@taxed.ch'; // Replace with your email
    $email_subject = "New Contact Form Submission - {$subject}";
    $email_message = "
        New contact form submission from taxed.ch:
        
        Name: {$name}
        Email: {$email}
        Phone: {$phone}
        Subject: {$subject}
        
        Message:
        {$message}
        
        Submitted at: " . date('Y-m-d H:i:s') . "
        IP Address: {$ip_address}
        Contact ID: {$contact_id}
    ";

    $headers = [
        'From: noreply@taxed.ch',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];

    // Uncomment to enable email notifications
    // mail($to, $email_subject, $email_message, implode("\r\n", $headers));

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you soon.',
        'contact_id' => $contact_id
    ]);

} catch (Exception $e) {
    // Log error (in production, log to file instead of displaying)
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
