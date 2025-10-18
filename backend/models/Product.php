<?php

class Product {
    private $db;
    private $table = 'products';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new product
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            name, 
            description, 
            short_description, 
            price, 
            original_price, 
            category, 
            type, 
            duration, 
            features, 
            image_url, 
            status, 
            featured, 
            sort_order, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['name'],
            $data['description'],
            $data['short_description'] ?? null,
            $data['price'],
            $data['original_price'] ?? null,
            $data['category'],
            $data['type'] ?? 'service',
            $data['duration'] ?? null,
            json_encode($data['features'] ?? []),
            $data['image_url'] ?? null,
            $data['status'] ?? 'active',
            $data['featured'] ?? false,
            $data['sort_order'] ?? 0
        ]);
    }
    
    /**
     * Get product by ID
     */
    public function findById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? AND deleted_at IS NULL";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($product && $product['features']) {
            $product['features'] = json_decode($product['features'], true);
        }
        
        return $product;
    }
    
    /**
     * Get all products with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE deleted_at IS NULL";
        $params = [];
        
        // Apply filters
        if (!empty($filters['category'])) {
            $where .= " AND category = ?";
            $params[] = $filters['category'];
        }
        
        if (!empty($filters['type'])) {
            $where .= " AND type = ?";
            $params[] = $filters['type'];
        }
        
        if (!empty($filters['status'])) {
            $where .= " AND status = ?";
            $params[] = $filters['status'];
        }
        
        if (!empty($filters['featured'])) {
            $where .= " AND featured = ?";
            $params[] = $filters['featured'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND (name LIKE ? OR description LIKE ?)";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        if (!empty($filters['min_price'])) {
            $where .= " AND price >= ?";
            $params[] = $filters['min_price'];
        }
        
        if (!empty($filters['max_price'])) {
            $where .= " AND price <= ?";
            $params[] = $filters['max_price'];
        }
        
        $orderBy = "ORDER BY sort_order ASC, created_at DESC";
        if (!empty($filters['sort'])) {
            switch ($filters['sort']) {
                case 'price_asc':
                    $orderBy = "ORDER BY price ASC";
                    break;
                case 'price_desc':
                    $orderBy = "ORDER BY price DESC";
                    break;
                case 'name_asc':
                    $orderBy = "ORDER BY name ASC";
                    break;
                case 'name_desc':
                    $orderBy = "ORDER BY name DESC";
                    break;
                case 'newest':
                    $orderBy = "ORDER BY created_at DESC";
                    break;
                case 'oldest':
                    $orderBy = "ORDER BY created_at ASC";
                    break;
            }
        }
        
        $sql = "SELECT * FROM {$this->table} {$where} {$orderBy} LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($products as &$product) {
            if ($product['features']) {
                $product['features'] = json_decode($product['features'], true);
            }
        }
        
        return $products;
    }
    
    /**
     * Get featured products
     */
    public function getFeatured($limit = 6) {
        $sql = "SELECT * FROM {$this->table} 
                WHERE featured = 1 AND status = 'active' AND deleted_at IS NULL 
                ORDER BY sort_order ASC, created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($products as &$product) {
            if ($product['features']) {
                $product['features'] = json_decode($product['features'], true);
            }
        }
        
        return $products;
    }
    
    /**
     * Get products by category
     */
    public function getByCategory($category, $limit = 10) {
        $sql = "SELECT * FROM {$this->table} 
                WHERE category = ? AND status = 'active' AND deleted_at IS NULL 
                ORDER BY sort_order ASC, created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$category, $limit]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($products as &$product) {
            if ($product['features']) {
                $product['features'] = json_decode($product['features'], true);
            }
        }
        
        return $products;
    }
    
    /**
     * Update product
     */
    public function update($id, $data) {
        $fields = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id' && $key !== 'created_at') {
                if ($key === 'features' && is_array($value)) {
                    $fields[] = "{$key} = ?";
                    $params[] = json_encode($value);
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
     * Soft delete product
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET deleted_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Get product categories
     */
    public function getCategories() {
        $sql = "SELECT DISTINCT category FROM {$this->table} 
                WHERE status = 'active' AND deleted_at IS NULL 
                ORDER BY category";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    
    /**
     * Get product types
     */
    public function getTypes() {
        $sql = "SELECT DISTINCT type FROM {$this->table} 
                WHERE deleted_at IS NULL 
                ORDER BY type";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    
    /**
     * Search products
     */
    public function search($query, $limit = 10) {
        $sql = "SELECT id, name, description, price, category, type, image_url 
                FROM {$this->table} 
                WHERE (name LIKE ? OR description LIKE ? OR category LIKE ?) 
                AND status = 'active' AND deleted_at IS NULL 
                ORDER BY name 
                LIMIT ?";
        
        $searchTerm = "%{$query}%";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get product statistics
     */
    public function getStats() {
        $sql = "SELECT 
            COUNT(*) as total_products,
            COUNT(CASE WHEN status = 'active' THEN 1 END) as active_products,
            COUNT(CASE WHEN featured = 1 THEN 1 END) as featured_products,
            AVG(price) as average_price,
            MIN(price) as min_price,
            MAX(price) as max_price
        FROM {$this->table} 
        WHERE deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get products by price range
     */
    public function getByPriceRange($minPrice, $maxPrice, $limit = 20) {
        $sql = "SELECT * FROM {$this->table} 
                WHERE price >= ? AND price <= ? 
                AND status = 'active' AND deleted_at IS NULL 
                ORDER BY price ASC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$minPrice, $maxPrice, $limit]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($products as &$product) {
            if ($product['features']) {
                $product['features'] = json_decode($product['features'], true);
            }
        }
        
        return $products;
    }
    
    /**
     * Update product status
     */
    public function updateStatus($id, $status) {
        $sql = "UPDATE {$this->table} SET status = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$status, $id]);
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
     * Get related products
     */
    public function getRelated($id, $category, $limit = 4) {
        $sql = "SELECT * FROM {$this->table} 
                WHERE category = ? AND id != ? 
                AND status = 'active' AND deleted_at IS NULL 
                ORDER BY RAND() 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$category, $id, $limit]);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($products as &$product) {
            if ($product['features']) {
                $product['features'] = json_decode($product['features'], true);
            }
        }
        
        return $products;
    }
}






