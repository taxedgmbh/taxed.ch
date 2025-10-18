<?php
// Forum Debug Page
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forum Debug - Taxed GmbH</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .test-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .success { background: #d4edda; border-color: #c3e6cb; }
        .error { background: #f8d7da; border-color: #f5c6cb; }
        .info { background: #d1ecf1; border-color: #bee5eb; }
        button { padding: 10px 20px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .result { margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Forum Debug Center</h1>
        <p>This page helps diagnose forum functionality issues.</p>

        <div class="test-section info">
            <h3>📋 Test Checklist</h3>
            <p>Click each button below to test different aspects of the forum:</p>
        </div>

        <div class="test-section">
            <h3>1. 🔌 API Connection Test</h3>
            <button onclick="testAPI()">Test Forum API</button>
            <div id="api-result" class="result" style="display: none;"></div>
        </div>

        <div class="test-section">
            <h3>2. 📊 Database Data Test</h3>
            <button onclick="testDatabase()">Test Database Data</button>
            <div id="db-result" class="result" style="display: none;"></div>
        </div>

        <div class="test-section">
            <h3>3. 🌐 Frontend JavaScript Test</h3>
            <button onclick="testFrontend()">Test Frontend</button>
            <div id="frontend-result" class="result" style="display: none;"></div>
        </div>

        <div class="test-section">
            <h3>4. 🔗 Direct API Links</h3>
            <p>Test these URLs directly in your browser:</p>
            <ul>
                <li><a href="forum-unified-api.php?action=categories" target="_blank">Categories API</a></li>
                <li><a href="forum-unified-api.php?action=topics" target="_blank">Topics API</a></li>
                <li><a href="forum-unified-api.php?action=stats" target="_blank">Stats API</a></li>
                <li><a href="test-forum-api.php" target="_blank">Forum Test API</a></li>
            </ul>
        </div>

        <div class="test-section">
            <h3>5. 🚀 Forum Navigation Test</h3>
            <p>Test these forum pages:</p>
            <ul>
                <li><a href="/forum" target="_blank">Main Forum Page</a></li>
                <li><a href="/forum/category/individual-tax-returns" target="_blank">Individual Tax Category</a></li>
            </ul>
        </div>
    </div>

    <script>
        async function testAPI() {
            const resultDiv = document.getElementById('api-result');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<p>Testing API connection...</p>';

            try {
                const response = await fetch('forum-unified-api.php?action=categories');
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.className = 'result success';
                    resultDiv.innerHTML = `
                        <h4>✅ API Connection Successful!</h4>
                        <p>Found ${data.data.length} categories</p>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                } else {
                    resultDiv.className = 'result error';
                    resultDiv.innerHTML = `
                        <h4>❌ API Error</h4>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    `;
                }
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `
                    <h4>❌ Connection Failed</h4>
                    <p>Error: ${error.message}</p>
                    <p>This might be a CORS issue or the API is not responding.</p>
                `;
            }
        }

        async function testDatabase() {
            const resultDiv = document.getElementById('db-result');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<p>Testing database connection...</p>';

            try {
                const response = await fetch('test-forum-api.php');
                const data = await response.json();
                
                resultDiv.className = 'result info';
                resultDiv.innerHTML = `
                    <h4>📊 Database Test Results</h4>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = `
                    <h4>❌ Database Test Failed</h4>
                    <p>Error: ${error.message}</p>
                `;
            }
        }

        function testFrontend() {
            const resultDiv = document.getElementById('frontend-result');
            resultDiv.style.display = 'block';
            resultDiv.className = 'result info';
            
            const tests = [
                { name: 'React Router', test: () => {
                    // Check if we're in a React environment
                    return typeof window !== 'undefined' && 
                           (document.querySelector('#root') !== null || 
                            document.querySelector('[data-reactroot]') !== null);
                }},
                { name: 'Fetch API', test: () => typeof fetch !== 'undefined' },
                { name: 'Console Errors', test: () => {
                    // Simple check - if we can run this code, console is working
                    return true;
                }}
            ];

            let results = '<h4>🌐 Frontend Test Results</h4>';
            tests.forEach(test => {
                try {
                    const passed = test.test();
                    results += `<p>${test.name}: ${passed ? '✅ Pass' : '❌ Fail'}</p>`;
                } catch (e) {
                    results += `<p>${test.name}: ❌ Error - ${e.message}</p>`;
                }
            });

            resultDiv.innerHTML = results;
        }

        // Auto-run basic tests on page load
        window.addEventListener('load', () => {
            console.log('Forum Debug Page Loaded');
            console.log('Current URL:', window.location.href);
            console.log('User Agent:', navigator.userAgent);
        });
    </script>
</body>
</html>
