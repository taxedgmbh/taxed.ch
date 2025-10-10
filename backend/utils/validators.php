<?php

/**
 * Validation utility functions for the Taxed GmbH application
 */

/**
 * Validate Swiss VAT number
 */
function validateSwissVAT($vatNumber) {
    // Remove spaces and convert to uppercase
    $vatNumber = strtoupper(str_replace(' ', '', $vatNumber));
    
    // Swiss VAT format: CHE-123.456.789 MWST
    $pattern = '/^CHE-\d{3}\.\d{3}\.\d{3}\sMWST$/';
    
    if (!preg_match($pattern, $vatNumber)) {
        return false;
    }
    
    // Extract the number part
    $number = str_replace(['CHE-', ' MWST', '.'], '', $vatNumber);
    
    // Validate using Swiss VAT algorithm
    return validateSwissVATChecksum($number);
}

/**
 * Validate Swiss VAT checksum
 */
function validateSwissVATChecksum($number) {
    if (strlen($number) !== 9) {
        return false;
    }
    
    $weights = [5, 4, 3, 2, 7, 6, 5, 4];
    $sum = 0;
    
    for ($i = 0; $i < 8; $i++) {
        $sum += intval($number[$i]) * $weights[$i];
    }
    
    $remainder = $sum % 11;
    $checkDigit = $remainder < 2 ? $remainder : 11 - $remainder;
    
    return $checkDigit === intval($number[8]);
}

/**
 * Validate Swiss phone number
 */
function validateSwissPhone($phone) {
    // Remove all non-digit characters except +
    $cleaned = preg_replace('/[^\d+]/', '', $phone);
    
    // Swiss phone patterns
    $patterns = [
        '/^\+41[1-9]\d{8}$/',           // +41 44 123 45 67
        '/^0041[1-9]\d{8}$/',           // 0041 44 123 45 67
        '/^0[1-9]\d{8}$/'               // 044 123 45 67
    ];
    
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $cleaned)) {
            return true;
        }
    }
    
    return false;
}

/**
 * Validate Swiss postal code
 */
function validateSwissPostalCode($postalCode) {
    // Swiss postal codes are 4 digits
    return preg_match('/^\d{4}$/', $postalCode);
}

/**
 * Validate Swiss bank account number (IBAN)
 */
function validateSwissIBAN($iban) {
    // Remove spaces and convert to uppercase
    $iban = strtoupper(str_replace(' ', '', $iban));
    
    // Swiss IBAN format: CH + 2 check digits + 5 bank code + 12 account number
    if (!preg_match('/^CH\d{19}$/', $iban)) {
        return false;
    }
    
    // Validate IBAN checksum
    return validateIBANChecksum($iban);
}

/**
 * Validate IBAN checksum
 */
function validateIBANChecksum($iban) {
    // Move first 4 characters to end
    $rearranged = substr($iban, 4) . substr($iban, 0, 4);
    
    // Replace letters with numbers (A=10, B=11, ..., Z=35)
    $numeric = '';
    for ($i = 0; $i < strlen($rearranged); $i++) {
        $char = $rearranged[$i];
        if (ctype_alpha($char)) {
            $numeric .= (ord($char) - ord('A') + 10);
        } else {
            $numeric .= $char;
        }
    }
    
    // Calculate mod 97
    $remainder = 0;
    for ($i = 0; $i < strlen($numeric); $i++) {
        $remainder = ($remainder * 10 + intval($numeric[$i])) % 97;
    }
    
    return $remainder === 1;
}

/**
 * Validate Swiss social security number (AHV)
 */
function validateSwissAHV($ahvNumber) {
    // Remove spaces and dashes
    $ahvNumber = str_replace([' ', '-'], '', $ahvNumber);
    
    // Swiss AHV format: 756.1234.5678.90
    if (!preg_match('/^756\d{10}$/', $ahvNumber)) {
        return false;
    }
    
    // Validate using Swiss AHV algorithm
    return validateSwissAHVChecksum($ahvNumber);
}

/**
 * Validate Swiss AHV checksum
 */
function validateSwissAHVChecksum($ahvNumber) {
    $number = substr($ahvNumber, 3, 10); // Remove country code 756
    $weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    $sum = 0;
    
    for ($i = 0; $i < 10; $i++) {
        $sum += intval($number[$i]) * $weights[$i];
    }
    
    $remainder = $sum % 11;
    $checkDigit = $remainder < 2 ? $remainder : 11 - $remainder;
    
    return $checkDigit === intval($number[10]);
}

/**
 * Validate email address with additional checks
 */
function validateEmailAdvanced($email) {
    // Basic email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    
    // Check for common typos in domain
    $commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    $domain = substr(strrchr($email, '@'), 1);
    
    foreach ($commonDomains as $correctDomain) {
        if (levenshtein($domain, $correctDomain) === 1) {
            return false; // Likely typo
        }
    }
    
    return true;
}

/**
 * Validate password strength
 */
function validatePasswordStrength($password, $minLength = 8) {
    $errors = [];
    
    if (strlen($password) < $minLength) {
        $errors[] = "Password must be at least {$minLength} characters long";
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = "Password must contain at least one lowercase letter";
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = "Password must contain at least one uppercase letter";
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = "Password must contain at least one number";
    }
    
    if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
        $errors[] = "Password must contain at least one special character";
    }
    
    // Check for common passwords
    $commonPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
    if (in_array(strtolower($password), $commonPasswords)) {
        $errors[] = "Password is too common";
    }
    
    return [
        'valid' => empty($errors),
        'errors' => $errors,
        'score' => calculatePasswordScore($password)
    ];
}

/**
 * Calculate password strength score
 */
