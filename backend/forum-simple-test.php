<?php
// Simple Forum Test - Check if everything is working
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Forum Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .test { margin: 10px 0; padding: 10px; border-radius: 4px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; }
        .info { background: #d1ecf1; border: 1px solid #bee5eb; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Simple Forum Test</h1>
        
        <div class="test info">
            <h3>📋 Test Results</h3>
            <p>This page tests the basic functionality of the forum system.</p>
        </div>

        <div id="results"></div>
    </div>

    <script>
        async function runTests() {
            const resultsDiv = document.getElementById('results');
            let html = '';

            // Test 1: API Connection
            try {
                const response = await fetch('forum-unified-api.php?action=categories');
                const data = await response.json();
                
                if (data.success && data.data.length > 0) {
                    html += `
                        <div class="test success">
                            <h4>✅ API Connection Test</h4>
                            <p>Found ${data.data.length} categories</p>
                            <p>Categories: ${data.data.map(c => c.name).join(', ')}</p>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="test error">
                            <h4>❌ API Connection Test</h4>
                            <p>API returned: ${JSON.stringify(data)}</p>
                        </div>
                    `;
                }
            } catch (error) {
                html += `
                    <div class="test error">
                        <h4>❌ API Connection Test</h4>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            }

            // Test 2: Topics API
            try {
                const response = await fetch('forum-unified-api.php?action=topics');
                const data = await response.json();
                
                html += `
                    <div class="test success">
                        <h4>✅ Topics API Test</h4>
                        <p>Found ${data.data ? data.data.length : 0} topics</p>
                    </div>
                `;
            } catch (error) {
                html += `
                    <div class="test error">
                        <h4>❌ Topics API Test</h4>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            }

            // Test 3: Stats API
            try {
                const response = await fetch('forum-unified-api.php?action=stats');
                const data = await response.json();
                
                html += `
                    <div class="test success">
                        <h4>✅ Stats API Test</h4>
                        <p>Stats: ${JSON.stringify(data.data)}</p>
                    </div>
                `;
            } catch (error) {
                html += `
                    <div class="test error">
                        <h4>❌ Stats API Test</h4>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            }

            // Test 4: Frontend Navigation
            html += `
                <div class="test info">
                    <h4>🌐 Frontend Navigation Test</h4>
                    <p>Try these links:</p>
                    <ul>
                        <li><a href="/forum" target="_blank">Main Forum</a></li>
                        <li><a href="/forum/category/individual-tax-returns" target="_blank">Individual Tax Category</a></li>
                    </ul>
                </div>
            `;

            resultsDiv.innerHTML = html;
        }

        // Run tests when page loads
        window.addEventListener('load', runTests);
    </script>
</body>
</html>
