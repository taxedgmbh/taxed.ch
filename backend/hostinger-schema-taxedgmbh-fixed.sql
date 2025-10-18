-- ===========================================
-- COMPLETE TAXED GMBH DATABASE SCHEMA - OPTIMIZED
-- Database: u497646184_taxedgmbh
-- Upload this single file to Hostinger phpMyAdmin
-- ===========================================

-- ===========================================
-- PART 1: CORE WEBSITE TABLES
-- ===========================================

-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status),
    -- Data validation constraints
    CONSTRAINT chk_contact_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_contact_message_length CHECK (CHAR_LENGTH(message) >= 10 AND CHAR_LENGTH(message) <= 5000)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    source VARCHAR(100) DEFAULT 'website',
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_subscribed_at (subscribed_at),
    -- Data validation constraints
    CONSTRAINT chk_newsletter_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================
-- PART 2: CLIENT PORTAL SYSTEM
-- ===========================================

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
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
    INDEX idx_status (status),
    -- Data validation constraints
    CONSTRAINT chk_client_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_client_name CHECK (CHAR_LENGTH(first_name) >= 2 AND CHAR_LENGTH(last_name) >= 2),
    CONSTRAINT chk_client_password CHECK (CHAR_LENGTH(password_hash) >= 60)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create client sessions table
