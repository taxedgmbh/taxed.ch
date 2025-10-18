-- Forum Sample Data (Fixed for existing database structure)
-- This file adds sample data to make the forum functional and visible

-- First, let's check what tables exist and create sample data accordingly
-- We'll use the forum tables that should exist from the previous schema

-- Insert sample forum topics (using existing category IDs)
INSERT IGNORE INTO forum_topics (id, title, slug, content, author_id, category_id, status, is_featured, is_announcement, created_at, updated_at, last_reply_at, last_reply_by, upvotes, downvotes, score, hot_score) VALUES
(1001, 'How to claim home office expenses in 2024?', 'home-office-expenses-2024', 'I work from home 3 days a week and want to know what expenses I can claim. What are the current rules for home office deductions in Switzerland?', 1, 1, 'published', 1, 0, NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 1 HOUR, 1, 15, 2, 13, 2.5),
(1002, 'VAT registration threshold for small businesses', 'vat-registration-threshold', 'At what point do I need to register for VAT? My business is growing and I want to make sure I comply with all regulations.', 1, 2, 'published', 0, 0, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 30 MINUTE, 1, 8, 1, 7, 1.8),
(1003, 'Tax implications of working remotely from abroad', 'remote-work-tax-implications', 'I am a Swiss resident but work remotely for a US company. How does this affect my tax situation?', 1, 3, 'published', 0, 0, NOW() - INTERVAL 3 HOUR, NOW() - INTERVAL 3 HOUR, NOW() - INTERVAL 2 HOUR, 1, 12, 0, 12, 2.2),
(1004, 'New tax rates for 2024 - what changed?', 'new-tax-rates-2024', 'Can someone explain the key changes in Swiss tax rates for 2024? I want to make sure I understand all the updates.', 1, 4, 'published', 1, 1, NOW() - INTERVAL 4 HOUR, NOW() - INTERVAL 4 HOUR, NOW() - INTERVAL 1 HOUR, 1, 25, 1, 24, 3.1),
(1005, 'Deductions for self-employed consultants', 'self-employed-deductions', 'What business expenses can I deduct as a freelance consultant? Looking for advice on maximizing my deductions.', 1, 1, 'published', 0, 0, NOW() - INTERVAL 5 HOUR, NOW() - INTERVAL 5 HOUR, NOW() - INTERVAL 3 HOUR, 1, 6, 0, 6, 1.5),
(1006, 'Tax treaty benefits for US-Swiss residents', 'us-swiss-tax-treaty', 'I have dual citizenship and want to understand the tax treaty benefits between US and Switzerland.', 1, 3, 'published', 0, 0, NOW() - INTERVAL 6 HOUR, NOW() - INTERVAL 6 HOUR, NOW() - INTERVAL 4 HOUR, 1, 9, 1, 8, 1.9),
(1007, 'Quarterly VAT filing - best practices', 'quarterly-vat-filing', 'Any tips for making quarterly VAT filing easier? I always struggle with the paperwork.', 1, 2, 'published', 0, 0, NOW() - INTERVAL 8 HOUR, NOW() - INTERVAL 8 HOUR, NOW() - INTERVAL 6 HOUR, 1, 4, 0, 4, 1.2),
(1008, 'Tax planning for retirement savings', 'retirement-tax-planning', 'How can I optimize my tax situation for retirement? Looking at 3rd pillar contributions and other strategies.', 1, 1, 'published', 0, 0, NOW() - INTERVAL 12 HOUR, NOW() - INTERVAL 12 HOUR, NOW() - INTERVAL 10 HOUR, 1, 18, 2, 16, 2.8);

-- Insert sample forum posts (replies)
INSERT IGNORE INTO forum_posts (id, content, author_id, topic_id, parent_id, is_solution, is_approved, is_expert_answer, created_at, updated_at, upvotes, downvotes, score) VALUES
(1001, 'For home office expenses, you can claim a fixed amount of CHF 5 per day for up to 50% of your working time. If you work from home more than 50% of the time, you can claim actual costs like rent, utilities, and internet.', 1, 1001, NULL, 1, 1, 1, NOW() - INTERVAL 1 HOUR, NOW() - INTERVAL 1 HOUR, 8, 0, 8),
(1002, 'You also need to keep receipts for any equipment you buy for your home office, like a desk, chair, or computer. These can be deducted as business expenses.', 1, 1001, NULL, 0, 1, 0, NOW() - INTERVAL 45 MINUTE, NOW() - INTERVAL 45 MINUTE, 5, 0, 5),
(1003, 'The VAT registration threshold is CHF 100,000 in annual turnover. Once you exceed this, you must register within 30 days.', 1, 1002, NULL, 1, 1, 1, NOW() - INTERVAL 30 MINUTE, NOW() - INTERVAL 30 MINUTE, 6, 0, 6),
(1004, 'For remote work from abroad, you need to consider the 183-day rule and potential double taxation. The US-Swiss tax treaty helps avoid this.', 1, 1003, NULL, 1, 1, 1, NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 2 HOUR, 10, 0, 10),
(1005, 'The main changes for 2024 include increased standard deductions and new rates for high earners. Check the official tax tables for your canton.', 1, 1004, NULL, 0, 1, 0, NOW() - INTERVAL 1 HOUR, NOW() - INTERVAL 1 HOUR, 12, 0, 12),
(1006, 'As a self-employed consultant, you can deduct office rent, professional development, travel to clients, and business equipment. Keep detailed records!', 1, 1005, NULL, 1, 1, 1, NOW() - INTERVAL 3 HOUR, NOW() - INTERVAL 3 HOUR, 7, 0, 7),
(1007, 'The US-Swiss tax treaty provides relief from double taxation. You can claim foreign tax credits and may be eligible for the foreign earned income exclusion.', 1, 1006, NULL, 1, 1, 1, NOW() - INTERVAL 4 HOUR, NOW() - INTERVAL 4 HOUR, 9, 0, 9),
(1008, 'Use accounting software to track your expenses throughout the quarter. This makes VAT filing much easier and reduces errors.', 1, 1007, NULL, 1, 1, 0, NOW() - INTERVAL 6 HOUR, NOW() - INTERVAL 6 HOUR, 4, 0, 4),
(1009, 'For retirement planning, consider 3rd pillar contributions (up to CHF 7,056 in 2024) and 2nd pillar optimization. Both offer tax advantages.', 1, 1008, NULL, 1, 1, 1, NOW() - INTERVAL 10 HOUR, NOW() - INTERVAL 10 HOUR, 15, 0, 15);

