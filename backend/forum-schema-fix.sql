-- Forum Schema Fix for MySQL Key Length Limitation
-- Run this SQL to fix the index issues

-- Drop the problematic indexes first
DROP INDEX IF EXISTS idx_forum_topics_search ON forum_topics;
DROP INDEX IF EXISTS idx_forum_posts_search ON forum_posts;

-- Create shorter, more efficient indexes
CREATE INDEX idx_forum_topics_title ON forum_topics(title(100));
CREATE INDEX idx_forum_topics_content ON forum_topics(content(255));
CREATE INDEX idx_forum_posts_content ON forum_posts(content(255));

-- Alternative: Create full-text indexes for better search performance
-- Note: These require MyISAM or InnoDB with innodb_ft_min_token_size = 1
-- Uncomment these if your MySQL supports full-text search on InnoDB

-- ALTER TABLE forum_topics ADD FULLTEXT(title, content);
-- ALTER TABLE forum_posts ADD FULLTEXT(content);

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

-- Verify the indexes were created successfully
SHOW INDEX FROM forum_topics;
SHOW INDEX FROM forum_posts;