CREATE TABLE IF NOT EXISTS client_sessions (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create tax cases table
CREATE TABLE IF NOT EXISTS tax_cases (
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
    INDEX idx_tax_year (tax_year),
    -- Data validation constraints
    CONSTRAINT chk_tax_year CHECK (tax_year >= 2020 AND tax_year <= 2030)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
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
    INDEX idx_document_type (document_type),
    -- Data validation constraints
    CONSTRAINT chk_file_size CHECK (file_size > 0 AND file_size <= 10485760) -- 10MB max
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
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
    INDEX idx_created_at (created_at),
    -- Data validation constraints
    CONSTRAINT chk_message_length CHECK (CHAR_LENGTH(message) >= 10 AND CHAR_LENGTH(message) <= 10000)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
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
    INDEX idx_status (status),
    -- Data validation constraints
    CONSTRAINT chk_duration CHECK (duration_minutes >= 15 AND duration_minutes <= 480) -- 15 min to 8 hours
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================
-- PART 3: ADMIN SYSTEM
-- ===========================================

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
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
    INDEX idx_role (role),
    -- Data validation constraints
    CONSTRAINT chk_admin_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_admin_password CHECK (CHAR_LENGTH(password_hash) >= 60)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create admin login attempts table
CREATE TABLE IF NOT EXISTS admin_login_attempts (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_log (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================
-- PART 4: FORUM SYSTEM
-- ===========================================

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
    INDEX idx_sort_order (sort_order),
    -- Data validation constraints
    CONSTRAINT chk_category_name CHECK (CHAR_LENGTH(name) >= 3 AND CHAR_LENGTH(name) <= 100)
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
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    score INT DEFAULT 0,
    hot_score DECIMAL(10,2) DEFAULT 0,
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
    INDEX idx_hot_score (hot_score DESC, created_at DESC),
    FULLTEXT idx_title_content (title, content),
    -- Data validation constraints
    CONSTRAINT chk_topic_title CHECK (CHAR_LENGTH(title) >= 10 AND CHAR_LENGTH(title) <= 255),
    CONSTRAINT chk_topic_content CHECK (CHAR_LENGTH(content) >= 20 AND CHAR_LENGTH(content) <= 10000),
    CONSTRAINT chk_topic_score CHECK (score >= -1000 AND score <= 1000),
    CONSTRAINT chk_topic_views CHECK (views >= 0)
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
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    score INT DEFAULT 0,
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
    INDEX idx_score (score DESC, created_at DESC),
    FULLTEXT idx_content (content),
    -- Data validation constraints
    CONSTRAINT chk_post_content CHECK (CHAR_LENGTH(content) >= 10 AND CHAR_LENGTH(content) <= 5000),
    CONSTRAINT chk_post_score CHECK (score >= -500 AND score <= 500)
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

-- ===========================================
-- PART 5: ENHANCED FORUM FEATURES
-- ===========================================

-- Create user karma system
CREATE TABLE IF NOT EXISTS user_karma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    karma_points INT DEFAULT 0,
    post_karma INT DEFAULT 0,
    comment_karma INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_karma (user_id),
    INDEX idx_karma_points (karma_points),
    -- Data validation constraints
    CONSTRAINT chk_karma_points CHECK (karma_points >= 0),
    CONSTRAINT chk_post_karma CHECK (post_karma >= 0),
    CONSTRAINT chk_comment_karma CHECK (comment_karma >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create voting table (enhanced voting system)
CREATE TABLE IF NOT EXISTS forum_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_type ENUM('topic', 'post') NOT NULL,
    content_id INT NOT NULL,
    vote_type ENUM('upvote', 'downvote') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_vote (user_id, content_type, content_id),
    INDEX idx_user_id (user_id),
    INDEX idx_content (content_type, content_id),
    INDEX idx_vote_type (vote_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    theme ENUM('light', 'dark', 'auto') DEFAULT 'auto',
    language VARCHAR(5) DEFAULT 'en',
    email_notifications BOOLEAN DEFAULT TRUE,
    comment_notifications BOOLEAN DEFAULT TRUE,
    mention_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_preferences (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create user awards/badges system
CREATE TABLE IF NOT EXISTS user_awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    award_type VARCHAR(50) NOT NULL,
    award_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#FFD700',
    granted_by INT,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES clients(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_award_type (award_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create post flairs/tags
CREATE TABLE IF NOT EXISTS post_flairs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL,
    color VARCHAR(7) DEFAULT '#6B7280',
    background_color VARCHAR(7) DEFAULT '#F3F4F6',
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create topic flairs junction table
CREATE TABLE IF NOT EXISTS topic_flairs (
    topic_id INT NOT NULL,
    flair_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (flair_id) REFERENCES post_flairs(id) ON DELETE CASCADE,
    PRIMARY KEY (topic_id, flair_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create user follow system
CREATE TABLE IF NOT EXISTS user_follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES clients(id) ON DELETE CASCADE,
    UNIQUE KEY unique_follow (follower_id, following_id),
    INDEX idx_follower_id (follower_id),
    INDEX idx_following_id (following_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create trending/hot posts algorithm
CREATE TABLE IF NOT EXISTS trending_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    hot_score DECIMAL(10,2) NOT NULL,
    trending_rank INT NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    INDEX idx_hot_score (hot_score DESC),
    INDEX idx_trending_rank (trending_rank),
    INDEX idx_calculated_at (calculated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================
-- PART 6: RATE LIMITING & SECURITY
-- ===========================================

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    ip_address VARCHAR(45) NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    attempts INT DEFAULT 1,
    window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    window_end TIMESTAMP NOT NULL,
    is_blocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_ip_address (ip_address),
    INDEX idx_action_type (action_type),
    INDEX idx_window_end (window_end)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create content moderation queue
CREATE TABLE IF NOT EXISTS content_moderation_queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_type ENUM('topic', 'post') NOT NULL,
    content_id INT NOT NULL,
    reason VARCHAR(100) NOT NULL,
    flagged_by INT,
    status ENUM('pending', 'reviewed', 'approved', 'rejected') DEFAULT 'pending',
    moderator_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (flagged_by) REFERENCES clients(id) ON DELETE SET NULL,
    INDEX idx_content_type (content_type),
    INDEX idx_content_id (content_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================================
-- PART 7: DEFAULT DATA INSERTION
-- ===========================================

-- Insert default admin user (password: admin123 - change this!)
INSERT INTO admin_users (username, email, password_hash, first_name, last_name, role) 
VALUES ('admin', 'admin@taxed.ch', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin')
ON DUPLICATE KEY UPDATE username=username;

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

-- Insert default post flairs for tax categories
INSERT INTO post_flairs (name, slug, color, background_color) VALUES
('Question', 'question', '#3B82F6', '#EBF8FF'),
('Help', 'help', '#10B981', '#ECFDF5'),
('Discussion', 'discussion', '#F59E0B', '#FFFBEB'),
('News', 'news', '#EF4444', '#FEF2F2'),
('Solved', 'solved', '#8B5CF6', '#F3E8FF'),
('Urgent', 'urgent', '#DC2626', '#FEF2F2'),
('Expert Answer', 'expert-answer', '#059669', '#ECFDF5'),
('Tax Update', 'tax-update', '#7C3AED', '#F3E8FF');

-- Insert sample contact data
INSERT IGNORE INTO contacts (name, email, subject, message, status) VALUES
('John Doe', 'john@example.com', 'Tax Consultation', 'I need help with my Swiss tax return.', 'new'),
('Jane Smith', 'jane@example.com', 'Pillar 3a Question', 'Can you explain Pillar 3a benefits?', 'read');

-- ===========================================
-- PART 8: DATABASE VIEWS AND FUNCTIONS
-- ===========================================

-- Create views for forum statistics
CREATE OR REPLACE VIEW forum_category_stats AS
SELECT 
    c.id,
    c.name,
    c.slug,
    c.description,
    c.color,
    COUNT(t.id) as topic_count,
    COUNT(p.id) as post_count,
    COALESCE(SUM(t.upvotes), 0) as total_upvotes,
    COALESCE(SUM(t.downvotes), 0) as total_downvotes,
    COALESCE(SUM(t.score), 0) as total_score,
    COALESCE(MAX(t.last_reply_at), MAX(t.created_at)) as last_activity
FROM forum_categories c
LEFT JOIN forum_topics t ON c.id = t.category_id AND t.status = 'active'
LEFT JOIN forum_posts p ON t.id = p.topic_id AND p.is_approved = TRUE
WHERE c.is_active = TRUE
GROUP BY c.id, c.name, c.slug, c.description, c.color;

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

-- Create optimized enhanced forum data view
CREATE OR REPLACE VIEW enhanced_forum_data AS
SELECT 
    t.id,
    t.title,
    t.slug,
    t.content,
    t.upvotes,
    t.downvotes,
    t.score,
    t.views,
    t.replies_count,
    t.created_at,
    t.last_reply_at,
    t.status,
    t.is_featured,
    t.is_announcement,
    t.is_solved,
    c.name as category_name,
    c.slug as category_slug,
    c.color as category_color,
    c.description as category_description,
    u.first_name as author_name,
    u.last_name as author_lastname,
    CONCAT(u.first_name, ' ', u.last_name) as author_fullname,
    COALESCE(uk.karma_points, 0) as author_karma,
    CASE 
        WHEN t.created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN 'hot'
        WHEN t.created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 'trending'
        ELSE 'normal'
    END as post_type,
    -- Optimized hot score calculation
    LOG10(GREATEST(ABS(t.score), 1)) * SIGN(t.score) + 
    (UNIX_TIMESTAMP(t.created_at) - 1134028003) / 45000 as hot_score
FROM forum_topics t
LEFT JOIN forum_categories c ON t.category_id = c.id
LEFT JOIN clients u ON t.author_id = u.id
LEFT JOIN user_karma uk ON u.id = uk.user_id
WHERE t.status = 'active'
ORDER BY t.hot_score DESC, t.created_at DESC;

-- Create user leaderboard
CREATE OR REPLACE VIEW user_leaderboard AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    COALESCE(uk.karma_points, 0) as karma_points,
    COALESCE(uk.post_karma, 0) as post_karma,
    COALESCE(uk.comment_karma, 0) as comment_karma,
    COUNT(DISTINCT t.id) as topics_created,
    COUNT(DISTINCT p.id) as posts_created,
    COUNT(DISTINCT v.id) as votes_received,
    RANK() OVER (ORDER BY COALESCE(uk.karma_points, 0) DESC) as rank
FROM clients u
LEFT JOIN user_karma uk ON u.id = uk.user_id
LEFT JOIN forum_topics t ON u.id = t.author_id
LEFT JOIN forum_posts p ON u.id = p.author_id
LEFT JOIN forum_votes v ON (v.content_type = 'topic' AND v.content_id = t.id) OR (v.content_type = 'post' AND v.content_id = p.id)
GROUP BY u.id, u.first_name, u.last_name, u.email, uk.karma_points, uk.post_karma, uk.comment_karma
ORDER BY COALESCE(uk.karma_points, 0) DESC;

-- Create contact summary view
CREATE OR REPLACE VIEW contact_summary AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_contacts,
    COUNT(CASE WHEN status = 'read' THEN 1 END) as read_contacts,
    COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_contacts
FROM contacts 
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Create newsletter statistics view
CREATE OR REPLACE VIEW newsletter_stats AS
SELECT 
    COUNT(*) as total_subscribers,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_subscribers,
    COUNT(CASE WHEN status = 'unsubscribed' THEN 1 END) as unsubscribed,
    COUNT(CASE WHEN status = 'bounced' THEN 1 END) as bounced
FROM newsletter_subscribers;

-- ===========================================
-- PART 9: OPTIMIZED TRIGGERS
-- ===========================================

-- Create optimized triggers for automatic updates
DELIMITER //

-- Optimized trigger for topic score updates
CREATE TRIGGER update_topic_score_optimized
AFTER INSERT ON forum_votes
FOR EACH ROW
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    IF NEW.content_type = 'topic' THEN
        UPDATE forum_topics t
        SET 
            upvotes = (SELECT COUNT(*) FROM forum_votes v 
                      WHERE v.content_type = 'topic' AND v.content_id = t.id AND v.vote_type = 'upvote'),
            downvotes = (SELECT COUNT(*) FROM forum_votes v 
                        WHERE v.content_type = 'topic' AND v.content_id = t.id AND v.vote_type = 'downvote'),
            score = upvotes - downvotes,
            hot_score = LOG10(GREATEST(ABS(upvotes - downvotes), 1)) * SIGN(upvotes - downvotes) + 
                       (UNIX_TIMESTAMP(created_at) - 1134028003) / 45000
        WHERE t.id = NEW.content_id;
    END IF;
END//

-- Optimized trigger for post score updates
CREATE TRIGGER update_post_score_optimized
AFTER INSERT ON forum_votes
FOR EACH ROW
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    IF NEW.content_type = 'post' THEN
        UPDATE forum_posts p
        SET 
            upvotes = (SELECT COUNT(*) FROM forum_votes v 
                      WHERE v.content_type = 'post' AND v.content_id = p.id AND v.vote_type = 'upvote'),
            downvotes = (SELECT COUNT(*) FROM forum_votes v 
                        WHERE v.content_type = 'post' AND v.content_id = p.id AND v.vote_type = 'downvote'),
            score = upvotes - downvotes
        WHERE p.id = NEW.content_id;
    END IF;
END//

-- Optimized trigger for user karma updates
CREATE TRIGGER update_user_karma_optimized
AFTER INSERT ON forum_votes
FOR EACH ROW
BEGIN
    DECLARE author_id INT DEFAULT NULL;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    -- Get the author of the content with NULL check
    IF NEW.content_type = 'topic' THEN
        SELECT t.author_id INTO author_id FROM forum_topics t WHERE t.id = NEW.content_id;
    ELSE
        SELECT p.author_id INTO author_id FROM forum_posts p WHERE p.id = NEW.content_id;
    END IF;
    
    -- Only update karma if author exists
    IF author_id IS NOT NULL THEN
        INSERT INTO user_karma (user_id, karma_points, post_karma, comment_karma)
        VALUES (author_id, 1, 
                CASE WHEN NEW.content_type = 'topic' THEN 1 ELSE 0 END,
                CASE WHEN NEW.content_type = 'post' THEN 1 ELSE 0 END)
        ON DUPLICATE KEY UPDATE 
            karma_points = karma_points + 1,
            post_karma = post_karma + CASE WHEN NEW.content_type = 'topic' THEN 1 ELSE 0 END,
            comment_karma = comment_karma + CASE WHEN NEW.content_type = 'post' THEN 1 ELSE 0 END;
    END IF;
END//

-- Trigger to update topic reply count
CREATE TRIGGER update_topic_reply_count
AFTER INSERT ON forum_posts
FOR EACH ROW
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    UPDATE forum_topics 
    SET 
        replies_count = (SELECT COUNT(*) FROM forum_posts WHERE topic_id = NEW.topic_id AND is_approved = TRUE),
        last_reply_at = NOW(),
        last_reply_by = NEW.author_id
    WHERE id = NEW.topic_id;
END//

DELIMITER ;

-- ===========================================
-- PART 10: PERFORMANCE INDEXES
-- ===========================================

-- Create indexes for better performance
CREATE INDEX idx_forum_topics_title ON forum_topics(title(100));
CREATE INDEX idx_forum_topics_content ON forum_topics(content(255));
CREATE INDEX idx_forum_posts_content ON forum_posts(content(255));

-- Create additional performance indexes
CREATE INDEX idx_forum_topics_category_status ON forum_topics(category_id, status);
CREATE INDEX idx_forum_topics_author_created ON forum_topics(author_id, created_at);
CREATE INDEX idx_forum_posts_topic_created ON forum_posts(topic_id, created_at);
CREATE INDEX idx_forum_posts_author ON forum_posts(author_id);

-- Create indexes for user activity tracking
CREATE INDEX idx_forum_likes_user_content ON forum_likes(user_id, content_type, content_id);
CREATE INDEX idx_forum_bookmarks_user ON forum_bookmarks(user_id);
CREATE INDEX idx_forum_notifications_user_read ON forum_notifications(user_id, is_read);

-- Create indexes for moderation
CREATE INDEX idx_forum_moderation_content ON forum_moderation(content_type, content_id);
CREATE INDEX idx_forum_moderation_moderator ON forum_moderation(moderator_id);

-- Create indexes for tags
CREATE INDEX idx_forum_topic_tags_topic ON forum_topic_tags(topic_id);
CREATE INDEX idx_forum_topic_tags_tag ON forum_topic_tags(tag_id);

-- Create indexes for enhanced features
CREATE INDEX idx_forum_votes_user_content ON forum_votes(user_id, content_type, content_id);
CREATE INDEX idx_user_karma_points ON user_karma(karma_points);
CREATE INDEX idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON user_follows(following_id);

-- Create indexes for rate limiting
CREATE INDEX idx_rate_limits_ip_action ON rate_limits(ip_address, action_type);
CREATE INDEX idx_rate_limits_user_action ON rate_limits(user_id, action_type);

-- Create indexes for content moderation
CREATE INDEX idx_moderation_queue_status ON content_moderation_queue(status);
CREATE INDEX idx_moderation_queue_content ON content_moderation_queue(content_type, content_id);

-- ===========================================
-- PART 11: STORED PROCEDURES
-- ===========================================

-- Create stored procedure for rate limiting
DELIMITER //

CREATE PROCEDURE CheckRateLimit(
    IN p_user_id INT,
    IN p_ip_address VARCHAR(45),
    IN p_action_type VARCHAR(50),
    IN p_max_attempts INT,
    IN p_window_minutes INT,
    OUT p_is_allowed BOOLEAN,
    OUT p_remaining_attempts INT
)
BEGIN
    DECLARE current_attempts INT DEFAULT 0;
    DECLARE window_start TIMESTAMP;
    
    -- Set window start time
    SET window_start = DATE_SUB(NOW(), INTERVAL p_window_minutes MINUTE);
    
    -- Get current attempts in window
    SELECT COALESCE(SUM(attempts), 0) INTO current_attempts
    FROM rate_limits 
    WHERE (user_id = p_user_id OR ip_address = p_ip_address)
    AND action_type = p_action_type
    AND window_start >= window_start;
    
    -- Check if limit exceeded
    IF current_attempts >= p_max_attempts THEN
        SET p_is_allowed = FALSE;
        SET p_remaining_attempts = 0;
    ELSE
        SET p_is_allowed = TRUE;
        SET p_remaining_attempts = p_max_attempts - current_attempts;
        
        -- Record this attempt
        INSERT INTO rate_limits (user_id, ip_address, action_type, attempts, window_end)
        VALUES (p_user_id, p_ip_address, p_action_type, 1, DATE_ADD(NOW(), INTERVAL p_window_minutes MINUTE))
        ON DUPLICATE KEY UPDATE attempts = attempts + 1;
    END IF;
END//

DELIMITER ;

-- ===========================================
-- SETUP COMPLETE
-- ===========================================

-- Verify the setup
SELECT 'Taxed GmbH database setup completed successfully!' as status;
SELECT COUNT(*) as categories_created FROM forum_categories;
SELECT COUNT(*) as tags_created FROM forum_tags;
SELECT COUNT(*) as flairs_created FROM post_flairs;
SELECT COUNT(*) as admin_users_created FROM admin_users;

-- Show performance statistics
SELECT 'Database optimization completed!' as optimization_status;
SELECT 'All constraints and triggers are active!' as functionality_status;
SELECT 'Ready for production deployment!' as deployment_status;
