<?php
/**
 * Input Validation Utilities
 * Provides consistent validation across API endpoints
 */

class Validator {
    private $errors = [];

    /**
     * Validate required field
     */
    public function required($value, $fieldName) {
        if (empty($value) && $value !== '0' && $value !== 0) {
            $this->errors[] = "{$fieldName} is required";
            return false;
        }
        return true;
    }

    /**
     * Validate string length
     */
    public function length($value, $fieldName, $min = 0, $max = null) {
        $len = strlen($value);
        if ($len < $min) {
            $this->errors[] = "{$fieldName} must be at least {$min} characters";
            return false;
        }
        if ($max !== null && $len > $max) {
            $this->errors[] = "{$fieldName} must be no more than {$max} characters";
            return false;
        }
        return true;
    }

    /**
     * Validate email format
     */
    public function email($value, $fieldName = 'Email') {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->errors[] = "{$fieldName} must be a valid email address";
            return false;
        }
        return true;
    }

    /**
     * Validate integer
     */
    public function integer($value, $fieldName, $min = null, $max = null) {
        if (!is_numeric($value) || intval($value) != $value) {
            $this->errors[] = "{$fieldName} must be an integer";
            return false;
        }
        $intValue = intval($value);
        if ($min !== null && $intValue < $min) {
            $this->errors[] = "{$fieldName} must be at least {$min}";
            return false;
        }
        if ($max !== null && $intValue > $max) {
            $this->errors[] = "{$fieldName} must be no more than {$max}";
            return false;
        }
        return true;
    }

    /**
     * Validate URL
     */
    public function url($value, $fieldName = 'URL') {
        if (!filter_var($value, FILTER_VALIDATE_URL)) {
            $this->errors[] = "{$fieldName} must be a valid URL";
            return false;
        }
        return true;
    }

    /**
     * Validate against allowed values
     */
    public function inArray($value, $allowed, $fieldName) {
        if (!in_array($value, $allowed, true)) {
            $this->errors[] = "{$fieldName} must be one of: " . implode(', ', $allowed);
            return false;
        }
        return true;
    }

    /**
     * Validate alphanumeric (letters, numbers, underscores, hyphens)
     */
    public function alphanumeric($value, $fieldName) {
        if (!preg_match('/^[a-zA-Z0-9_-]+$/', $value)) {
            $this->errors[] = "{$fieldName} must contain only letters, numbers, underscores, and hyphens";
            return false;
        }
        return true;
    }

    /**
     * Sanitize HTML to prevent XSS
     */
    public static function sanitizeHtml($value) {
        return htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    /**
     * Strip all HTML tags
     */
    public static function stripHtml($value) {
        return strip_tags($value);
    }

    /**
     * Sanitize for database (trim and escape)
     */
    public static function sanitize($value) {
        if (is_string($value)) {
            return trim($value);
        }
        return $value;
    }

    /**
     * Check if validation passed
     */
    public function passes() {
        return empty($this->errors);
    }

    /**
     * Check if validation failed
     */
    public function fails() {
        return !empty($this->errors);
    }

    /**
     * Get validation errors
     */
    public function getErrors() {
        return $this->errors;
    }

    /**
     * Get first error
     */
    public function getFirstError() {
        return $this->errors[0] ?? null;
    }

    /**
     * Reset errors
     */
    public function reset() {
        $this->errors = [];
    }

    /**
     * Validate pagination parameters
     */
    public function pagination(&$page, &$limit) {
        $page = max(1, intval($page ?? 1));
        $limit = min(100, max(1, intval($limit ?? 20))); // Max 100 items per page
        return true;
    }

    /**
     * Validate search query
     */
    public function searchQuery($value, $fieldName = 'Search query') {
        if (strlen($value) > 200) {
            $this->errors[] = "{$fieldName} must be no more than 200 characters";
            return false;
        }
        return true;
    }
}

/**
 * Quick validation functions
 */
function validateRequired($value, $fieldName) {
    $v = new Validator();
    return $v->required($value, $fieldName);
}

function sanitizeInput($value) {
    return Validator::sanitize($value);
}

function sanitizeHtml($value) {
    return Validator::sanitizeHtml($value);
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
