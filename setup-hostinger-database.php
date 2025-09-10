<?php
/**
 * Hostinger Database Setup Script
 * Taxed.ch - Swiss Tax Consulting
 * This script will automatically create all database tables
 */

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
    
    echo "<h1>🗄️ Taxed.ch Database Setup</h1>";
    echo "<p>✅ Database connection successful!</p>";
    
} catch (PDOException $e) {
    die("<h1>❌ Database Connection Failed</h1><p>Error: " . $e->getMessage() . "</p>");
}

// SQL commands to create all tables
$sql_commands = [
    // Create clients table
    "CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        company VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        postal_code VARCHAR(20),
        country VARCHAR(100) DEFAULT 'Switzerland',
        tax_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
        last_login TIMESTAMP NULL,
        INDEX idx_email (email),
        INDEX idx_status (status)
    )",
    
    // Create client sessions table
    "CREATE TABLE IF NOT EXISTS client_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        session_token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        INDEX idx_session_token (session_token),
        INDEX idx_client_id (client_id),
        INDEX idx_expires_at (expires_at)
    )",
    
    // Create tax cases table
    "CREATE TABLE IF NOT EXISTS tax_cases (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        case_number VARCHAR(50) NOT NULL UNIQUE,
        tax_year YEAR NOT NULL,
        case_type ENUM('individual', 'corporate', 'expat', 'other') NOT NULL,
        status ENUM('pending', 'in_progress', 'completed', 'filed') DEFAULT 'pending',
        priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
        description TEXT,
        assigned_to VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        due_date DATE,
        filed_date DATE NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        INDEX idx_client_id (client_id),
        INDEX idx_case_number (case_number),
        INDEX idx_status (status),
        INDEX idx_tax_year (tax_year)
    )",
    
    // Create documents table
    "CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        case_id INT,
        filename VARCHAR(255) NOT NULL,
        original_filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        document_type ENUM('tax_return', 'receipt', 'invoice', 'contract', 'other') NOT NULL,
        description TEXT,
        uploaded_by ENUM('client', 'admin') DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (case_id) REFERENCES tax_cases(id) ON DELETE SET NULL,
        INDEX idx_client_id (client_id),
        INDEX idx_case_id (case_id),
        INDEX idx_document_type (document_type)
    )",
    
    // Create messages table
    "CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        case_id INT,
        sender_type ENUM('client', 'admin') NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        FOREIGN KEY (case_id) REFERENCES tax_cases(id) ON DELETE SET NULL,
        INDEX idx_client_id (client_id),
        INDEX idx_case_id (case_id),
        INDEX idx_is_read (is_read),
        INDEX idx_created_at (created_at)
    )",
    
    // Create appointments table
    "CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        appointment_date DATETIME NOT NULL,
        duration_minutes INT DEFAULT 60,
        status ENUM('scheduled', 'confirmed', 'completed', 'cancelled') DEFAULT 'scheduled',
        meeting_type ENUM('phone', 'video', 'in_person') DEFAULT 'phone',
        meeting_link VARCHAR(500),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
        INDEX idx_client_id (client_id),
        INDEX idx_appointment_date (appointment_date),
        INDEX idx_status (status)
    )",
    
    // Create admin users table
    "CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'tax_advisor', 'assistant') DEFAULT 'tax_advisor',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_username (username),
        INDEX idx_email (email),
        INDEX idx_role (role)
    )",
    
    // Create audit log table
    "CREATE TABLE IF NOT EXISTS audit_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        user_type ENUM('client', 'admin') NOT NULL,
        action VARCHAR(100) NOT NULL,
        table_name VARCHAR(100),
        record_id INT,
        old_values JSON,
        new_values JSON,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
    )",
    
    // Create admin sessions table
    "CREATE TABLE IF NOT EXISTS admin_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        session_token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
        INDEX idx_session_token (session_token),
        INDEX idx_admin_id (admin_id),
        INDEX idx_expires_at (expires_at)
    )",
    
    // Create admin login attempts table
    "CREATE TABLE IF NOT EXISTS admin_login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        action VARCHAR(50) NOT NULL,
        success BOOLEAN NOT NULL,
        username VARCHAR(100),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_ip_address (ip_address),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
    )",
    
    // Create admin audit log table
    "CREATE TABLE IF NOT EXISTS admin_audit_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        action VARCHAR(100) NOT NULL,
        details JSON,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
        INDEX idx_admin_id (admin_id),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
    )"
];

// Execute SQL commands
echo "<h2>🚀 Creating Database Tables...</h2>";
$success_count = 0;
$error_count = 0;

