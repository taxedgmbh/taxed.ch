<?php
// Add Sample Data to Forum
header('Content-Type: text/html; charset=utf-8');

// Database connection
$db_host = $_ENV['DB_HOST'] ?? 'localhost';
$db_port = $_ENV['DB_PORT'] ?? '3306';
$db_name = $_ENV['DB_NAME'] ?? 'u497646184_taxedgmbh';
$db_user = $_ENV['DB_USER'] ?? 'u497646184_taxedgmbh';
$db_pass = $_ENV['DB_PASS'] ?? '';

try {
    $pdo = new PDO(
        "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
    echo "<h1>✅ Database Connected Successfully!</h1>";
} catch (PDOException $e) {
    die("<h1>❌ Database Connection Failed: " . $e->getMessage() . "</h1>");
}

echo "<h2>📊 Adding Sample Data to Forum...</h2>";

// Check what tables exist
$tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
echo "<p><strong>Available tables:</strong> " . implode(', ', $tables) . "</p>";

$success_count = 0;
$error_count = 0;

// Sample topics
$topics = [
    [
        'id' => 1001,
        'title' => 'How to claim home office expenses in 2024?',
        'slug' => 'home-office-expenses-2024',
        'content' => 'I work from home 3 days a week and want to know what expenses I can claim. What are the current rules for home office deductions in Switzerland?',
        'category_id' => 1,
        'upvotes' => 15,
        'downvotes' => 2,
        'score' => 13
    ],
    [
        'id' => 1002,
        'title' => 'VAT registration threshold for small businesses',
        'slug' => 'vat-registration-threshold',
        'content' => 'At what point do I need to register for VAT? My business is growing and I want to make sure I comply with all regulations.',
        'category_id' => 2,
        'upvotes' => 8,
        'downvotes' => 1,
        'score' => 7
    ],
    [
        'id' => 1003,
        'title' => 'Tax implications of working remotely from abroad',
        'slug' => 'remote-work-tax-implications',
        'content' => 'I am a Swiss resident but work remotely for a US company. How does this affect my tax situation?',
        'category_id' => 3,
        'upvotes' => 12,
        'downvotes' => 0,
        'score' => 12
    ],
    [
        'id' => 1004,
        'title' => 'New tax rates for 2024 - what changed?',
        'slug' => 'new-tax-rates-2024',
        'content' => 'Can someone explain the key changes in Swiss tax rates for 2024? I want to make sure I understand all the updates.',
        'category_id' => 4,
        'upvotes' => 25,
        'downvotes' => 1,
        'score' => 24
    ],
    [
        'id' => 1005,
        'title' => 'Deductions for self-employed consultants',
        'slug' => 'self-employed-deductions',
        'content' => 'What business expenses can I deduct as a freelance consultant? Looking for advice on maximizing my deductions.',
        'category_id' => 1,
        'upvotes' => 6,
        'downvotes' => 0,
        'score' => 6
    ]
];

// Insert topics
foreach ($topics as $topic) {
    try {
        $sql = "INSERT IGNORE INTO forum_topics (id, title, slug, content, author_id, category_id, status, is_featured, is_announcement, created_at, updated_at, last_reply_at, last_reply_by, upvotes, downvotes, score, hot_score) VALUES (?, ?, ?, ?, 1, ?, 'published', 0, 0, NOW(), NOW(), NOW(), 1, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $topic['id'],
            $topic['title'],
            $topic['slug'],
            $topic['content'],
            $topic['category_id'],
            $topic['upvotes'],
            $topic['downvotes'],
            $topic['score'],
            log10(max(abs($topic['score']), 1)) * ($topic['score'] >= 0 ? 1 : -1) + (time() - 1134028003) / 45000
        ]);
        echo "<p>✅ Topic added: {$topic['title']}</p>";
        $success_count++;
    } catch (PDOException $e) {
        echo "<p>❌ Error adding topic '{$topic['title']}': " . $e->getMessage() . "</p>";
        $error_count++;
    }
}

