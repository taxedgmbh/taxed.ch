<?php
/**
 * Security Headers Middleware
 * Adds security headers to all API responses
 */

class SecurityMiddleware {
    /**
     * Apply security headers
     */
    public static function apply() {
        // Prevent MIME type sniffing
        header('X-Content-Type-Options: nosniff');

        // Prevent clickjacking
        header('X-Frame-Options: DENY');

        // Enable XSS filter in browsers
        header('X-XSS-Protection: 1; mode=block');

        // Referrer policy - only send origin for cross-origin requests
        header('Referrer-Policy: strict-origin-when-cross-origin');

        // Content Security Policy
        header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; frame-ancestors 'none'; form-action 'self'");

        // Permissions Policy (formerly Feature-Policy)
        header("Permissions-Policy: geolocation=(), microphone=(), camera=()");

        // Cache control for API responses
        header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
    }

    /**
     * Apply HSTS header (only for production HTTPS)
     */
    public static function applyHSTS() {
        if (self::isSecureConnection()) {
            // Strict Transport Security - 1 year
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
    }

    /**
     * Check if connection is secure
     */
    private static function isSecureConnection() {
        return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || ($_SERVER['SERVER_PORT'] ?? 80) == 443
            || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    }

    /**
     * Apply all security headers (recommended for production)
     */
    public static function applyAll() {
        self::apply();
        self::applyHSTS();
    }
}
