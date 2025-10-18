<?php

class RateLimitMiddleware {
    private $db;
    private $redis;
    private $useRedis;
    private $defaultLimit;
    private $defaultWindow;
    
    public function __construct($database, $redis = null, $config = []) {
        $this->db = $database;
        $this->redis = $redis;
        $this->useRedis = $redis !== null;
        $this->defaultLimit = $config['default_limit'] ?? 100;
        $this->defaultWindow = $config['default_window'] ?? 3600; // 1 hour
    }
    
    /**
     * Rate limiting middleware
     */
    public function limit($limit = null, $window = null, $keyGenerator = null) {
        return function($request, $response, $next) use ($limit, $window, $keyGenerator) {
            $limit = $limit ?? $this->defaultLimit;
            $window = $window ?? $this->defaultWindow;
            
            $key = $this->generateKey($request, $keyGenerator);
            $current = $this->getCurrentCount($key, $window);
            
            if ($current >= $limit) {
                return $this->rateLimitExceeded($response, $limit, $window);
            }
            
            $this->incrementCount($key, $window);
            
            // Add rate limit headers
            $this->addRateLimitHeaders($limit, $current + 1, $window);
            
            return $next($request, $response);
        };
    }
    
    /**
     * IP-based rate limiting
     */
    public function limitByIp($limit = 100, $window = 3600) {
        return $this->limit($limit, $window, function($request) {
            return 'ip:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        });
    }
    
    /**
     * User-based rate limiting
     */
    public function limitByUser($limit = 200, $window = 3600) {
        return $this->limit($limit, $window, function($request) {
            if (isset($request->user_id)) {
                return 'user:' . $request->user_id;
            }
            return 'ip:' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        });
    }
    
    /**
     * Endpoint-based rate limiting
     */
    public function limitByEndpoint($limit = 50, $window = 3600) {
        return $this->limit($limit, $window, function($request) {
            $endpoint = $request->uri ?? $_SERVER['REQUEST_URI'] ?? '';
            $method = $request->method ?? $_SERVER['REQUEST_METHOD'] ?? '';
            return 'endpoint:' . $method . ':' . $endpoint;
        });
    }
    
    /**
     * Combined rate limiting (IP + User + Endpoint)
     */
    public function limitCombined($limit = 30, $window = 3600) {
        return $this->limit($limit, $window, function($request) {
            $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            $userId = $request->user_id ?? 'anonymous';
            $endpoint = $request->uri ?? $_SERVER['REQUEST_URI'] ?? '';
            $method = $request->method ?? $_SERVER['REQUEST_METHOD'] ?? '';
            
            return 'combined:' . $ip . ':' . $userId . ':' . $method . ':' . $endpoint;
        });
    }
    
    /**
     * Strict rate limiting for sensitive endpoints
     */
    public function strictLimit($limit = 10, $window = 3600) {
        return $this->limit($limit, $window, function($request) {
            $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            $endpoint = $request->uri ?? $_SERVER['REQUEST_URI'] ?? '';
            return 'strict:' . $ip . ':' . $endpoint;
        });
    }
    
    /**
     * Generate rate limit key
     */
    private function generateKey($request, $keyGenerator = null) {
        if ($keyGenerator && is_callable($keyGenerator)) {
            return $keyGenerator($request);
        }
        
        // Default key generation
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        return 'rate_limit:' . md5($ip . $userAgent);
    }
    
    /**
     * Get current count for key
     */
    private function getCurrentCount($key, $window) {
        if ($this->useRedis) {
            return $this->getRedisCount($key, $window);
        } else {
            return $this->getDatabaseCount($key, $window);
        }
    }
    
    /**
     * Get count from Redis
     */
    private function getRedisCount($key, $window) {
        $current = $this->redis->get($key);
        return $current ? (int)$current : 0;
    }
    
    /**
     * Get count from database
     */
    private function getDatabaseCount($key, $window) {
        $sql = "SELECT COUNT(*) as count FROM rate_limits 
                WHERE rate_key = ? AND created_at > DATE_SUB(NOW(), INTERVAL ? SECOND)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$key, $window]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return (int)$result['count'];
    }
    
    /**
     * Increment count for key
     */
    private function incrementCount($key, $window) {
        if ($this->useRedis) {
            $this->incrementRedisCount($key, $window);
        } else {
            $this->incrementDatabaseCount($key);
        }
    }
    
    /**
     * Increment count in Redis
     */
    private function incrementRedisCount($key, $window) {
        $this->redis->multi();
        $this->redis->incr($key);
        $this->redis->expire($key, $window);
        $this->redis->exec();
    }
    
    /**
     * Increment count in database
     */
    private function incrementDatabaseCount($key) {
        $sql = "INSERT INTO rate_limits (rate_key, ip_address, user_agent, created_at) 
                VALUES (?, ?, ?, NOW())";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            $key,
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            $_SERVER['HTTP_USER_AGENT'] ?? ''
        ]);
    }
    
    /**
     * Add rate limit headers
     */
    private function addRateLimitHeaders($limit, $current, $window) {
        header("X-RateLimit-Limit: {$limit}");
        header("X-RateLimit-Remaining: " . max(0, $limit - $current));
        header("X-RateLimit-Reset: " . (time() + $window));
    }
    
    /**
     * Handle rate limit exceeded
     */
    private function rateLimitExceeded($response, $limit, $window) {
        http_response_code(429);
        header("X-RateLimit-Limit: {$limit}");
        header("X-RateLimit-Remaining: 0");
        header("X-RateLimit-Reset: " . (time() + $window));
        header("Retry-After: {$window}");
        
        return json_encode([
            'error' => true,
            'message' => 'Rate limit exceeded',
            'code' => 429,
            'retry_after' => $window
        ]);
    }
    
    /**
     * Clean up old rate limit records
     */
    public function cleanup($olderThanHours = 24) {
        if ($this->useRedis) {
            // Redis handles expiration automatically
            return true;
        }
        
        $sql = "DELETE FROM rate_limits WHERE created_at < DATE_SUB(NOW(), INTERVAL ? HOUR)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$olderThanHours]);
    }
    
    /**
     * Get rate limit status for a key
     */
    public function getStatus($key, $window = null) {
        $window = $window ?? $this->defaultWindow;
        $current = $this->getCurrentCount($key, $window);
        
        return [
            'key' => $key,
            'current' => $current,
            'limit' => $this->defaultLimit,
            'remaining' => max(0, $this->defaultLimit - $current),
            'reset_time' => time() + $window
        ];
    }
    
    /**
     * Reset rate limit for a key
     */
    public function reset($key) {
        if ($this->useRedis) {
            $this->redis->del($key);
        } else {
            $sql = "DELETE FROM rate_limits WHERE rate_key = ?";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$key]);
        }
    }
    
    /**
     * Get rate limit statistics
     */
    public function getStats($hours = 24) {
        if ($this->useRedis) {
            return $this->getRedisStats();
        }
        
        $sql = "SELECT 
            COUNT(*) as total_requests,
            COUNT(DISTINCT rate_key) as unique_keys,
            COUNT(DISTINCT ip_address) as unique_ips,
            AVG(requests_per_hour) as avg_requests_per_hour
        FROM (
            SELECT 
                rate_key, 
                ip_address,
                COUNT(*) as requests_per_hour
            FROM rate_limits 
            WHERE created_at > DATE_SUB(NOW(), INTERVAL ? HOUR)
            GROUP BY rate_key, ip_address, HOUR(created_at)
        ) as stats";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$hours]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get Redis statistics
     */
    private function getRedisStats() {
        $info = $this->redis->info();
        return [
            'total_requests' => $info['keyspace_hits'] ?? 0,
            'unique_keys' => $this->redis->dbsize(),
            'unique_ips' => 'N/A (Redis)',
            'avg_requests_per_hour' => 'N/A (Redis)'
        ];
    }
    
    /**
     * Create rate limit table (for database storage)
     */
    public function createTable() {
        $sql = "CREATE TABLE IF NOT EXISTS rate_limits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            rate_key VARCHAR(255) NOT NULL,
            ip_address VARCHAR(45) NOT NULL,
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_rate_key (rate_key),
            INDEX idx_created_at (created_at),
            INDEX idx_ip_address (ip_address)
        )";
        
        $this->db->exec($sql);
    }
}