-- Insert sample votes (using user_id = 1 for simplicity)
INSERT IGNORE INTO forum_votes (id, user_id, content_type, content_id, vote_type, created_at) VALUES
(1001, 1, 'topic', 1001, 'upvote', NOW() - INTERVAL 2 DAY),
(1002, 1, 'topic', 1001, 'upvote', NOW() - INTERVAL 1 DAY),
(1003, 1, 'topic', 1001, 'upvote', NOW() - INTERVAL 12 HOUR),
(1004, 1, 'topic', 1001, 'upvote', NOW() - INTERVAL 6 HOUR),
(1005, 1, 'topic', 1002, 'upvote', NOW() - INTERVAL 1 DAY),
(1006, 1, 'topic', 1002, 'upvote', NOW() - INTERVAL 8 HOUR),
(1007, 1, 'topic', 1003, 'upvote', NOW() - INTERVAL 3 HOUR),
(1008, 1, 'topic', 1003, 'upvote', NOW() - INTERVAL 2 HOUR),
(1009, 1, 'post', 1001, 'upvote', NOW() - INTERVAL 1 HOUR),
(1010, 1, 'post', 1001, 'upvote', NOW() - INTERVAL 45 MINUTE),
(1011, 1, 'post', 1003, 'upvote', NOW() - INTERVAL 30 MINUTE),
(1012, 1, 'post', 1004, 'upvote', NOW() - INTERVAL 2 HOUR);

-- Insert sample tags
INSERT IGNORE INTO forum_tags (id, name, slug, description, color, created_at) VALUES
(1001, 'Home Office', 'home-office', 'Questions about home office deductions and expenses', '#3B82F6', NOW()),
(1002, 'VAT', 'vat', 'Value Added Tax related questions', '#10B981', NOW()),
(1003, 'International', 'international', 'Cross-border tax issues', '#F59E0B', NOW()),
(1004, 'Self-Employed', 'self-employed', 'Tax questions for freelancers and consultants', '#8B5CF6', NOW()),
(1005, 'Retirement', 'retirement', 'Tax planning for retirement', '#EF4444', NOW());

-- Link topics to tags
INSERT IGNORE INTO forum_topic_tags (topic_id, tag_id) VALUES
(1001, 1001),
(1002, 1002),
(1003, 1003),
(1004, 1001),
(1005, 1004),
(1006, 1003),
(1007, 1002),
(1008, 1005);

-- Insert sample bookmarks
INSERT IGNORE INTO forum_bookmarks (id, user_id, content_type, content_id, created_at) VALUES
(1001, 1, 'topic', 1001, NOW() - INTERVAL 1 DAY),
(1002, 1, 'topic', 1004, NOW() - INTERVAL 2 DAY),
(1003, 1, 'topic', 1002, NOW() - INTERVAL 1 DAY),
(1004, 1, 'topic', 1003, NOW() - INTERVAL 3 DAY);

-- Insert sample notifications
INSERT IGNORE INTO forum_notifications (id, user_id, type, title, message, is_read, created_at) VALUES
(1001, 1, 'reply', 'New reply to your topic', 'Someone replied to "How to claim home office expenses in 2024?"', 0, NOW() - INTERVAL 1 HOUR),
(1002, 1, 'vote', 'Your post was upvoted', 'Your reply received an upvote', 0, NOW() - INTERVAL 45 MINUTE),
(1003, 1, 'mention', 'You were mentioned', 'You were mentioned in a discussion about VAT', 0, NOW() - INTERVAL 30 MINUTE);

-- Update forum category stats (if the table exists)
UPDATE forum_categories SET 
    topic_count = (SELECT COUNT(*) FROM forum_topics WHERE category_id = forum_categories.id),
    post_count = (SELECT COUNT(*) FROM forum_posts WHERE topic_id IN (SELECT id FROM forum_topics WHERE category_id = forum_categories.id)),
    last_activity = (SELECT MAX(created_at) FROM forum_topics WHERE category_id = forum_categories.id)
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'forum_categories' AND table_schema = DATABASE());
