<?php

class Order {
    private $db;
    private $table = 'orders';
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    /**
     * Create a new order
     */
    public function create($data) {
        $sql = "INSERT INTO {$this->table} (
            user_id, 
            order_number, 
            status, 
            total_amount, 
            tax_amount, 
            discount_amount, 
            shipping_amount, 
            payment_method, 
            payment_status, 
            billing_address, 
            shipping_address, 
            notes, 
            created_at, 
            updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['user_id'],
            $this->generateOrderNumber(),
            $data['status'] ?? 'pending',
            $data['total_amount'],
            $data['tax_amount'] ?? 0,
            $data['discount_amount'] ?? 0,
            $data['shipping_amount'] ?? 0,
            $data['payment_method'] ?? 'credit_card',
            $data['payment_status'] ?? 'pending',
            json_encode($data['billing_address'] ?? []),
            json_encode($data['shipping_address'] ?? []),
            $data['notes'] ?? null
        ]);
    }
    
    /**
     * Get order by ID
     */
    public function findById($id) {
        $sql = "SELECT o.*, u.first_name, u.last_name, u.email, u.phone 
                FROM {$this->table} o
                LEFT JOIN users u ON o.user_id = u.id
                WHERE o.id = ? AND o.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($order) {
            $order['billing_address'] = json_decode($order['billing_address'], true);
            $order['shipping_address'] = json_decode($order['shipping_address'], true);
        }
        
        return $order;
    }
    
    /**
     * Get order by order number
     */
    public function findByOrderNumber($orderNumber) {
        $sql = "SELECT o.*, u.first_name, u.last_name, u.email, u.phone 
                FROM {$this->table} o
                LEFT JOIN users u ON o.user_id = u.id
                WHERE o.order_number = ? AND o.deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$orderNumber]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($order) {
            $order['billing_address'] = json_decode($order['billing_address'], true);
            $order['shipping_address'] = json_decode($order['shipping_address'], true);
        }
        
        return $order;
    }
    
    /**
     * Get orders by user ID
     */
    public function getByUserId($userId, $page = 1, $limit = 20) {
        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT * FROM {$this->table} 
                WHERE user_id = ? AND deleted_at IS NULL 
                ORDER BY created_at DESC 
                LIMIT ? OFFSET ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId, $limit, $offset]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($orders as &$order) {
            $order['billing_address'] = json_decode($order['billing_address'], true);
            $order['shipping_address'] = json_decode($order['shipping_address'], true);
        }
        
        return $orders;
    }
    
    /**
     * Get all orders with pagination
     */
    public function getAll($page = 1, $limit = 20, $filters = []) {
        $offset = ($page - 1) * $limit;
        $where = "WHERE o.deleted_at IS NULL";
        $params = [];
        
        // Apply filters
        if (!empty($filters['status'])) {
            $where .= " AND o.status = ?";
            $params[] = $filters['status'];
        }
        
        if (!empty($filters['payment_status'])) {
            $where .= " AND o.payment_status = ?";
            $params[] = $filters['payment_status'];
        }
        
        if (!empty($filters['user_id'])) {
            $where .= " AND o.user_id = ?";
            $params[] = $filters['user_id'];
        }
        
        if (!empty($filters['date_from'])) {
            $where .= " AND DATE(o.created_at) >= ?";
            $params[] = $filters['date_from'];
        }
        
        if (!empty($filters['date_to'])) {
            $where .= " AND DATE(o.created_at) <= ?";
            $params[] = $filters['date_to'];
        }
        
        if (!empty($filters['search'])) {
            $where .= " AND (o.order_number LIKE ? OR u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)";
            $searchTerm = "%{$filters['search']}%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        $sql = "SELECT o.*, u.first_name, u.last_name, u.email, u.phone 
                FROM {$this->table} o
                LEFT JOIN users u ON o.user_id = u.id
                {$where} 
                ORDER BY o.created_at DESC 
                LIMIT ? OFFSET ?";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($orders as &$order) {
            $order['billing_address'] = json_decode($order['billing_address'], true);
            $order['shipping_address'] = json_decode($order['shipping_address'], true);
        }
        
        return $orders;
    }
    
    /**
     * Update order
     */
    public function update($id, $data) {
        $fields = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'id' && $key !== 'created_at') {
                if (in_array($key, ['billing_address', 'shipping_address']) && is_array($value)) {
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
     * Update order status
     */
    public function updateStatus($id, $status) {
        $sql = "UPDATE {$this->table} SET status = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$status, $id]);
    }
    
    /**
     * Update payment status
     */
    public function updatePaymentStatus($id, $paymentStatus) {
        $sql = "UPDATE {$this->table} SET payment_status = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$paymentStatus, $id]);
    }
    
    /**
     * Soft delete order
     */
    public function delete($id) {
        $sql = "UPDATE {$this->table} SET deleted_at = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    /**
     * Get order statistics
     */
    public function getStats($userId = null) {
        $where = "WHERE deleted_at IS NULL";
        $params = [];
        
        if ($userId) {
            $where .= " AND user_id = ?";
            $params[] = $userId;
        }
        
        $sql = "SELECT 
            COUNT(*) as total_orders,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
            COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
            COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders,
            COALESCE(SUM(total_amount), 0) as total_revenue,
            COALESCE(AVG(total_amount), 0) as average_order_value,
            COALESCE(SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END), 0) as completed_revenue
        FROM {$this->table} {$where}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get revenue by date range
     */
    public function getRevenueByDateRange($startDate, $endDate) {
        $sql = "SELECT 
            DATE(created_at) as date,
            COUNT(*) as order_count,
            SUM(total_amount) as revenue
        FROM {$this->table} 
        WHERE DATE(created_at) BETWEEN ? AND ? 
        AND status = 'completed' 
        AND deleted_at IS NULL 
        GROUP BY DATE(created_at) 
        ORDER BY date";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$startDate, $endDate]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get orders by status
     */
    public function getByStatus($status, $limit = 20) {
        $sql = "SELECT o.*, u.first_name, u.last_name, u.email 
                FROM {$this->table} o
                LEFT JOIN users u ON o.user_id = u.id
                WHERE o.status = ? AND o.deleted_at IS NULL 
                ORDER BY o.created_at DESC 
                LIMIT ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$status, $limit]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Decode JSON fields
        foreach ($orders as &$order) {
            $order['billing_address'] = json_decode($order['billing_address'], true);
            $order['shipping_address'] = json_decode($order['shipping_address'], true);
        }
        
        return $orders;
    }
    
    /**
     * Generate unique order number
     */
    private function generateOrderNumber() {
        $prefix = 'ORD';
        $date = date('Ymd');
        $random = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        return $prefix . $date . $random;
    }
    
    /**
     * Get order items
     */
    public function getOrderItems($orderId) {
        $sql = "SELECT oi.*, p.name as product_name, p.description as product_description 
                FROM order_items oi
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = ?";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$orderId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Add item to order
     */
    public function addItem($orderId, $productId, $quantity, $price) {
        $sql = "INSERT INTO order_items (order_id, product_id, quantity, price, created_at) 
                VALUES (?, ?, ?, ?, NOW())";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$orderId, $productId, $quantity, $price]);
    }
    
    /**
     * Remove item from order
     */
    public function removeItem($orderId, $productId) {
        $sql = "DELETE FROM order_items WHERE order_id = ? AND product_id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$orderId, $productId]);
    }
    
    /**
     * Update order totals
     */
    public function updateTotals($orderId) {
        $sql = "UPDATE {$this->table} o
                SET total_amount = (
                    SELECT COALESCE(SUM(quantity * price), 0) 
                    FROM order_items 
                    WHERE order_id = ?
                ),
                updated_at = NOW()
                WHERE id = ?";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$orderId, $orderId]);
    }
}






