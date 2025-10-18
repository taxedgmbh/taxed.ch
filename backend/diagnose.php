<?php
/**
 * Server Diagnostic Script
 * Identifies PHP and server configuration issues
 */

// Disable error reporting for clean output
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: text/plain');

echo "=== SERVER DIAGNOSTIC REPORT ===\n\n";

// Basic PHP info
echo "PHP Version: " . phpversion() . "\n";
echo "Server Software: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "\n";
echo "Document Root: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'Unknown') . "\n";
echo "Script Name: " . ($_SERVER['SCRIPT_NAME'] ?? 'Unknown') . "\n\n";

// Check if we can write to directory
echo "Directory Permissions:\n";
echo "Current Directory: " . getcwd() . "\n";
echo "Directory Writable: " . (is_writable('.') ? 'YES' : 'NO') . "\n\n";

// Check PHP extensions
echo "PHP Extensions:\n";
echo "PDO: " . (extension_loaded('pdo') ? 'YES' : 'NO') . "\n";
echo "PDO MySQL: " . (extension_loaded('pdo_mysql') ? 'YES' : 'NO') . "\n";
echo "JSON: " . (extension_loaded('json') ? 'YES' : 'NO') . "\n";
echo "cURL: " . (extension_loaded('curl') ? 'YES' : 'NO') . "\n\n";

// Check file permissions
echo "File Permissions:\n";
$files_to_check = [
    'config/database.php',
    'models/ForumCategory.php',
    'models/ForumTopic.php',
    'models/ForumPost.php'
];

foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        echo "$file: EXISTS, Readable: " . (is_readable($file) ? 'YES' : 'NO') . "\n";
    } else {
        echo "$file: NOT FOUND\n";
    }
}

echo "\n=== END DIAGNOSTIC ===\n";
?>
