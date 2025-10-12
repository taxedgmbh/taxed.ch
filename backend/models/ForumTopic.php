<?php

class ForumTopic {
    private $db;
    private $table = 'forum_topics';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new forum topic
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            title, 
            slug, 
            content, 
            category_id, 
            author_id, 
            status, 
            is_featured, 
            is_announcement, 
            is_solved, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            $data['title'],
            $this->generateSlug($data['title']),
            $data['content'],
            $data['category_id'],
            $data['author_id'],
            $data['status'] ?? 'active',
            $data['is_featured'] ?? false,
            $data['is_announcement'] ?? false,
            $data['is_solved'] ?? false
        ]);
        
        if ($result) {
            return $this->db->lastInsertId();
        }
        return false;
    }
    
    /**
     * Get topic by ID
     */
    public function findById($id) {
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
                       u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                WHERE t.id = ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get topic by slug
     */
    public function findBySlug($slug) {
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
                       u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                WHERE t.slug = ? AND t.status = 'active'";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get topics by category
     */
    public function getByCategory($categoryId, $page = 1, $limit = 20) {
        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
                       u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                WHERE t.category_id = ? AND t.status = 'active'
                ORDER BY t.is_announcement DESC, t.is_featured DESC, t.last_reply_at DESC, t.created_at DESC
                LIMIT ? OFFSET ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$categoryId, $limit, $offset]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get all topics with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE t.status = 'active'";
        $params = [];
        
        // Apply filters
        if (!empty($filters['category_id'])) {
            $where .= " AND t.category_id = ?";
            $params[] = $filters['category_id'];
        }
        
        if (!empty($filters['author_id'])) {
            $where .= " AND t.author_id = ?";
            $params[] = $filters['author_id'];
        }
        
        if (!empty($filters['is_featured'])) {
            $where .= " AND t.is_featured = ?";
            $params[] = $filters['is_featured'];
        }
        
        if (!empty($filters['is_solved'])) {
            $where .= " AND t.is_solved = ?";
            $params[] = $filters['is_solved'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND (t.title LIKE ? OR t.content LIKE ?)";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
                       u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                {$where}
                ORDER BY t.is_announcement DESC, t.is_featured DESC, t.last_reply_at DESC, t.created_at DESC
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get featured topics
     */
    public function getFeatured($limit = 5) {
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
                       u.first_name, u.last_name, u.email as author_email
                FROM {$this->table} t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                WHERE t.is_featured = 1 AND t.status = 'active'
                ORDER BY t.created_at DESC
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Search topics
     */
    public function search($query, $page = 1, $limit = 20) {
        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT t.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
                       u.first_name, u.last_name, u.email as author_email,
                       MATCH(t.title, t.content) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
                FROM {$this->table} t
                LEFT JOIN forum_categories c ON t.category_id = c.id
                LEFT JOIN clients u ON t.author_id = u.id
                WHERE t.status = 'active' AND (MATCH(t.title, t.content) AGAINST(? IN NATURAL LANGUAGE MODE) 
                       OR t.title LIKE ? OR t.content LIKE ?)
                ORDER BY relevance DESC, t.created_at DESC
                LIMIT ? OFFSET ?";
        
        $searchTerm = "%{$query}%";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$query, $query, $searchTerm, $searchTerm, $limit, $offset]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Update topic
     */
    public function update($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                title = ?, 
                content = ?, 
                status = ?, 
                is_featured = ?, 
                is_announcement = ?, 
                is_solved = ?,
                updated_at = NOW()
                WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['title'],
            $data['content'],
            $data['status'] ?? 'active',
            $data['is_featured'] ?? false,
            $data['is_announcement'] ?? false,
            $data['is_solved'] ?? false,
            $id
        ]);
    }
    
    /**
     * Increment views
     */
    public function incrementViews($id) {
        $sql = "UPDATE {$this->table} SET views = views + 1 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Update last reply
     */
    public function updateLastReply($id, $userId) {
        $sql = "UPDATE {$this->table} SET 
                last_reply_at = NOW(), 
                last_reply_by = ?,
                replies_count = replies_count + 1
                WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$userId, $id]);
    }
    
    /**
     * Delete topic
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET status = 'archived' WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Generate URL slug
     */
    private function generateSlug($title) {
        $slug = strtolower(trim($title));
        $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
        $slug = preg_replace('/-+/', '-', $slug);
        $slug = trim($slug, '-');
        
        // Ensure uniqueness
        $originalSlug = $slug;
        $counter = 1;
        
        while ($this->slugExists($slug)) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        return $slug;
    }
    
    /**
     * Check if slug exists
     */
    private function slugExists($slug) {
        $sql = "SELECT id FROM {$this->table} WHERE slug = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        return $stmt->fetch() !== false;
    }
}
?>
