<?php
/**
 * Simple test to verify server connection and file access
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'success' => true,
    'message' => 'Server is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => [
        'php_version' => phpversion(),
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'Unknown'
    ],
    'file_locations' => [
        'current_file' => __FILE__,
        'directory' => __DIR__,
        'files_in_directory' => array_diff(scandir(__DIR__), ['.', '..'])
    ]
]);
?>
