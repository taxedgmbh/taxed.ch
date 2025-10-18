<?php

class AuthMiddleware {
    private $db;
    private $jwtSecret;
    private $tokenExpiry = 3600; // 1 hour
    
    public function __construct($database, $jwtSecret) {
        $this->db = $database;
        $this->jwtSecret = $jwtSecret;
    }
    
    /**
     * Middleware to check if user is authenticated
     */
    public function requireAuth($request, $response, $next) {
        $token = $this->extractToken($request);
        
        if (!$token) {
            return $this->unauthorized($response, 'No authentication token provided');
        }
        
        $payload = $this->validateToken($token);
        if (!$payload) {
            return $this->unauthorized($response, 'Invalid or expired token');
        }
        
        // Get user from database
        $user = $this->getUserById($payload['user_id']);
        if (!$user) {
            return $this->unauthorized($response, 'User not found');
        }
        
        // Check if user is active
        if ($user['status'] !== 'active') {
            return $this->unauthorized($response, 'User account is inactive');
        }
        
        // Add user to request
        $request->user = $user;
        $request->user_id = $user['id'];
        
        return $next($request, $response);
    }
    
    /**
     * Middleware to check if user has specific role
     */
    public function requireRole($roles) {
        return function($request, $response, $next) use ($roles) {
            if (!isset($request->user)) {
                return $this->unauthorized($response, 'Authentication required');
            }
            
            $userRole = $request->user['role'];
            $allowedRoles = is_array($roles) ? $roles : [$roles];
            
            if (!in_array($userRole, $allowedRoles)) {
                return $this->forbidden($response, 'Insufficient permissions');
            }
            
            return $next($request, $response);
        };
    }
    
    /**
     * Middleware to check if user has specific permission
     */
    public function requirePermission($permission) {
        return function($request, $response, $next) use ($permission) {
            if (!isset($request->user)) {
                return $this->unauthorized($response, 'Authentication required');
            }
            
            if (!$this->hasPermission($request->user['id'], $permission)) {
                return $this->forbidden($response, 'Insufficient permissions');
            }
            
            return $next($request, $response);
        };
    }
    
    /**
     * Optional authentication middleware
     */
    public function optionalAuth($request, $response, $next) {
        $token = $this->extractToken($request);
        
        if ($token) {
            $payload = $this->validateToken($token);
            if ($payload) {
                $user = $this->getUserById($payload['user_id']);
                if ($user && $user['status'] === 'active') {
                    $request->user = $user;
                    $request->user_id = $user['id'];
                }
            }
        }
        
        return $next($request, $response);
    }
    
    /**
     * Generate JWT token
     */
    public function generateToken($userId, $additionalClaims = []) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode(array_merge([
            'user_id' => $userId,
            'iat' => time(),
            'exp' => time() + $this->tokenExpiry
        ], $additionalClaims));
        
        $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        
        $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $this->jwtSecret, true);
        $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return $base64Header . "." . $base64Payload . "." . $base64Signature;
    }
    
    /**
     * Validate JWT token
     */
    public function validateToken($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }
        
        list($base64Header, $base64Payload, $base64Signature) = $parts;
        
        // Verify signature
        $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $this->jwtSecret, true);
        $expectedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        if (!hash_equals($expectedSignature, $base64Signature)) {
            return false;
        }
        
        // Decode payload
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $base64Payload)), true);
        
        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return false;
        }
        
        return $payload;
    }
    
    /**
     * Extract token from request
     */
    private function extractToken($request) {
        $headers = getallheaders();
        
        // Check Authorization header
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
                return $matches[1];
            }
        }
        
        // Check query parameter
        if (isset($_GET['token'])) {
            return $_GET['token'];
        }
        
        // Check cookie
        if (isset($_COOKIE['auth_token'])) {
            return $_COOKIE['auth_token'];
        }
        
        return null;
    }
    
    /**
     * Get user by ID
     */
    private function getUserById($userId) {
        $sql = "SELECT id, first_name, last_name, email, role, status, last_login 
                FROM users 
                WHERE id = ? AND deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Check if user has permission
     */
    private function hasPermission($userId, $permission) {
        $user = $this->getUserById($userId);
        if (!$user) {
            return false;
        }
        
        $permissions = $this->getUserPermissions($user['role']);
        return in_array($permission, $permissions);
    }
    
    /**
     * Get permissions for role
     */
    private function getUserPermissions($role) {
        $permissions = [];
        
        switch ($role) {
            case 'admin':
                $permissions = [
                    'users.create', 'users.read', 'users.update', 'users.delete',
                    'orders.create', 'orders.read', 'orders.update', 'orders.delete',
                    'products.create', 'products.read', 'products.update', 'products.delete',
                    'blog.create', 'blog.read', 'blog.update', 'blog.delete',
                    'contacts.read', 'contacts.update', 'contacts.delete',
                    'analytics.read', 'settings.update'
                ];
                break;
            case 'consultant':
                $permissions = [
                    'users.read', 'orders.read', 'orders.update',
                    'products.read', 'blog.read', 'blog.create', 'blog.update',
                    'contacts.read', 'contacts.update',
                    'analytics.read'
                ];
                break;
            case 'client':
                $permissions = [
                    'orders.read', 'orders.create',
                    'products.read', 'blog.read',
                    'contacts.create'
                ];
                break;
        }
        
        return $permissions;
    }
    
    /**
     * Login user
     */
    public function login($email, $password) {
        $sql = "SELECT id, first_name, last_name, email, password_hash, role, status 
                FROM users 
                WHERE email = ? AND deleted_at IS NULL";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user || !password_verify($password, $user['password_hash'])) {
            return false;
        }
        
        if ($user['status'] !== 'active') {
            return false;
        }
        
        // Update last login
        $this->updateLastLogin($user['id']);
        
        // Remove password from response
        unset($user['password_hash']);
        
        // Generate token
        $token = $this->generateToken($user['id']);
        
        return [
            'user' => $user,
            'token' => $token
        ];
    }
    
    /**
     * Update last login
     */
    private function updateLastLogin($userId) {
        $sql = "UPDATE users SET last_login = NOW() WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$userId]);
    }
    
    /**
     * Logout user (invalidate token)
     */
    public function logout($token) {
        // In a real implementation, you might want to blacklist the token
        // For now, we'll just return success
        return true;
    }
    
    /**
     * Refresh token
     */
    public function refreshToken($token) {
        $payload = $this->validateToken($token);
        if (!$payload) {
            return false;
        }
        
        // Generate new token
        return $this->generateToken($payload['user_id']);
    }
    
    /**
     * Send unauthorized response
     */
    private function unauthorized($response, $message = 'Unauthorized') {
        http_response_code(401);
        return json_encode([
            'error' => true,
            'message' => $message,
            'code' => 401
        ]);
    }
    
    /**
     * Send forbidden response
     */
    private function forbidden($response, $message = 'Forbidden') {
        http_response_code(403);
        return json_encode([
            'error' => true,
            'message' => $message,
            'code' => 403
        ]);
    }
    
    /**
     * Get current user from request
     */
    public function getCurrentUser($request) {
        return $request->user ?? null;
    }
    
    /**
     * Check if user is authenticated
     */
    public function isAuthenticated($request) {
        return isset($request->user);
    }
    
    /**
     * Get user ID from request
     */
    public function getUserId($request) {
        return $request->user_id ?? null;
    }
}






