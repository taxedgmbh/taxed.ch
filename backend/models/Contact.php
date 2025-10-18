<?php

class Contact {
    private $db;
    private $table = 'contacts';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new contact
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            user_id, 
            name, 
            email, 
            phone, 
            company, 
            subject, 
            message, 
            service_interest, 
            status, 
            priority, 
            source, 
            ip_address, 
            user_agent, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['user_id'] ?? null,
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['company'] ?? null,
            $data['subject'],
            $data['message'],
            $data['service_interest'] ?? null,
            $data['status'] ?? 'new',
            $data['priority'] ?? 'medium',
            $data['source'] ?? 'website',
            $data['ip_address'] ?? $_SERVER['REMOTE_ADDR'] ?? null,
            $data['user_agent'] ?? $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
    }
    
    /**
     * Get contact by ID
     */
    public function findById($id) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.id = ? AND c.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get all contacts with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE c.deleted_at IS NULL";
        $params = [];
        
        // Apply filters
        if (!empty($filters['status'])) {
            $where .= " AND c.status = ?";
            $params[] = $filters['status'];
        }
        
        if (!empty($filters['priority'])) {
            $where .= " AND c.priority = ?";
            $params[] = $filters['priority'];
        }
        
        if (!empty($filters['service_interest'])) {
            $where .= " AND c.service_interest = ?";
            $params[] = $filters['service_interest'];
        }
        
        if (!empty($filters['source'])) {
            $where .= " AND c.source = ?";
            $params[] = $filters['source'];
        }
        
        if (!empty($filters['date_from'])) {
            $where .= " AND DATE(c.created_at) >= ?";
            $params[] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $where .= " AND DATE(c.created_at) <= ?";
            $params[] = $filters['date_to'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND (c.name LIKE ? OR c.email LIKE ? OR c.subject LIKE ? OR c.message LIKE ?)";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        $orderBy = "ORDER BY c.created_at DESC";
        if (!empty($filters['sort'])) {
            switch ($filters['sort']) {
                case 'name_asc':
                    $orderBy = "ORDER BY c.name ASC";
                    break;
                case 'name_desc':
                    $orderBy = "ORDER BY c.name DESC";
                    break;
                case 'email_asc':
                    $orderBy = "ORDER BY c.email ASC";
                    break;
                case 'email_desc':
                    $orderBy = "ORDER BY c.email DESC";
                    break;
                case 'priority_asc':
                    $orderBy = "ORDER BY 
                        CASE c.priority 
                            WHEN 'high' THEN 1 
                            WHEN 'medium' THEN 2 
                            WHEN 'low' THEN 3 
                        END ASC";
                    break;
                case 'priority_desc':
                    $orderBy = "ORDER BY 
                        CASE c.priority 
                            WHEN 'high' THEN 1 
                            WHEN 'medium' THEN 2 
                            WHEN 'low' THEN 3 
                        END DESC";
                    break;
            }
        }
        
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                {$where} 
                {$orderBy} 
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get contacts by status
     */
    public function getByStatus($status, $limit = 20) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.status = ? AND c.deleted_at IS NULL 
                ORDER BY c.created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$status, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get contacts by priority
     */
    public function getByPriority($priority, $limit = 20) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.priority = ? AND c.deleted_at IS NULL 
                ORDER BY c.created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$priority, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Update contact
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
     * Update contact status
     */
    public function updateStatus($id, $status) {
        $sql = "UPDATE {$this->table} SET status = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$status, $id]);
    }
    
    /**
     * Update contact priority
     */
    public function updatePriority($id, $priority) {
        $sql = "UPDATE {$this->table} SET priority = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$priority, $id]);
    }
    
    /**
     * Mark as read
     */
    public function markAsRead($id) {
        $sql = "UPDATE {$this->table} SET status = 'read', updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Mark as replied
     */
    public function markAsReplied($id) {
        $sql = "UPDATE {$this->table} SET status = 'replied', updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Soft delete contact
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET deleted_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Get contact statistics
     */
    public function getStats() {
        $sql = "SELECT 
            COUNT(*) as total_contacts,
            COUNT(CASE WHEN status = 'new' THEN 1 END) as new_contacts,
            COUNT(CASE WHEN status = 'read' THEN 1 END) as read_contacts,
            COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_contacts,
            COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_contacts,
            COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority,
            COUNT(CASE WHEN priority = 'medium' THEN 1 END) as medium_priority,
            COUNT(CASE WHEN priority = 'low' THEN 1 END) as low_priority
        FROM {$this->table} 
        WHERE deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get contacts by date range
     */
    public function getByDateRange($startDate, $endDate) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE DATE(c.created_at) BETWEEN ? AND ? 
                AND c.deleted_at IS NULL 
                ORDER BY c.created_at DESC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$startDate, $endDate]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get contacts by service interest
     */
    public function getByServiceInterest($service, $limit = 20) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.service_interest = ? AND c.deleted_at IS NULL 
                ORDER BY c.created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$service, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Search contacts
     */
    public function search($query, $limit = 10) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE (c.name LIKE ? OR c.email LIKE ? OR c.subject LIKE ? OR c.message LIKE ?) 
                AND c.deleted_at IS NULL 
                ORDER BY c.created_at DESC 
                LIMIT ?";
        
        $searchTerm = "%{$query}%";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$searchTerm, $searchTerm, $searchTerm, $searchTerm, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get service interests
     */
    public function getServiceInterests() {
        $sql = "SELECT service_interest, COUNT(*) as count 
                FROM {$this->table} 
                WHERE service_interest IS NOT NULL AND deleted_at IS NULL 
                GROUP BY service_interest 
                ORDER BY count DESC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get contacts by source
     */
    public function getBySource($source, $limit = 20) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.source = ? AND c.deleted_at IS NULL 
                ORDER BY c.created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$source, $limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get recent contacts
     */
    public function getRecent($limit = 10) {
        $sql = "SELECT c.*, u.first_name, u.last_name, u.email as user_email 
                FROM {$this->table} c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.deleted_at IS NULL 
                ORDER BY c.created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get unread contacts count
     */
    public function getUnreadCount() {
        $sql = "SELECT COUNT(*) as count FROM {$this->table} WHERE status = 'new' AND deleted_at IS NULL";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
    
    /**
     * Get high priority contacts count
     */
    public function getHighPriorityCount() {
        $sql = "SELECT COUNT(*) as count FROM {$this->table} WHERE priority = 'high' AND status != 'closed' AND deleted_at IS NULL";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }
    
    /**
     * Add contact note
     */
    public function addNote($id, $note, $userId = null) {
        $sql = "INSERT INTO contact_notes (contact_id, note, user_id, created_at) VALUES (?, ?, ?, NOW())";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id, $note, $userId]);
    }
    
    /**
     * Get contact notes
     */
    public function getNotes($id) {
        $sql = "SELECT cn.*, u.first_name, u.last_name 
                FROM contact_notes cn
                LEFT JOIN users u ON cn.user_id = u.id
                WHERE cn.contact_id = ? 
                ORDER BY cn.created_at DESC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}