foreach ($sql_commands as $index => $sql) {
    try {
        $pdo->exec($sql);
        $success_count++;
        echo "<p>✅ Table " . ($index + 1) . " created successfully</p>";
    } catch (PDOException $e) {
        $error_count++;
        echo "<p>❌ Error creating table " . ($index + 1) . ": " . $e->getMessage() . "</p>";
    }
}

// Insert default admin user
echo "<h2>👨‍💼 Creating Default Admin User...</h2>";
try {
    $admin_sql = "INSERT INTO admin_users (username, email, password_hash, first_name, last_name, role) 
                  VALUES ('admin', 'admin@taxed.ch', ?, 'Admin', 'User', 'admin')
                  ON DUPLICATE KEY UPDATE username=username";
    
    $stmt = $pdo->prepare($admin_sql);
    $stmt->execute([password_hash('admin123', PASSWORD_DEFAULT)]);
    
    echo "<p>✅ Default admin user created successfully</p>";
    echo "<p><strong>Admin Credentials:</strong></p>";
    echo "<ul>";
    echo "<li>Username: admin</li>";
    echo "<li>Email: admin@taxed.ch</li>";
    echo "<li>Password: admin123</li>";
    echo "<li>⚠️ <strong>CHANGE THIS PASSWORD IMMEDIATELY!</strong></li>";
    echo "</ul>";
    
} catch (PDOException $e) {
    echo "<p>❌ Error creating admin user: " . $e->getMessage() . "</p>";
}

// Verify tables were created
echo "<h2>🔍 Verifying Database Structure...</h2>";
try {
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $expected_tables = [
        'clients', 'client_sessions', 'tax_cases', 'documents', 
        'messages', 'appointments', 'admin_users', 'audit_log',
        'admin_sessions', 'admin_login_attempts', 'admin_audit_log'
    ];
    
    echo "<p><strong>Tables found in database:</strong></p>";
    echo "<ul>";
    foreach ($tables as $table) {
        if (in_array($table, $expected_tables)) {
            echo "<li>✅ $table</li>";
        } else {
            echo "<li>ℹ️ $table (existing table)</li>";
        }
    }
    echo "</ul>";
    
    $missing_tables = array_diff($expected_tables, $tables);
    if (empty($missing_tables)) {
        echo "<p>🎉 <strong>All required tables created successfully!</strong></p>";
    } else {
        echo "<p>⚠️ Missing tables: " . implode(', ', $missing_tables) . "</p>";
    }
    
} catch (PDOException $e) {
    echo "<p>❌ Error verifying tables: " . $e->getMessage() . "</p>";
}

// Test database functionality
echo "<h2>🧪 Testing Database Functionality...</h2>";
try {
    // Test client table
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM clients");
    $result = $stmt->fetch();
    echo "<p>✅ Clients table: " . $result['count'] . " records</p>";
    
    // Test admin table
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM admin_users");
    $result = $stmt->fetch();
    echo "<p>✅ Admin users table: " . $result['count'] . " records</p>";
    
    // Test audit log
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM audit_log");
    $result = $stmt->fetch();
    echo "<p>✅ Audit log table: " . $result['count'] . " records</p>";
    
} catch (PDOException $e) {
    echo "<p>❌ Error testing functionality: " . $e->getMessage() . "</p>";
}

// Summary
echo "<h2>📊 Setup Summary</h2>";
echo "<ul>";
echo "<li>✅ Tables created successfully: $success_count</li>";
echo "<li>❌ Errors encountered: $error_count</li>";
echo "<li>🗄️ Database: {$db_config['dbname']}</li>";
echo "<li>👤 Default admin user created</li>";
echo "</ul>";

if ($error_count == 0) {
    echo "<h1>🎉 DATABASE SETUP COMPLETE!</h1>";
    echo "<p><strong>Your secure client portal database is now ready!</strong></p>";
    echo "<h3>🚀 Next Steps:</h3>";
    echo "<ol>";
    echo "<li><strong>Test Admin Access:</strong> <a href='/admin' target='_blank'>https://taxed.ch/admin</a></li>";
    echo "<li><strong>Test Client Portal:</strong> <a href='/client-portal' target='_blank'>https://taxed.ch/client-portal</a></li>";
    echo "<li><strong>Use Bypass Codes:</strong></li>";
    echo "<ul>";
    echo "<li>Admin: <code>TAXED_ADMIN_2024_BYPASS</code></li>";
    echo "<li>Client: <code>TAXED_CLIENT_2024_BYPASS</code></li>";
    echo "</ul>";
    echo "<li><strong>Change default admin password immediately!</strong></li>";
    echo "</ol>";
} else {
    echo "<h1>⚠️ SETUP COMPLETED WITH ERRORS</h1>";
    echo "<p>Please review the errors above and fix them manually if needed.</p>";
}

echo "<hr>";
echo "<p><small>Generated on: " . date('Y-m-d H:i:s') . "</small></p>";
?>
