<?php
/**
 * Database configuration and connection
 */

// Database configuration
$db_config = [
    'host' => $_ENV['DB_HOST'] ?? 'localhost',
    'port' => $_ENV['DB_PORT'] ?? '3306',
    'dbname' => $_ENV['DB_NAME'] ?? 'taxed_portal',
    'username' => $_ENV['DB_USER'] ?? 'root',
    'password' => $_ENV['DB_PASS'] ?? '',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ]
];

try {
    $dsn = "mysql:host={$db_config['host']};port={$db_config['port']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO(
        $dsn,
        $db_config['username'],
        $db_config['password'],
        $db_config['options']
    );
    
    // Make PDO available globally
    $GLOBALS['pdo'] = $pdo;
    
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed'
    ]);
    exit();
}

/**
 * Get database connection
 * @return PDO
 */
function getDatabase() {
    return $GLOBALS['pdo'];
}

/**
 * Execute a prepared statement with error handling
 * @param string $sql SQL query
 * @param array $params Parameters for the query
 * @return PDOStatement
 * @throws Exception
 */
function executeQuery($sql, $params = []) {
    try {
        $stmt = $GLOBALS['pdo']->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        error_log("Database query failed: " . $e->getMessage());
        throw new Exception("Database operation failed");
    }
}

/**
 * Begin a database transaction
 * @return bool
 */
function beginTransaction() {
    return $GLOBALS['pdo']->beginTransaction();
}

/**
 * Commit a database transaction
 * @return bool
 */
function commitTransaction() {
    return $GLOBALS['pdo']->commit();
}

/**
 * Rollback a database transaction
 * @return bool
 */
function rollbackTransaction() {
    return $GLOBALS['pdo']->rollBack();
}

/**
 * Get the last inserted ID
 * @return string
 */
function getLastInsertId() {
    return $GLOBALS['pdo']->lastInsertId();
}
?>
