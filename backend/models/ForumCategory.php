<?php

class ForumCategory {
    private $db;
    private $table = 'forum_categories';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new forum category
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            name, 
            slug, 
            description, 
            parent_id, 
            sort_order, 
            is_active, 
            icon, 
            color, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        $result = $stmt->execute([
            $data['name'],
            $this->generateSlug($data['name']),
            $data['description'],
            $data['parent_id'] ?? null,
            $data['sort_order'] ?? 0,
            $data['is_active'] ?? true,
            $data['icon'] ?? 'folder',
            $data['color'] ?? '#3B82F6'
        ]);
        
        if ($result) {
            return $this->db->lastInsertId();
        }
        return false;
    }
    
    /**
     * Get category by ID
     */
    public function findById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? AND is_active = 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get category by slug
     */
    public function findBySlug($slug) {
        $sql = "SELECT * FROM {$this->table} WHERE slug = ? AND is_active = 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get all categories
     */
    public function getAll($includeInactive = false) {
        $where = $includeInactive ? "" : "WHERE is_active = 1";
        
        $sql = "SELECT c.*, 
                       (SELECT COUNT(*) FROM forum_topics t WHERE t.category_id = c.id AND t.status = 'active') as topic_count,
                       (SELECT COUNT(*) FROM forum_posts p 
                        LEFT JOIN forum_topics t ON p.topic_id = t.id 
                        WHERE t.category_id = c.id AND p.is_approved = 1) as post_count,
                       (SELECT MAX(t.last_reply_at) FROM forum_topics t WHERE t.category_id = c.id) as last_activity
                FROM {$this->table} c
                {$where}
                ORDER BY c.sort_order ASC, c.name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get categories with hierarchy
     */
    public function getHierarchy() {
        $sql = "SELECT c.*, 
                       (SELECT COUNT(*) FROM forum_topics t WHERE t.category_id = c.id AND t.status = 'active') as topic_count,
                       (SELECT COUNT(*) FROM forum_posts p 
                        LEFT JOIN forum_topics t ON p.topic_id = t.id 
                        WHERE t.category_id = c.id AND p.is_approved = 1) as post_count,
                       (SELECT MAX(t.last_reply_at) FROM forum_topics t WHERE t.category_id = c.id) as last_activity
                FROM {$this->table} c
                WHERE c.is_active = 1
                ORDER BY c.sort_order ASC, c.name ASC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Build hierarchy
        $hierarchy = [];
        $children = [];
        
        foreach ($categories as $category) {
            if ($category['parent_id'] === null) {
                $hierarchy[] = $category;
            } else {
                $children[$category['parent_id']][] = $category;
            }
        }
        
        // Add children to parents
        foreach ($hierarchy as &$parent) {
            if (isset($children[$parent['id']])) {
                $parent['children'] = $children[$parent['id']];
            }
        }
        
        return $hierarchy;
    }
    
    /**
     * Get category statistics
     */
    public function getStats($categoryId) {
        $sql = "SELECT 
                    c.name,
                    c.slug,
                    COUNT(DISTINCT t.id) as topic_count,
                    COUNT(DISTINCT p.id) as post_count,
                    COUNT(DISTINCT CASE WHEN t.is_solved = 1 THEN t.id END) as solved_count,
                    COUNT(DISTINCT CASE WHEN t.is_featured = 1 THEN t.id END) as featured_count,
                    MAX(t.last_reply_at) as last_activity,
                    AVG(t.views) as avg_views,
                    AVG(t.replies_count) as avg_replies
                FROM {$this->table} c
                LEFT JOIN forum_topics t ON c.id = t.category_id AND t.status = 'active'
                LEFT JOIN forum_posts p ON t.id = p.topic_id AND p.is_approved = 1
                WHERE c.id = ?
                GROUP BY c.id, c.name, c.slug";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$categoryId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get popular categories
     */
    public function getPopular($limit = 10) {
        $sql = "SELECT c.*, 
                       COUNT(DISTINCT t.id) as topic_count,
                       COUNT(DISTINCT p.id) as post_count,
                       SUM(t.views) as total_views
                FROM {$this->table} c
                LEFT JOIN forum_topics t ON c.id = t.category_id AND t.status = 'active'
                LEFT JOIN forum_posts p ON t.id = p.topic_id AND p.is_approved = 1
                WHERE c.is_active = 1
                GROUP BY c.id, c.name, c.slug, c.description, c.color, c.icon
                ORDER BY total_views DESC, topic_count DESC
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Update category
     */
    public function update($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                name = ?, 
                description = ?, 
                parent_id = ?, 
                sort_order = ?, 
                is_active = ?, 
                icon = ?, 
                color = ?,
                updated_at = NOW()
                WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['name'],
            $data['description'],
            $data['parent_id'] ?? null,
            $data['sort_order'] ?? 0,
            $data['is_active'] ?? true,
            $data['icon'] ?? 'folder',
            $data['color'] ?? '#3B82F6',
            $id
        ]);
    }
    
    /**
     * Delete category
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET is_active = 0 WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Get category topics count
     */
    public function getTopicsCount($categoryId) {
        $sql = "SELECT COUNT(*) as count FROM forum_topics WHERE category_id = ? AND status = 'active'";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$categoryId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
    
    /**
     * Get category posts count
     */
    public function getPostsCount($categoryId) {
        $sql = "SELECT COUNT(*) as count 
                FROM forum_posts p
                LEFT JOIN forum_topics t ON p.topic_id = t.id
                WHERE t.category_id = ? AND p.is_approved = 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$categoryId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
    
    /**
     * Generate URL slug
     */
    private function generateSlug($name) {
        $slug = strtolower(trim($name));
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
