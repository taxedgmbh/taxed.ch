<?php

class BlogPost {
    private $db;
    private $table = 'blog_posts';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new blog post
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            title, 
            slug, 
            content, 
            excerpt, 
            author_id, 
            category, 
            tags, 
            featured_image, 
            status, 
            featured, 
            seo_title, 
            seo_description, 
            published_at, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['title'],
            $this->generateSlug($data['title']),
            $data['content'],
            $data['excerpt'] ?? null,
            $data['author_id'],
            $data['category'],
            json_encode($data['tags'] ?? []),
            $data['featured_image'] ?? null,
            $data['status'] ?? 'draft',
            $data['featured'] ?? false,
            $data['seo_title'] ?? null,
            $data['seo_description'] ?? null,
            $data['published_at'] ?? null
        ]);
    }
    
    /**
     * Get blog post by ID
     */
    public function findById($id) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE bp.id = ? AND bp.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post && $post['tags']) {
            $post['tags'] = json_decode($post['tags'], true);
        }
        
        return $post;
    }
    
    /**
     * Get blog post by slug
     */
    public function findBySlug($slug) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE bp.slug = ? AND bp.status = 'published' AND bp.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post && $post['tags']) {
            $post['tags'] = json_decode($post['tags'], true);
        }
        
        return $post;
    }
    
    /**
     * Get all blog posts with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE bp.deleted_at IS NULL";
        $params = [];
        
        // Apply filters
        if (!empty($filters['status'])) {
            $where .= " AND bp.status = ?";
            $params[] = $filters['status'];
        } else {
            $where .= " AND bp.status = 'published'";
        }
        
        if (!empty($filters['category'])) {
            $where .= " AND bp.category = ?";
            $params[] = $filters['category'];
        }
        
        if (!empty($filters['author_id'])) {
            $where .= " AND bp.author_id = ?";
            $params[] = $filters['author_id'];
        }
        
        if (!empty($filters['featured'])) {
            $where .= " AND bp.featured = ?";
            $params[] = $filters['featured'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND (bp.title LIKE ? OR bp.content LIKE ? OR bp.excerpt LIKE ?)";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        if (!empty($filters['tag'])) {
            $where .= " AND JSON_CONTAINS(bp.tags, ?)";
            $params[] = json_encode($filters['tag']);
        }
        
        if (!empty($filters['date_from'])) {
            $where .= " AND DATE(bp.published_at) >= ?";
            $params[] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $where .= " AND DATE(bp.published_at) <= ?";
            $params[] = $filters['date_to'];
        }
        
        $orderBy = "ORDER BY bp.published_at DESC";
        if (!empty($filters['sort'])) {
            switch ($filters['sort']) {
                case 'title_asc':
                    $orderBy = "ORDER BY bp.title ASC";
                    break;
                case 'title_desc':
                    $orderBy = "ORDER BY bp.title DESC";
                    break;
                case 'created_asc':
                    $orderBy = "ORDER BY bp.created_at ASC";
                    break;
                case 'created_desc':
                    $orderBy = "ORDER BY bp.created_at DESC";
                    break;
                case 'featured':
                    $orderBy = "ORDER BY bp.featured DESC, bp.published_at DESC";
                    break;
            }
        }
        
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                {$where} 
                {$orderBy} 
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($posts as &$post) {
            if ($post['tags']) {
                $post['tags'] = json_decode($post['tags'], true);
            }
        }
        
        return $posts;
    }
    
    /**
     * Get featured posts
     */
    public function getFeatured($limit = 6) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE bp.featured = 1 AND bp.status = 'published' AND bp.deleted_at IS NULL 
                ORDER BY bp.published_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($posts as &$post) {
            if ($post['tags']) {
                $post['tags'] = json_decode($post['tags'], true);
            }
        }
        
        return $posts;
    }
    
    /**
     * Get posts by category
     */
    public function getByCategory($category, $limit = 10) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE bp.category = ? AND bp.status = 'published' AND bp.deleted_at IS NULL 
                ORDER BY bp.published_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$category, $limit]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($posts as &$post) {
            if ($post['tags']) {
                $post['tags'] = json_decode($post['tags'], true);
            }
        }
        
        return $posts;
    }
    
    /**
     * Get related posts
     */
    public function getRelated($id, $category, $limit = 4) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE bp.category = ? AND bp.id != ? 
                AND bp.status = 'published' AND bp.deleted_at IS NULL 
                ORDER BY bp.published_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$category, $id, $limit]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($posts as &$post) {
            if ($post['tags']) {
                $post['tags'] = json_decode($post['tags'], true);
            }
        }
        
        return $posts;
    }
    
    /**
     * Update blog post
     */
    public function update($id, $data) {
        $fields = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id' && $key !== 'created_at') {
                if ($key === 'tags' && is_array($value)) {
                    $fields[] = "{$key} = ?";
                    $params[] = json_encode($value);
                } elseif ($key === 'title') {
                    $fields[] = "{$key} = ?";
                    $fields[] = "slug = ?";
                    $params[] = $value;
                    $params[] = $this->generateSlug($value);
                } else {
                    $fields[] = "{$key} = ?";
                    $params[] = $value;
                }
            }
        }
        
        $fields[] = "updated_at = NOW()";
        $params[] = $id;
        
        $sql = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }
    
    /**
     * Soft delete blog post
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET deleted_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Publish blog post
     */
    public function publish($id) {
        $sql = "UPDATE {$this->table} SET 
                status = 'published', 
                published_at = NOW(), 
                updated_at = NOW() 
                WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Unpublish blog post
     */
    public function unpublish($id) {
        $sql = "UPDATE {$this->table} SET 
                status = 'draft', 
                updated_at = NOW() 
                WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Toggle featured status
     */
    public function toggleFeatured($id) {
        $sql = "UPDATE {$this->table} SET featured = NOT featured, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Get blog categories
     */
    public function getCategories() {
        $sql = "SELECT DISTINCT category, COUNT(*) as count 
                FROM {$this->table} 
                WHERE status = 'published' AND deleted_at IS NULL 
                GROUP BY category 
                ORDER BY category";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get all tags
     */
    public function getAllTags() {
        $sql = "SELECT DISTINCT JSON_UNQUOTE(JSON_EXTRACT(tags, CONCAT('$[', idx, ']'))) as tag
                FROM {$this->table}
                CROSS JOIN JSON_TABLE(
                    JSON_ARRAY_LENGTH(tags),
                    '$[*]' COLUMNS (idx FOR ORDINALITY)
                ) AS t
                WHERE status = 'published' AND deleted_at IS NULL
                ORDER BY tag";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    
    /**
     * Search blog posts
     */
    public function search($query, $limit = 10) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE (bp.title LIKE ? OR bp.content LIKE ? OR bp.excerpt LIKE ?) 
                AND bp.status = 'published' AND bp.deleted_at IS NULL 
                ORDER BY bp.published_at DESC 
                LIMIT ?";
        
        $searchTerm = "%{$query}%";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $limit]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($posts as &$post) {
            if ($post['tags']) {
                $post['tags'] = json_decode($post['tags'], true);
            }
        }
        
        return $posts;
    }
    
    /**
     * Get blog statistics
     */
    public function getStats() {
        $sql = "SELECT 
            COUNT(*) as total_posts,
            COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
            COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_posts,
            COUNT(CASE WHEN featured = 1 THEN 1 END) as featured_posts,
            COUNT(DISTINCT category) as total_categories
        FROM {$this->table} 
        WHERE deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get posts by date range
     */
    public function getByDateRange($startDate, $endDate) {
        $sql = "SELECT bp.*, u.first_name, u.last_name, u.email as author_email 
                FROM {$this->table} bp
                LEFT JOIN users u ON bp.author_id = u.id
                WHERE DATE(bp.published_at) BETWEEN ? AND ? 
                AND bp.status = 'published' AND bp.deleted_at IS NULL 
                ORDER BY bp.published_at DESC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$startDate, $endDate]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($posts as &$post) {
            if ($post['tags']) {
                $post['tags'] = json_decode($post['tags'], true);
            }
        }
        
        return $posts;
    }
    
    /**
     * Generate URL slug from title
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
        $sql = "SELECT id FROM {$this->table} WHERE slug = ? AND deleted_at IS NULL";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$slug]);
        return $stmt->fetch() !== false;
    }
}





