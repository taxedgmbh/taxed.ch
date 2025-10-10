<?php

class User {
    private $db;
    private $table = 'users';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new user
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            first_name, 
            last_name, 
            email, 
            phone, 
            company, 
            password_hash, 
            role, 
            status, 
            email_verified, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['first_name'],
            $data['last_name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['company'] ?? null,
            password_hash($data['password'], PASSWORD_DEFAULT),
            $data['role'] ?? 'client',
            $data['status'] ?? 'active',
            $data['email_verified'] ?? false
        ]);
    }
    
    /**
     * Get user by ID
     */
    public function findById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? AND deleted_at IS NULL";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get user by email
     */
    public function findByEmail($email) {
        $sql = "SELECT * FROM {$this->table} WHERE email = ? AND deleted_at IS NULL";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get all users with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE deleted_at IS NULL";
        $params = [];
        
        // Apply filters
        if (!empty($filters['role'])) {
            $where .= " AND role = ?";
            $params[] = $filters['role'];
        }
        
        if (!empty($filters['status'])) {
            $where .= " AND status = ?";
            $params[] = $filters['status'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        $sql = "SELECT * FROM {$this->table} {$where} ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Update user
     */
    public function update($id, $data) {
        $fields = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id' && $key !== 'created_at') {
                $fields[] = "{$key} = ?";
                $params[] = $value;
            }
        }
        
        $fields[] = "updated_at = NOW()";
        $params[] = $id;
        
        $sql = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }
    
    /**
     * Soft delete user
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET deleted_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Verify user password
     */
    public function verifyPassword($email, $password) {
        $user = $this->findByEmail($email);
        if (!$user) {
            return false;
        }
        
        return password_verify($password, $user['password_hash']);
    }
    
    /**
     * Update user password
     */
    public function updatePassword($id, $newPassword) {
        $sql = "UPDATE {$this->table} SET password_hash = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            password_hash($newPassword, PASSWORD_DEFAULT),
            $id
        ]);
    }
    
    /**
     * Update last login
     */
    public function updateLastLogin($id) {
        $sql = "UPDATE {$this->table} SET last_login = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Get user statistics
     */
    public function getStats($id) {
        $sql = "SELECT 
            COUNT(DISTINCT o.id) as total_orders,
            COALESCE(SUM(o.total_amount), 0) as total_spent,
            COUNT(DISTINCT c.id) as total_contacts
        FROM {$this->table} u
        LEFT JOIN orders o ON u.id = o.user_id
        LEFT JOIN contacts c ON u.id = c.user_id
        WHERE u.id = ? AND u.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get users by role
     */
    public function getByRole($role) {
        $sql = "SELECT * FROM {$this->table} WHERE role = ? AND deleted_at IS NULL ORDER BY created_at DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$role]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get user count by status
     */
    public function getCountByStatus() {
        $sql = "SELECT status, COUNT(*) as count FROM {$this->table} WHERE deleted_at IS NULL GROUP BY status";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Search users
     */
    public function search($query, $limit = 10) {
        $sql = "SELECT id, first_name, last_name, email, company, role, status 
                FROM {$this->table} 
                WHERE (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ?) 
                AND deleted_at IS NULL 
                ORDER BY first_name, last_name 
                LIMIT ?";
        
        $searchTerm = "%{$query}%";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $searchTerm, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Check if email exists
     */
    public function emailExists($email, $excludeId = null) {
        $sql = "SELECT id FROM {$this->table} WHERE email = ? AND deleted_at IS NULL";
        $params = [$email];
        
        if ($excludeId) {
            $sql .= " AND id != ?";
            $params[] = $excludeId;
        }
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch() !== false;
    }
    
    /**
     * Get user permissions
     */
    public function getPermissions($id) {
        $user = $this->findById($id);
        if (!$user) {
            return [];
        }
        
        $permissions = [];
        
        switch ($user['role']) {
            case 'admin':
                $permissions = [
                    'users.create', 'users.read', 'users.update', 'users.delete',
                    'orders.create', 'orders.read', 'orders.update', 'orders.delete',
                    'products.create', 'products.read', 'products.update', 'products.delete',
                    'blog.create', 'blog.read', 'blog.update', 'blog.delete',
                    'analytics.read', 'settings.update'
                ];
                break;
            case 'consultant':
                $permissions = [
                    'users.read', 'orders.read', 'orders.update',
                    'products.read', 'blog.read', 'analytics.read'
                ];
                break;
            case 'client':
                $permissions = [
                    'orders.read', 'orders.create',
                    'products.read', 'blog.read'
                ];
                break;
        }
        
        return $permissions;
    }
    
    /**
     * Check if user has permission
     */
    public function hasPermission($id, $permission) {
        $permissions = $this->getPermissions($id);
        return in_array($permission, $permissions);
    }
}