function calculatePasswordScore($password) {
    $score = 0;
    
    // Length bonus
    $score += min(strlen($password) * 2, 20);
    
    // Character variety bonus
    if (preg_match('/[a-z]/', $password)) $score += 5;
    if (preg_match('/[A-Z]/', $password)) $score += 5;
    if (preg_match('/[0-9]/', $password)) $score += 5;
    if (preg_match('/[^a-zA-Z0-9]/', $password)) $score += 10;
    
    // Pattern penalties
    if (preg_match('/(.)\1{2,}/', $password)) $score -= 10; // Repeated characters
    if (preg_match('/123|abc|qwe/i', $password)) $score -= 5; // Sequential patterns
    
    return max(0, min(100, $score));
}

/**
 * Validate Swiss business registration number (UID)
 */
function validateSwissUID($uid) {
    // Remove spaces and convert to uppercase
    $uid = strtoupper(str_replace(' ', '', $uid));
    
    // Swiss UID format: CHE-123.456.789
    if (!preg_match('/^CHE-\d{3}\.\d{3}\.\d{3}$/', $uid)) {
        return false;
    }
    
    // Extract the number part
    $number = str_replace(['CHE-', '.'], '', $uid);
    
    // Validate using Swiss UID algorithm
    return validateSwissUIDChecksum($number);
}

/**
 * Validate Swiss UID checksum
 */
function validateSwissUIDChecksum($number) {
    if (strlen($number) !== 9) {
        return false;
    }
    
    $weights = [5, 4, 3, 2, 7, 6, 5, 4];
    $sum = 0;
    
    for ($i = 0; $i < 8; $i++) {
        $sum += intval($number[$i]) * $weights[$i];
    }
    
    $remainder = $sum % 11;
    $checkDigit = $remainder < 2 ? $remainder : 11 - $remainder;
    
    return $checkDigit === intval($number[8]);
}

/**
 * Validate date range
 */
function validateDateRange($startDate, $endDate) {
    $start = strtotime($startDate);
    $end = strtotime($endDate);
    
    if (!$start || !$end) {
        return false;
    }
    
    return $start <= $end;
}

/**
 * Validate Swiss tax year
 */
function validateSwissTaxYear($year) {
    $currentYear = date('Y');
    return is_numeric($year) && $year >= 2000 && $year <= $currentYear;
}

/**
 * Validate file upload
 */
function validateFileUpload($file, $options = []) {
    $errors = [];
    
    // Check if file was uploaded
    if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
        $errors[] = 'No file uploaded or upload error occurred';
        return $errors;
    }
    
    // Check file size
    $maxSize = $options['max_size'] ?? 5 * 1024 * 1024; // 5MB default
    if ($file['size'] > $maxSize) {
        $errors[] = 'File size exceeds maximum allowed size';
    }
    
    // Check file type
    if (isset($options['allowed_types'])) {
        $allowedTypes = is_array($options['allowed_types']) ? $options['allowed_types'] : explode(',', $options['allowed_types']);
        $fileType = mime_content_type($file['tmp_name']);
        
        if (!in_array($fileType, $allowedTypes)) {
            $errors[] = 'File type not allowed';
        }
    }
    
    // Check file extension
    if (isset($options['allowed_extensions'])) {
        $allowedExtensions = is_array($options['allowed_extensions']) ? $options['allowed_extensions'] : explode(',', $options['allowed_extensions']);
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        if (!in_array($extension, $allowedExtensions)) {
            $errors[] = 'File extension not allowed';
        }
    }
    
    // Check for malicious files
    if (isset($options['check_malicious']) && $options['check_malicious']) {
        if (isMaliciousFile($file['tmp_name'])) {
            $errors[] = 'File appears to be malicious';
        }
    }
    
    return $errors;
}

/**
 * Check if file is potentially malicious
 */
function isMaliciousFile($filePath) {
    $content = file_get_contents($filePath, false, null, 0, 1024); // Read first 1KB
    
    // Check for executable signatures
    $executableSignatures = [
        'MZ', // Windows executable
        '#!/', // Shell script
        '<?php', // PHP script
        '<script', // JavaScript
        'eval(', // JavaScript eval
        'exec(', // Command execution
    ];
    
    foreach ($executableSignatures as $signature) {
        if (strpos($content, $signature) !== false) {
            return true;
        }
    }
    
    return false;
}

/**
 * Validate Swiss address
 */
function validateSwissAddress($address) {
    $errors = [];
    
    // Check if address contains required elements
    if (empty($address['street'])) {
        $errors[] = 'Street address is required';
    }
    
    if (empty($address['city'])) {
        $errors[] = 'City is required';
    }
    
    if (empty($address['postal_code'])) {
        $errors[] = 'Postal code is required';
    } elseif (!validateSwissPostalCode($address['postal_code'])) {
        $errors[] = 'Invalid Swiss postal code';
    }
    
    if (empty($address['country']) || $address['country'] !== 'CH') {
        $errors[] = 'Country must be Switzerland (CH)';
    }
    
    return [
        'valid' => empty($errors),
        'errors' => $errors
    ];
}

/**
 * Validate business hours
 */
function validateBusinessHours($hours) {
    $errors = [];
    $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    foreach ($days as $day) {
        if (isset($hours[$day])) {
            $dayHours = $hours[$day];
            
            if (isset($dayHours['open']) && isset($dayHours['close'])) {
                $open = strtotime($dayHours['open']);
                $close = strtotime($dayHours['close']);
                
                if (!$open || !$close) {
                    $errors[] = "Invalid time format for {$day}";
                } elseif ($open >= $close) {
                    $errors[] = "Opening time must be before closing time for {$day}";
                }
            }
        }
    }
    
    return [
        'valid' => empty($errors),
        'errors' => $errors
    ];
}





