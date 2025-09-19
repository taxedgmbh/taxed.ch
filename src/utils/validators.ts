/**
 * Validation utility functions
 * Comprehensive validation functions for forms and data
 */

import { VALIDATION } from './constants';

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validates a phone number
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validates a password strength
 */
export const isValidPassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates a URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates a Swiss postal code
 */
export const isValidSwissPostalCode = (postalCode: string): boolean => {
  return /^[1-9]\d{3}$/.test(postalCode);
};

/**
 * Validates a file type
 */
export const isValidFileType = (file: File, allowedTypes: string[] = VALIDATION.ALLOWED_FILE_TYPES): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Validates a file size
 */
export const isValidFileSize = (file: File, maxSize: number = VALIDATION.MAX_FILE_SIZE): boolean => {
  return file.size <= maxSize;
};

/**
 * Validates a required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validates minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Validates maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Validates a number range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validates a date
 */
export const isValidDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

/**
 * Validates a future date
 */
export const isFutureDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj > new Date();
};

/**
 * Validates a past date
 */
export const isPastDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
};

/**
 * Validates a Swiss VAT number
 */
export const isValidSwissVAT = (vat: string): boolean => {
  // Swiss VAT format: CHE-123.456.789 MWST
  const swissVATRegex = /^CHE-\d{3}\.\d{3}\.\d{3}\sMWST$/;
  return swissVATRegex.test(vat);
};

/**
 * Validates a credit card number (basic Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validates a Swiss IBAN
 */
export const isValidSwissIBAN = (iban: string): boolean => {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  
  if (!/^CH\d{2}\d{5}[0-9A-Z]{12}$/.test(cleaned)) {
    return false;
  }
  
  // Move first 4 characters to end
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  
  // Replace letters with numbers
  const numeric = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());
  
  // Calculate mod 97
  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + parseInt(numeric[i])) % 97;
  }
  
  return remainder === 1;
};

/**
 * Validates a form field based on rules
 */
export const validateField = (value: any, rules: {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}): string | null => {
  if (rules.required && !isRequired(value)) {
    return 'This field is required';
  }
  
  if (typeof value === 'string') {
    if (rules.minLength && !hasMinLength(value, rules.minLength)) {
      return `Minimum length is ${rules.minLength} characters`;
    }
    
    if (rules.maxLength && !hasMaxLength(value, rules.maxLength)) {
      return `Maximum length is ${rules.maxLength} characters`;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }
  }
  
  if (rules.custom) {
    return rules.custom(value);
  }
  
  return null;
};

/**
 * Validates multiple fields
 */
export const validateFields = (data: Record<string, any>, rules: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const error = validateField(data[field], fieldRules);
    if (error) {
      errors[field] = error;
    }
  }
  
  return errors;
};
