<?php

class CorsMiddleware {
    private $allowedOrigins;
    private $allowedMethods;
    private $allowedHeaders;
    private $maxAge;
    
    public function __construct($config = []) {
        $this->allowedOrigins = $config['allowed_origins'] ?? ['*'];
        $this->allowedMethods = $config['allowed_methods'] ?? ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
        $this->allowedHeaders = $config['allowed_headers'] ?? ['Content-Type', 'Authorization', 'X-Requested-With'];
        $this->maxAge = $config['max_age'] ?? 86400; // 24 hours
    }
    
    /**
     * CORS middleware handler
     */
    public function handle($request, $response, $next) {
        $origin = $this->getOrigin($request);
        
        // Set CORS headers
        $this->setCorsHeaders($origin);
        
        // Handle preflight requests
        if ($request->method === 'OPTIONS') {
            return $this->handlePreflight($request, $response);
        }
        
        return $next($request, $response);
    }
    
    /**
     * Get origin from request
     */
    private function getOrigin($request) {
        $headers = getallheaders();
        return $headers['Origin'] ?? $headers['origin'] ?? null;
    }
    
    /**
     * Set CORS headers
     */
    private function setCorsHeaders($origin) {
        // Check if origin is allowed
        if ($this->isOriginAllowed($origin)) {
            header("Access-Control-Allow-Origin: " . $origin);
        } elseif (in_array('*', $this->allowedOrigins)) {
            header("Access-Control-Allow-Origin: *");
        }
        
        // Set other CORS headers
        header("Access-Control-Allow-Methods: " . implode(', ', $this->allowedMethods));
        header("Access-Control-Allow-Headers: " . implode(', ', $this->allowedHeaders));
        header("Access-Control-Max-Age: " . $this->maxAge);
        header("Access-Control-Allow-Credentials: true");
        
        // Expose headers that the client can access
        header("Access-Control-Expose-Headers: X-Total-Count, X-Page-Count, X-Current-Page");
    }
    
    /**
     * Check if origin is allowed
     */
    private function isOriginAllowed($origin) {
        if (!$origin) {
            return false;
        }
        
        foreach ($this->allowedOrigins as $allowedOrigin) {
            if ($allowedOrigin === '*' || $allowedOrigin === $origin) {
                return true;
            }
            
            // Support for wildcard subdomains
            if (strpos($allowedOrigin, '*') !== false) {
                $pattern = str_replace('*', '.*', preg_quote($allowedOrigin, '/'));
                if (preg_match('/^' . $pattern . '$/', $origin)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Handle preflight OPTIONS request
     */
    private function handlePreflight($request, $response) {
        http_response_code(200);
        return json_encode([
            'success' => true,
            'message' => 'CORS preflight successful'
        ]);
    }
    
    /**
     * Create CORS middleware with custom configuration
     */
    public static function create($config = []) {
        return new self($config);
    }
    
    /**
     * Default CORS configuration for development
     */
    public static function development() {
        return new self([
            'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
            'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
            'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
            'max_age' => 3600
        ]);
    }
    
    /**
     * Default CORS configuration for production
     */
    public static function production($allowedOrigins = []) {
        return new self([
            'allowed_origins' => $allowedOrigins,
            'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
            'max_age' => 86400
        ]);
    }
    
    /**
     * Restrictive CORS configuration
     */
    public static function restrictive($allowedOrigins = []) {
        return new self([
            'allowed_origins' => $allowedOrigins,
            'allowed_methods' => ['GET', 'POST'],
            'allowed_headers' => ['Content-Type', 'Authorization'],
            'max_age' => 3600
        ]);
    }
    
    /**
     * Add custom CORS headers
     */
    public function addCustomHeaders($headers) {
        foreach ($headers as $name => $value) {
            header("Access-Control-{$name}: {$value}");
        }
    }
    
    /**
     * Handle CORS errors
     */
    public function handleError($message = 'CORS policy violation') {
        http_response_code(403);
        return json_encode([
            'error' => true,
            'message' => $message,
            'code' => 403
        ]);
    }
    
    /**
     * Log CORS violations (for debugging)
     */
    public function logViolation($origin, $method, $headers) {
        $logData = [
            'timestamp' => date('Y-m-d H:i:s'),
            'origin' => $origin,
            'method' => $method,
            'headers' => $headers,
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ];
        
        error_log('CORS Violation: ' . json_encode($logData));
    }
    
    /**
     * Validate request method
     */
    private function isMethodAllowed($method) {
        return in_array(strtoupper($method), $this->allowedMethods);
    }
    
    /**
     * Validate request headers
     */
    private function areHeadersAllowed($requestHeaders) {
        foreach ($requestHeaders as $header) {
            $headerName = explode(':', $header)[0];
            if (!in_array($headerName, $this->allowedHeaders)) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Get CORS configuration
     */
    public function getConfig() {
        return [
            'allowed_origins' => $this->allowedOrigins,
            'allowed_methods' => $this->allowedMethods,
            'allowed_headers' => $this->allowedHeaders,
            'max_age' => $this->maxAge
        ];
    }
    
    /**
     * Update CORS configuration
     */
    public function updateConfig($config) {
        if (isset($config['allowed_origins'])) {
            $this->allowedOrigins = $config['allowed_origins'];
        }
        if (isset($config['allowed_methods'])) {
            $this->allowedMethods = $config['allowed_methods'];
        }
        if (isset($config['allowed_headers'])) {
            $this->allowedHeaders = $config['allowed_headers'];
        }
        if (isset($config['max_age'])) {
            $this->maxAge = $config['max_age'];
        }
    }
}






