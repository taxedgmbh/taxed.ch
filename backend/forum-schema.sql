-- Forum Database Schema for Taxed.ch
-- Run this SQL in your Hostinger MySQL database via phpMyAdmin

-- Create forum categories table
CREATE TABLE IF NOT EXISTS forum_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    icon VARCHAR(50) DEFAULT 'folder',
    color VARCHAR(7) DEFAULT '#3B82F6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES forum_categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent_id (parent_id),
    INDEX idx_is_active (is_active),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum topics/threads table
CREATE TABLE IF NOT EXISTS forum_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category_id INT NOT NULL,
    author_id INT NOT NULL,
    status ENUM('active', 'locked', 'pinned', 'archived') DEFAULT 'active',
    is_featured BOOLEAN DEFAULT FALSE,
    is_announcement BOOLEAN DEFAULT FALSE,
    is_solved BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    last_reply_at TIMESTAMP NULL,
    last_reply_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (last_reply_by) REFERENCES clients(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category_id (category_id),
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_is_featured (is_featured),
    INDEX idx_is_announcement (is_announcement),
    INDEX idx_created_at (created_at),
    INDEX idx_last_reply_at (last_reply_at),
    FULLTEXT idx_title_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum posts/replies table
CREATE TABLE IF NOT EXISTS forum_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    author_id INT NOT NULL,
    content TEXT NOT NULL,
    parent_id INT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    is_expert_answer BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
    INDEX idx_topic_id (topic_id),
    INDEX idx_author_id (author_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_is_solution (is_solution),
    INDEX idx_is_approved (is_approved),
    INDEX idx_is_expert_answer (is_expert_answer),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_content (content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum user roles table
CREATE TABLE IF NOT EXISTS forum_user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role ENUM('member', 'moderator', 'admin', 'expert') DEFAULT 'member',
    category_id INT NULL,
    granted_by INT NOT NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_role (role),
    INDEX idx_category_id (category_id),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum moderation table
CREATE TABLE IF NOT EXISTS forum_moderation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_type ENUM('topic', 'post', 'user') NOT NULL,
    content_id INT NOT NULL,
    moderator_id INT NOT NULL,
    action ENUM('approve', 'reject', 'edit', 'delete', 'lock', 'unlock', 'pin', 'unpin', 'warn', 'ban') NOT NULL,
    reason TEXT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (moderator_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_content_type (content_type),
    INDEX idx_content_id (content_id),
    INDEX idx_moderator_id (moderator_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum likes table
CREATE TABLE IF NOT EXISTS forum_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_type ENUM('topic', 'post') NOT NULL,
    content_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, content_type, content_id),
    INDEX idx_user_id (user_id),
    INDEX idx_content (content_type, content_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum bookmarks table
CREATE TABLE IF NOT EXISTS forum_bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bookmark (user_id, topic_id),
    INDEX idx_user_id (user_id),
    INDEX idx_topic_id (topic_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum notifications table
CREATE TABLE IF NOT EXISTS forum_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('reply', 'mention', 'like', 'solution', 'moderation') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSON,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum tags table
CREATE TABLE IF NOT EXISTS forum_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#6B7280',
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_usage_count (usage_count)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create forum topic tags junction table
CREATE TABLE IF NOT EXISTS forum_topic_tags (
    topic_id INT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES forum_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (topic_id, tag_id),
    INDEX idx_topic_id (topic_id),
    INDEX idx_tag_id (tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default forum categories
INSERT INTO forum_categories (name, slug, description, sort_order, icon, color) VALUES
('Individual Tax Returns', 'individual-tax-returns', 'Questions about personal tax returns, deductions, and individual tax planning', 1, 'user', '#3B82F6'),
('Business Tax Services', 'business-tax-services', 'Corporate tax compliance, VAT, and business tax planning', 2, 'building', '#10B981'),
('International Tax', 'international-tax', 'Cross-border tax issues, tax treaties, and expatriate tax planning', 3, 'globe', '#F59E0B'),
('Tax Education & Resources', 'tax-education-resources', 'Swiss tax law updates, deadlines, forms, and educational content', 4, 'book-open', '#8B5CF6'),
('Professional Services', 'professional-services', 'Tax audit support, compliance issues, and recovery services', 5, 'briefcase', '#EF4444'),
('General Discussion', 'general-discussion', 'Tax news, success stories, community events, and off-topic discussions', 6, 'message-circle', '#6B7280');

-- Insert default forum tags
INSERT INTO forum_tags (name, slug, description, color) VALUES
('quellensteuer', 'quellensteuer', 'Swiss withholding tax questions', '#3B82F6'),
('expat', 'expat', 'Expatriate tax issues', '#10B981'),
('vat', 'vat', 'Value Added Tax questions', '#F59E0B'),
('pillar-3a', 'pillar-3a', 'Third pillar retirement savings', '#8B5CF6'),
('tax-planning', 'tax-planning', 'Strategic tax planning', '#EF4444'),
('compliance', 'compliance', 'Tax compliance issues', '#6B7280'),
('audit', 'audit', 'Tax audit support', '#3B82F6'),
('recovery', 'recovery', 'Tax refund and recovery', '#10B981'),
('treaty', 'treaty', 'Tax treaty questions', '#F59E0B'),
('deadline', 'deadline', 'Tax deadline questions', '#8B7280');

-- Create views for forum statistics
CREATE OR REPLACE VIEW forum_category_stats AS
SELECT 
    c.id,
    c.name,
    c.slug,
    COUNT(t.id) as topic_count,
    COUNT(p.id) as post_count,
    COALESCE(MAX(t.last_reply_at), MAX(t.created_at)) as last_activity
FROM forum_categories c
LEFT JOIN forum_topics t ON c.id = t.category_id AND t.status = 'active'
LEFT JOIN forum_posts p ON t.id = p.topic_id AND p.is_approved = TRUE
WHERE c.is_active = TRUE
GROUP BY c.id, c.name, c.slug;

CREATE OR REPLACE VIEW forum_user_stats AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    COUNT(DISTINCT t.id) as topics_created,
    COUNT(DISTINCT p.id) as posts_created,
    COUNT(DISTINCT l.id) as likes_received,
    COUNT(DISTINCT s.id) as solutions_marked
FROM clients u
LEFT JOIN forum_topics t ON u.id = t.author_id
LEFT JOIN forum_posts p ON u.id = p.author_id
LEFT JOIN forum_likes l ON (l.content_type = 'post' AND l.content_id = p.id) OR (l.content_type = 'topic' AND l.content_id = t.id)
LEFT JOIN forum_posts s ON u.id = s.author_id AND s.is_solution = TRUE
GROUP BY u.id, u.first_name, u.last_name, u.email;

-- Create indexes for better performance
CREATE INDEX idx_forum_topics_search ON forum_topics(title, content);
CREATE INDEX idx_forum_posts_search ON forum_posts(content);
CREATE INDEX idx_forum_topics_activity ON forum_topics(last_reply_at DESC, created_at DESC);
CREATE INDEX idx_forum_posts_chronological ON forum_posts(topic_id, created_at ASC);
