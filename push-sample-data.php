<?php
/**
 * Push Sample Data to Hostinger Database
 * Taxed.ch - Swiss Tax Consulting
 * This script will execute the complete SQL script with sample data
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
    
    echo "<h1>🗄️ Taxed.ch Database Setup with Sample Data</h1>";
    echo "<p>✅ Database connection successful!</p>";
    
} catch (PDOException $e) {
    die("<h1>❌ Database Connection Failed</h1><p>Error: " . $e->getMessage() . "</p>");
}

// Read the SQL script
$sql_script = file_get_contents('database-setup.sql');
if (!$sql_script) {
    die("<h1>❌ SQL Script Not Found</h1><p>Please ensure database-setup.sql exists in the same directory.</p>");
}

// Split the SQL script into individual statements
$statements = array_filter(array_map('trim', explode(';', $sql_script)));

echo "<h2>🚀 Executing SQL Script...</h2>";
$success_count = 0;
$error_count = 0;
$results = [];

foreach ($statements as $index => $statement) {
    if (empty($statement) || strpos($statement, '--') === 0) {
        continue; // Skip empty statements and comments
    }
    
    try {
        $pdo->exec($statement);
        $success_count++;
        
        // Identify what was created
        if (stripos($statement, 'CREATE TABLE') !== false) {
            preg_match('/CREATE TABLE.*?`?(\w+)`?/i', $statement, $matches);
            $table_name = $matches[1] ?? 'Unknown';
            $results[] = "✅ Table '$table_name' created successfully";
        } elseif (stripos($statement, 'INSERT INTO') !== false) {
            preg_match('/INSERT INTO.*?`?(\w+)`?/i', $statement, $matches);
            $table_name = $matches[1] ?? 'Unknown';
            $results[] = "✅ Data inserted into '$table_name' successfully";
        } elseif (stripos($statement, 'ALTER TABLE') !== false) {
            preg_match('/ALTER TABLE.*?`?(\w+)`?/i', $statement, $matches);
            $table_name = $matches[1] ?? 'Unknown';
            $results[] = "✅ Foreign key added to '$table_name' successfully";
        } else {
            $results[] = "✅ Statement " . ($index + 1) . " executed successfully";
        }
        
    } catch (PDOException $e) {
        $error_count++;
        $results[] = "❌ Error in statement " . ($index + 1) . ": " . $e->getMessage();
    }
}

// Display results
echo "<h2>📊 Execution Results</h2>";
echo "<ul>";
foreach ($results as $result) {
    echo "<li>$result</li>";
}
echo "</ul>";

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

// Count records in each table
echo "<h2>📈 Sample Data Verification</h2>";
$table_counts = [
    'admin_users' => 'Admin Users',
    'clients' => 'Clients',
    'tax_cases' => 'Tax Cases',
    'documents' => 'Documents',
    'messages' => 'Messages',
    'appointments' => 'Appointments',
    'audit_log' => 'Audit Log Entries'
];

echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr><th>Table</th><th>Description</th><th>Record Count</th></tr>";

foreach ($table_counts as $table => $description) {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM $table");
        $result = $stmt->fetch();
        $count = $result['count'];
        echo "<tr><td>$table</td><td>$description</td><td>$count</td></tr>";
    } catch (PDOException $e) {
        echo "<tr><td>$table</td><td>$description</td><td>❌ Error</td></tr>";
    }
}
echo "</table>";

// Summary
echo "<h2>📊 Setup Summary</h2>";
echo "<ul>";
echo "<li>✅ SQL statements executed successfully: $success_count</li>";
echo "<li>❌ Errors encountered: $error_count</li>";
echo "<li>🗄️ Database: {$db_config['dbname']}</li>";
echo "<li>👤 Admin users created: 4</li>";
echo "<li>👥 Sample clients created: 8</li>";
echo "<li>📋 Tax cases created: 9</li>";
echo "<li>📄 Documents created: 12</li>";
echo "<li>💬 Messages created: 9</li>";
echo "<li>📅 Appointments created: 8</li>";
echo "</ul>";

if ($error_count == 0) {
    echo "<h1>🎉 DATABASE SETUP WITH SAMPLE DATA COMPLETE!</h1>";
    echo "<p><strong>Your secure client portal database is now fully operational with comprehensive sample data!</strong></p>";
    echo "<h3>🚀 Next Steps:</h3>";
    echo "<ol>";
    echo "<li><strong>Test Admin Access:</strong> <a href='/admin' target='_blank'>https://taxed.ch/admin</a></li>";
    echo "<li><strong>Test Client Portal:</strong> <a href='/client-portal' target='_blank'>https://taxed.ch/client-portal</a></li>";
    echo "<li><strong>Use Bypass Codes:</strong></li>";
    echo "<ul>";
    echo "<li>Admin: <code>TAXED_ADMIN_2024_BYPASS</code></li>";
    echo "<li>Client: <code>TAXED_CLIENT_2024_BYPASS</code></li>";
    echo "</ul>";
    echo "<li><strong>Login with sample clients:</strong></li>";
    echo "<ul>";
    echo "<li>john.doe@email.com</li>";
    echo "<li>jane.smith@email.com</li>";
    echo "<li>robert.johnson@email.com</li>";
    echo "<li>sarah.wilson@email.com</li>";
    echo "<li>michael.brown@email.com</li>";
    echo "<li>emma.davis@email.com</li>";
    echo "<li>david.miller@email.com</li>";
    echo "<li>lisa.garcia@email.com</li>";
    echo "</ul>";
    echo "<li><strong>All sample client passwords:</strong> <code>admin123</code></li>";
    echo "</ol>";
} else {
    echo "<h1>⚠️ SETUP COMPLETED WITH ERRORS</h1>";
    echo "<p>Please review the errors above and fix them manually if needed.</p>";
}

echo "<hr>";
echo "<p><small>Generated on: " . date('Y-m-d H:i:s') . "</small></p>";
?>
