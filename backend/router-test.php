<?php
// Router Test - Test if React Router is working
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Router Test - Taxed GmbH</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .test { margin: 10px 0; padding: 10px; border-radius: 4px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; }
        .info { background: #d1ecf1; border: 1px solid #bee5eb; }
        iframe { width: 100%; height: 400px; border: 1px solid #ddd; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Router Test</h1>
        
        <div class="test info">
            <h3>📋 React Router Test</h3>
            <p>This page tests if React Router is working by loading the actual React app in an iframe.</p>
        </div>

        <div class="test">
            <h4>🌐 Main App Test</h4>
            <p>Loading main app: <a href="/" target="_blank">https://taxed.ch/</a></p>
            <iframe src="/" title="Main App"></iframe>
        </div>

        <div class="test">
            <h4>🗣️ Forum Test</h4>
            <p>Loading forum: <a href="/forum" target="_blank">https://taxed.ch/forum</a></p>
            <iframe src="/forum" title="Forum Page"></iframe>
        </div>

        <div class="test">
            <h4>🧪 Forum Test Page</h4>
            <p>Loading test page: <a href="/forum-test" target="_blank">https://taxed.ch/forum-test</a></p>
            <iframe src="/forum-test" title="Forum Test Page"></iframe>
        </div>

        <div class="test info">
            <h3>📋 Manual Tests</h3>
            <p>Try these links manually:</p>
            <ul>
                <li><a href="/" target="_blank">Main Page</a></li>
                <li><a href="/forum" target="_blank">Forum</a></li>
                <li><a href="/forum-test" target="_blank">Forum Test</a></li>
                <li><a href="/blog" target="_blank">Blog</a></li>
            </ul>
        </div>

        <div class="test info">
            <h3>🔧 Debug Information</h3>
            <p>Current URL: <span id="current-url"></span></p>
            <p>User Agent: <span id="user-agent"></span></p>
            <p>Timestamp: <span id="timestamp"></span></p>
        </div>
    </div>

    <script>
        // Fill in debug information
        document.getElementById('current-url').textContent = window.location.href;
        document.getElementById('user-agent').textContent = navigator.userAgent;
        document.getElementById('timestamp').textContent = new Date().toISOString();

        // Test if we can access the main app
        fetch('/')
            .then(response => {
                console.log('Main app response:', response.status);
                if (response.ok) {
                    console.log('✅ Main app is accessible');
                } else {
                    console.log('❌ Main app returned:', response.status);
                }
            })
            .catch(error => {
                console.log('❌ Main app error:', error);
            });

        // Test if we can access the forum
        fetch('/forum')
            .then(response => {
                console.log('Forum response:', response.status);
                if (response.ok) {
                    console.log('✅ Forum is accessible');
                } else {
                    console.log('❌ Forum returned:', response.status);
                }
            })
            .catch(error => {
                console.log('❌ Forum error:', error);
            });
    </script>
</body>
</html>