// Sample posts
$posts = [
    [
        'id' => 1001,
        'content' => 'For home office expenses, you can claim a fixed amount of CHF 5 per day for up to 50% of your working time. If you work from home more than 50% of the time, you can claim actual costs like rent, utilities, and internet.',
        'topic_id' => 1001,
        'upvotes' => 8,
        'downvotes' => 0,
        'score' => 8
    ],
    [
        'id' => 1002,
        'content' => 'You also need to keep receipts for any equipment you buy for your home office, like a desk, chair, or computer. These can be deducted as business expenses.',
        'topic_id' => 1001,
        'upvotes' => 5,
        'downvotes' => 0,
        'score' => 5
    ],
    [
        'id' => 1003,
        'content' => 'The VAT registration threshold is CHF 100,000 in annual turnover. Once you exceed this, you must register within 30 days.',
        'topic_id' => 1002,
        'upvotes' => 6,
        'downvotes' => 0,
        'score' => 6
    ],
    [
        'id' => 1004,
        'content' => 'For remote work from abroad, you need to consider the 183-day rule and potential double taxation. The US-Swiss tax treaty helps avoid this.',
        'topic_id' => 1003,
        'upvotes' => 10,
        'downvotes' => 0,
        'score' => 10
    ],
    [
        'id' => 1005,
        'content' => 'The main changes for 2024 include increased standard deductions and new rates for high earners. Check the official tax tables for your canton.',
        'topic_id' => 1004,
        'upvotes' => 12,
        'downvotes' => 0,
        'score' => 12
    ]
];

// Insert posts
foreach ($posts as $post) {
    try {
        $sql = "INSERT IGNORE INTO forum_posts (id, content, author_id, topic_id, parent_id, is_solution, is_approved, is_expert_answer, created_at, updated_at, upvotes, downvotes, score) VALUES (?, ?, 1, ?, NULL, 1, 1, 1, NOW(), NOW(), ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $post['id'],
            $post['content'],
            $post['topic_id'],
            $post['upvotes'],
            $post['downvotes'],
            $post['score']
        ]);
        echo "<p>✅ Post added to topic {$post['topic_id']}</p>";
        $success_count++;
    } catch (PDOException $e) {
        echo "<p>❌ Error adding post: " . $e->getMessage() . "</p>";
        $error_count++;
    }
}

// Sample tags
$tags = [
    ['id' => 1001, 'name' => 'Home Office', 'slug' => 'home-office', 'color' => '#3B82F6'],
    ['id' => 1002, 'name' => 'VAT', 'slug' => 'vat', 'color' => '#10B981'],
    ['id' => 1003, 'name' => 'International', 'slug' => 'international', 'color' => '#F59E0B'],
    ['id' => 1004, 'name' => 'Self-Employed', 'slug' => 'self-employed', 'color' => '#8B5CF6'],
    ['id' => 1005, 'name' => 'Retirement', 'slug' => 'retirement', 'color' => '#EF4444']
];

// Insert tags
foreach ($tags as $tag) {
    try {
        $sql = "INSERT IGNORE INTO forum_tags (id, name, slug, description, color, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $tag['id'],
            $tag['name'],
            $tag['slug'],
            "Questions about {$tag['name']}",
            $tag['color']
        ]);
        echo "<p>✅ Tag added: {$tag['name']}</p>";
        $success_count++;
    } catch (PDOException $e) {
        echo "<p>❌ Error adding tag '{$tag['name']}': " . $e->getMessage() . "</p>";
        $error_count++;
    }
}

// Link topics to tags
$topic_tags = [
    [1001, 1001], // Home office topic -> Home Office tag
    [1002, 1002], // VAT topic -> VAT tag
    [1003, 1003], // International topic -> International tag
    [1004, 1001], // Tax rates topic -> Home Office tag
    [1005, 1004]  // Self-employed topic -> Self-Employed tag
];

foreach ($topic_tags as $link) {
    try {
        $sql = "INSERT IGNORE INTO forum_topic_tags (topic_id, tag_id) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($link);
        echo "<p>✅ Linked topic {$link[0]} to tag {$link[1]}</p>";
        $success_count++;
    } catch (PDOException $e) {
        echo "<p>❌ Error linking topic to tag: " . $e->getMessage() . "</p>";
        $error_count++;
    }
}

echo "<h2>📊 Summary</h2>";
echo "<p><strong>✅ Successful operations:</strong> {$success_count}</p>";
echo "<p><strong>❌ Errors:</strong> {$error_count}</p>";

if ($success_count > 0) {
    echo "<h3>🎉 Sample data added successfully!</h3>";
    echo "<p>You can now visit <a href='/forum' target='_blank'>https://taxed.ch/forum</a> to see the forum with sample content.</p>";
} else {
    echo "<h3>⚠️ No data was added. Please check the database structure.</h3>";
}
?>
