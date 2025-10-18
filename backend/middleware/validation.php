<?php

class ValidationMiddleware {
    private $rules;
    private $messages;
    
    public function __construct($rules = [], $messages = []) {
        $this->rules = $rules;
        $this->messages = $messages;
    }
    
    /**
     * Validate request data
     */
    public function validate($rules, $messages = []) {
        return function($request, $response, $next) use ($rules, $messages) {
            $data = $this->getRequestData($request);
            $errors = $this->validateData($data, $rules, $messages);
            
            if (!empty($errors)) {
                return $this->validationError($response, $errors);
            }
            
            // Add validated data to request
            $request->validated = $data;
            
            return $next($request, $response);
        };
    }
    
    /**
     * Get request data
     */
    private function getRequestData($request) {
        $data = [];
        
        // Get data from different sources
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $data = $_GET;
        } else {
            // Try to get JSON data first
            $json = json_decode(file_get_contents('php://input'), true);
            if ($json !== null) {
                $data = $json;
            } else {
                $data = $_POST;
            }
        }
        
        return $data;
    }
    
    /**
     * Validate data against rules
     */
    private function validateData($data, $rules, $messages = []) {
        $errors = [];
        
        foreach ($rules as $field => $fieldRules) {
            $value = $data[$field] ?? null;
            $fieldErrors = $this->validateField($field, $value, $fieldRules, $messages);
            
            if (!empty($fieldErrors)) {
                $errors[$field] = $fieldErrors;
            }
        }
        
        return $errors;
    }
    
    /**
     * Validate single field
     */
    private function validateField($field, $value, $rules, $messages = []) {
        $errors = [];
        $rules = is_array($rules) ? $rules : explode('|', $rules);
        
        foreach ($rules as $rule) {
            $ruleParts = explode(':', $rule);
            $ruleName = $ruleParts[0];
            $ruleValue = $ruleParts[1] ?? null;
            
            $error = $this->applyRule($field, $value, $ruleName, $ruleValue);
            
            if ($error) {
                $errors[] = $this->getErrorMessage($field, $ruleName, $error, $messages);
            }
        }
        
        return $errors;
    }
    
    /**
     * Apply validation rule
     */
    private function applyRule($field, $value, $ruleName, $ruleValue) {
        switch ($ruleName) {
            case 'required':
                return $this->validateRequired($value);
                
            case 'email':
                return $this->validateEmail($value);
                
            case 'min':
                return $this->validateMin($value, $ruleValue);
                
            case 'max':
                return $this->validateMax($value, $ruleValue);
                
            case 'numeric':
                return $this->validateNumeric($value);
                
            case 'integer':
                return $this->validateInteger($value);
                
            case 'string':
                return $this->validateString($value);
                
            case 'boolean':
                return $this->validateBoolean($value);
                
            case 'date':
                return $this->validateDate($value);
                
            case 'url':
                return $this->validateUrl($value);
                
            case 'phone':
                return $this->validatePhone($value);
                
            case 'in':
                return $this->validateIn($value, $ruleValue);
                
            case 'not_in':
                return $this->validateNotIn($value, $ruleValue);
                
            case 'regex':
                return $this->validateRegex($value, $ruleValue);
                
            case 'unique':
                return $this->validateUnique($value, $ruleValue);
                
            case 'exists':
                return $this->validateExists($value, $ruleValue);
                
            case 'confirmed':
                return $this->validateConfirmed($value, $field);
                
            case 'same':
                return $this->validateSame($value, $ruleValue);
                
            case 'different':
                return $this->validateDifferent($value, $ruleValue);
                
            case 'alpha':
                return $this->validateAlpha($value);
                
            case 'alpha_num':
                return $this->validateAlphaNum($value);
                
            case 'alpha_dash':
                return $this->validateAlphaDash($value);
                
            case 'json':
                return $this->validateJson($value);
                
            default:
                return null;
        }
    }
    
    /**
     * Validation rules implementation
     */
    private function validateRequired($value) {
        return empty($value) && $value !== 0 && $value !== '0' ? 'required' : null;
    }
    
    private function validateEmail($value) {
        return $value && !filter_var($value, FILTER_VALIDATE_EMAIL) ? 'email' : null;
    }
    
    private function validateMin($value, $min) {
        if (is_numeric($value)) {
            return $value < $min ? 'min.numeric' : null;
        }
        return strlen($value) < $min ? 'min.string' : null;
    }
    
    private function validateMax($value, $max) {
        if (is_numeric($value)) {
            return $value > $max ? 'max.numeric' : null;
        }
        return strlen($value) > $max ? 'max.string' : null;
    }
    
    private function validateNumeric($value) {
        return $value && !is_numeric($value) ? 'numeric' : null;
    }
    
    private function validateInteger($value) {
        return $value && !is_int($value) && !ctype_digit($value) ? 'integer' : null;
    }
    
    private function validateString($value) {
        return $value && !is_string($value) ? 'string' : null;
    }
    
    private function validateBoolean($value) {
        $valid = in_array($value, [true, false, 1, 0, '1', '0', 'true', 'false', 'on', 'off', 'yes', 'no'], true);
        return $value && !$valid ? 'boolean' : null;
    }
    
    private function validateDate($value) {
        return $value && !strtotime($value) ? 'date' : null;
    }
    
    private function validateUrl($value) {
        return $value && !filter_var($value, FILTER_VALIDATE_URL) ? 'url' : null;
    }
    
    private function validatePhone($value) {
        $pattern = '/^[\+]?[1-9][\d]{0,15}$/';
        return $value && !preg_match($pattern, preg_replace('/[\s\-\(\)]/', '', $value)) ? 'phone' : null;
    }
    
    private function validateIn($value, $options) {
        $options = explode(',', $options);
        return $value && !in_array($value, $options) ? 'in' : null;
    }
    
    private function validateNotIn($value, $options) {
        $options = explode(',', $options);
        return $value && in_array($value, $options) ? 'not_in' : null;
    }
    
    private function validateRegex($value, $pattern) {
        return $value && !preg_match($pattern, $value) ? 'regex' : null;
    }
    
    private function validateUnique($value, $table) {
        // This would need database connection
        // For now, return null (no error)
        return null;
    }
    
    private function validateExists($value, $table) {
        // This would need database connection
        // For now, return null (no error)
        return null;
    }
    
    private function validateConfirmed($value, $field) {
        $confirmField = $field . '_confirmation';
        $confirmValue = $_POST[$confirmField] ?? null;
        return $value !== $confirmValue ? 'confirmed' : null;
    }
    
    private function validateSame($value, $otherField) {
        $otherValue = $_POST[$otherField] ?? null;
        return $value !== $otherValue ? 'same' : null;
    }
    
    private function validateDifferent($value, $otherField) {
        $otherValue = $_POST[$otherField] ?? null;
        return $value === $otherValue ? 'different' : null;
    }
    
    private function validateAlpha($value) {
        return $value && !ctype_alpha($value) ? 'alpha' : null;
    }
    
    private function validateAlphaNum($value) {
        return $value && !ctype_alnum($value) ? 'alpha_num' : null;
    }
    
    private function validateAlphaDash($value) {
        return $value && !preg_match('/^[a-zA-Z0-9_-]+$/', $value) ? 'alpha_dash' : null;
    }
    
    private function validateJson($value) {
        return $value && json_decode($value) === null ? 'json' : null;
    }
    
    /**
     * Get error message
     */
    private function getErrorMessage($field, $rule, $error, $messages = []) {
        $key = "{$field}.{$rule}";
        
        if (isset($messages[$key])) {
            return $messages[$key];
        }
        
        if (isset($messages[$field])) {
            return $messages[$field];
        }
        
        // Default messages
        $defaultMessages = [
            'required' => 'The :field field is required.',
            'email' => 'The :field field must be a valid email address.',
            'min.numeric' => 'The :field field must be at least :min.',
            'min.string' => 'The :field field must be at least :min characters.',
            'max.numeric' => 'The :field field must not be greater than :max.',
            'max.string' => 'The :field field must not be greater than :max characters.',
            'numeric' => 'The :field field must be a number.',
            'integer' => 'The :field field must be an integer.',
            'string' => 'The :field field must be a string.',
            'boolean' => 'The :field field must be true or false.',
            'date' => 'The :field field must be a valid date.',
            'url' => 'The :field field must be a valid URL.',
            'phone' => 'The :field field must be a valid phone number.',
            'in' => 'The selected :field is invalid.',
            'not_in' => 'The selected :field is invalid.',
            'regex' => 'The :field field format is invalid.',
            'confirmed' => 'The :field confirmation does not match.',
            'same' => 'The :field and :other must match.',
            'different' => 'The :field and :other must be different.',
            'alpha' => 'The :field field must only contain letters.',
            'alpha_num' => 'The :field field must only contain letters and numbers.',
            'alpha_dash' => 'The :field field must only contain letters, numbers, dashes and underscores.',
            'json' => 'The :field field must be a valid JSON string.'
        ];
        
        $message = $defaultMessages[$rule] ?? 'The :field field is invalid.';
        return str_replace([':field', ':min', ':max'], [$field, $error, $error], $message);
    }
    
    /**
     * Handle validation error
     */
    private function validationError($response, $errors) {
        http_response_code(422);
        return json_encode([
            'error' => true,
            'message' => 'Validation failed',
            'errors' => $errors,
            'code' => 422
        ]);
    }
    
    /**
     * Sanitize input data
     */
    public function sanitize($data) {
        if (is_array($data)) {
            return array_map([$this, 'sanitize'], $data);
        }
        
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Validate file upload
     */
    public function validateFile($file, $rules = []) {
        $errors = [];
        
        if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
            $errors[] = 'File upload failed';
            return $errors;
        }
        
        if (isset($rules['max_size'])) {
            if ($file['size'] > $rules['max_size']) {
                $errors[] = 'File size exceeds maximum allowed size';
            }
        }
        
        if (isset($rules['allowed_types'])) {
            $allowedTypes = is_array($rules['allowed_types']) ? $rules['allowed_types'] : explode(',', $rules['allowed_types']);
            $fileType = mime_content_type($file['tmp_name']);
            
            if (!in_array($fileType, $allowedTypes)) {
                $errors[] = 'File type not allowed';
            }
        }
        
        if (isset($rules['allowed_extensions'])) {
            $allowedExtensions = is_array($rules['allowed_extensions']) ? $rules['allowed_extensions'] : explode(',', $rules['allowed_extensions']);
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            
            if (!in_array($extension, $allowedExtensions)) {
                $errors[] = 'File extension not allowed';
            }
        }
        
        return $errors;
    }
}






