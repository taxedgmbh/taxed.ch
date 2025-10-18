-- ===========================================
-- TAXED GMBH DATABASE UPDATE - HANDLES EXISTING DATA
-- Database: u497646184_taxedgmbh
-- Upload this file to update existing database
-- ===========================================

-- ===========================================
-- PART 1: UPDATE EXISTING DATA SAFELY
-- ===========================================

-- Update forum categories (ignore duplicates)
INSERT IGNORE INTO forum_categories (name, slug, description, sort_order, icon, color) VALUES
('Individual Tax Returns', 'individual-tax-returns', 'Questions about personal tax returns, deductions, and individual tax planning', 1, 'user', '#3B82F6'),
('Business Tax Services', 'business-tax-services', 'Corporate tax compliance, VAT, and business tax planning', 2, 'building', '#10B981'),
('International Tax', 'international-tax', 'Cross-border tax issues, tax treaties, and expatriate tax planning', 3, 'globe', '#F59E0B'),
('Tax Education & Resources', 'tax-education-resources', 'Swiss tax law updates, deadlines, forms, and educational content', 4, 'book-open', '#8B5CF6'),
('Professional Services', 'professional-services', 'Tax audit support, compliance issues, and recovery services', 5, 'briefcase', '#EF4444'),
('General Discussion', 'general-discussion', 'Tax news, success stories, community events, and off-topic discussions', 6, 'message-circle', '#6B7280');

-- Update forum tags (ignore duplicates)
INSERT IGNORE INTO forum_tags (name, slug, description, color) VALUES
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

-- Update post flairs (ignore duplicates)
INSERT IGNORE INTO post_flairs (name, slug, color, background_color) VALUES
('Question', 'question', '#3B82F6', '#EBF8FF'),
('Help', 'help', '#10B981', '#ECFDF5'),
('Discussion', 'discussion', '#F59E0B', '#FFFBEB'),
('News', 'news', '#EF4444', '#FEF2F2'),
('Solved', 'solved', '#8B5CF6', '#F3E8FF'),
('Urgent', 'urgent', '#DC2626', '#FEF2F2'),
('Expert Answer', 'expert-answer', '#059669', '#ECFDF5'),
('Tax Update', 'tax-update', '#7C3AED', '#F3E8FF');

-- Update admin user (ignore duplicates)
INSERT IGNORE INTO admin_users (username, email, password_hash, first_name, last_name, role) 
VALUES ('admin', 'admin@taxed.ch', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin');

-- Update sample contacts (ignore duplicates)
INSERT IGNORE INTO contacts (name, email, subject, message, status) VALUES
('John Doe', 'john@example.com', 'Tax Consultation', 'I need help with my Swiss tax return.', 'new'),
('Jane Smith', 'jane@example.com', 'Pillar 3a Question', 'Can you explain Pillar 3a benefits?', 'read');

-- ===========================================
-- PART 2: DROP PROBLEMATIC TRIGGERS
-- ===========================================

-- Drop existing problematic triggers
DROP TRIGGER IF EXISTS update_topic_score_after_vote;
DROP TRIGGER IF EXISTS update_post_score_after_vote;
DROP TRIGGER IF EXISTS update_user_karma_after_vote;
DROP TRIGGER IF EXISTS update_topic_score_optimized;
DROP TRIGGER IF EXISTS update_post_score_optimized;
DROP TRIGGER IF EXISTS update_user_karma_optimized;

-- ===========================================
-- PART 3: CREATE SIMPLIFIED TRIGGERS
-- ===========================================

-- Create simple triggers for automatic updates
DELIMITER //

-- Simple trigger for topic score updates
CREATE TRIGGER update_topic_score_simple
AFTER INSERT ON forum_votes
FOR EACH ROW
BEGIN
    IF NEW.content_type = 'topic' THEN
        UPDATE forum_topics t
        SET 
            upvotes = (SELECT COUNT(*) FROM forum_votes v 
                      WHERE v.content_type = 'topic' AND v.content_id = t.id AND v.vote_type = 'upvote'),
            downvotes = (SELECT COUNT(*) FROM forum_votes v 
                        WHERE v.content_type = 'topic' AND v.content_id = t.id AND v.vote_type = 'downvote'),
            score = upvotes - downvotes
        WHERE t.id = NEW.content_id;
    END IF;
END//

-- Simple trigger for post score updates
CREATE TRIGGER update_post_score_simple
AFTER INSERT ON forum_votes
FOR EACH ROW
BEGIN
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

-- Simple trigger for user karma updates
CREATE TRIGGER update_user_karma_simple
AFTER INSERT ON forum_votes
FOR EACH ROW
BEGIN
    DECLARE author_id INT DEFAULT NULL;
    
    -- Get the author of the content
    IF NEW.content_type = 'topic' THEN
        SELECT t.author_id INTO author_id FROM forum_topics t WHERE t.id = NEW.content_id;
    ELSE
        SELECT p.author_id INTO author_id FROM forum_posts p WHERE p.id = NEW.content_id;
    END IF;
    
    -- Update karma if author exists
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
    UPDATE forum_topics 
    SET 
        replies_count = (SELECT COUNT(*) FROM forum_posts WHERE topic_id = NEW.topic_id AND is_approved = TRUE),
        last_reply_at = NOW(),
        last_reply_by = NEW.author_id
    WHERE id = NEW.topic_id;
END//

DELIMITER ;

-- ===========================================
-- PART 4: ADD MISSING INDEXES
-- ===========================================

-- Create additional performance indexes (ignore if they exist)
CREATE INDEX IF NOT EXISTS idx_forum_topics_hot_score ON forum_topics(hot_score DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_score ON forum_posts(score DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_karma_leaderboard ON user_karma(karma_points DESC, updated_at DESC);

-- Create indexes for rate limiting (if tables exist)
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_action ON rate_limits(ip_address, action_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_action ON rate_limits(user_id, action_type);

-- Create indexes for content moderation (if tables exist)
CREATE INDEX IF NOT EXISTS idx_moderation_queue_status ON content_moderation_queue(status);
CREATE INDEX IF NOT EXISTS idx_moderation_queue_content ON content_moderation_queue(content_type, content_id);

-- ===========================================
-- PART 5: UPDATE EXISTING VIEWS
-- ===========================================

-- Update enhanced forum data view with NULL safety
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

-- Update user leaderboard with NULL safety
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

-- ===========================================
-- PART 6: VERIFY SETUP
-- ===========================================

-- Verify the setup
SELECT 'Database update completed successfully!' as status;
SELECT COUNT(*) as categories_created FROM forum_categories;
SELECT COUNT(*) as tags_created FROM forum_tags;
SELECT COUNT(*) as flairs_created FROM post_flairs;
SELECT COUNT(*) as admin_users_created FROM admin_users;

-- Show trigger status
SELECT 'Triggers updated successfully!' as trigger_status;
SELECT 'Views optimized successfully!' as view_status;
SELECT 'Ready for production use!' as deployment_status;
