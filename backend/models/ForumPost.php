<?php

class ForumPost {
    private $db;
    private $table = 'forum_posts';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new forum post
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            topic_id, 
            author_id, 
            content, 
            parent_id, 
            is_solution, 
            is_approved, 
            is_expert_answer, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            $data['topic_id'],
            $data['author_id'],
            $data['content'],
            $data['parent_id'] ?? null,
            $data['is_solution'] ?? false,
            $data['is_approved'] ?? true,
            $data['is_expert_answer'] ?? false
        ]);
        
        if ($result) {
            $postId = $this->db->lastInsertId();
            
            // Update topic's last reply
            $this->updateTopicLastReply($data['topic_id'], $data['author_id']);
            
            return $postId;
        }
        return false;
    }
    
    /**
     * Get post by ID
     */
    public function findById($id) {
        $sql = "SELECT p.*, u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} p
                LEFT JOIN clients u ON p.author_id = u.id
                WHERE p.id = ? AND p.is_approved = 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get posts by topic
     */
    public function getByTopic($topicId, $page = 1, $limit = 20) {
        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT p.*, u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} p
                LEFT JOIN clients u ON p.author_id = u.id
                WHERE p.topic_id = ? AND p.is_approved = 1
                ORDER BY p.is_solution DESC, p.created_at ASC
                LIMIT ? OFFSET ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$topicId, $limit, $offset]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get all posts with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE p.is_approved = 1";
        $params = [];
        
        // Apply filters
        if (!empty($filters['topic_id'])) {
            $where .= " AND p.topic_id = ?";
            $params[] = $filters['topic_id'];
        }
        
        if (!empty($filters['author_id'])) {
            $where .= " AND p.author_id = ?";
            $params[] = $filters['author_id'];
        }
        
        if (!empty($filters['is_solution'])) {
            $where .= " AND p.is_solution = ?";
            $params[] = $filters['is_solution'];
        }
        
        if (!empty($filters['is_expert_answer'])) {
            $where .= " AND p.is_expert_answer = ?";
            $params[] = $filters['is_expert_answer'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND p.content LIKE ?";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
        }
        
        $sql = "SELECT p.*, u.first_name, u.last_name, u.email as author_email,
                       t.title as topic_title, t.slug as topic_slug
                FROM {$this->table} p
                LEFT JOIN clients u ON p.author_id = u.id
                LEFT JOIN forum_topics t ON p.topic_id = t.id
                {$where}
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get expert answers
     */
    public function getExpertAnswers($limit = 10) {
        $sql = "SELECT p.*, u.first_name, u.last_name, u.email as author_email,
                       t.title as topic_title, t.slug as topic_slug
                FROM {$this->table} p
                LEFT JOIN clients u ON p.author_id = u.id
                LEFT JOIN forum_topics t ON p.topic_id = t.id
                WHERE p.is_expert_answer = 1 AND p.is_approved = 1
                ORDER BY p.created_at DESC
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get solutions
     */
    public function getSolutions($limit = 10) {
        $sql = "SELECT p.*, u.first_name, u.last_name, u.email as author_email,
                       t.title as topic_title, t.slug as topic_slug
                FROM {$this->table} p
                LEFT JOIN clients u ON p.author_id = u.id
                LEFT JOIN forum_topics t ON p.topic_id = t.id
                WHERE p.is_solution = 1 AND p.is_approved = 1
                ORDER BY p.created_at DESC
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Search posts
     */
    public function search($query, $page = 1, $limit = 20) {
        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT p.*, u.first_name, u.last_name, u.email as author_email,
                       t.title as topic_title, t.slug as topic_slug,
                       MATCH(p.content) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
                FROM {$this->table} p
                LEFT JOIN clients u ON p.author_id = u.id
                LEFT JOIN forum_topics t ON p.topic_id = t.id
                WHERE p.is_approved = 1 AND (MATCH(p.content) AGAINST(? IN NATURAL LANGUAGE MODE) 
                       OR p.content LIKE ?)
                ORDER BY relevance DESC, p.created_at DESC
                LIMIT ? OFFSET ?";
        
        $searchTerm = "%{$query}%";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$query, $query, $searchTerm, $limit, $offset]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Update post
     */
    public function update($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                content = ?, 
                is_solution = ?, 
                is_approved = ?, 
                is_expert_answer = ?,
                updated_at = NOW()
                WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['content'],
            $data['is_solution'] ?? false,
            $data['is_approved'] ?? true,
            $data['is_expert_answer'] ?? false,
            $id
        ]);
    }
    
    /**
     * Mark as solution
     */
    public function markAsSolution($id) {
        // First, unmark any existing solution for this topic
        $sql = "SELECT topic_id FROM {$this->table} WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post) {
            // Unmark existing solutions
            $sql = "UPDATE {$this->table} SET is_solution = 0 WHERE topic_id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$post['topic_id']]);
            
            // Mark this post as solution
            $sql = "UPDATE {$this->table} SET is_solution = 1 WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute([$id]);
            
            // Mark topic as solved
            $sql = "UPDATE forum_topics SET is_solved = 1 WHERE id = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$post['topic_id']]);
            
            return $result;
        }
        
        return false;
    }
    
    /**
     * Like/Unlike post
     */
    public function toggleLike($postId, $userId) {
        // Check if user already liked
        $sql = "SELECT id FROM forum_likes WHERE user_id = ? AND content_type = 'post' AND content_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId, $postId]);
        $existing = $stmt->fetch();
        
        if ($existing) {
            // Unlike
            $sql = "DELETE FROM forum_likes WHERE user_id = ? AND content_type = 'post' AND content_id = ?";
            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute([$userId, $postId]);
            
            if ($result) {
                // Decrement likes count
                $sql = "UPDATE {$this->table} SET likes_count = likes_count - 1 WHERE id = ?";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([$postId]);
            }
            
            return false; // Unliked
        } else {
            // Like
            $sql = "INSERT INTO forum_likes (user_id, content_type, content_id) VALUES (?, 'post', ?)";
            $stmt = $this->db->prepare($sql);
            $result = $stmt->execute([$userId, $postId]);
            
            if ($result) {
                // Increment likes count
                $sql = "UPDATE {$this->table} SET likes_count = likes_count + 1 WHERE id = ?";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([$postId]);
            }
            
            return true; // Liked
        }
    }
    
    /**
     * Delete post
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET is_approved = 0 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Update topic's last reply
     */
    private function updateTopicLastReply($topicId, $userId) {
        $sql = "UPDATE forum_topics SET 
                last_reply_at = NOW(), 
                last_reply_by = ?,
                replies_count = replies_count + 1
                WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$userId, $topicId]);
    }
}
?>
