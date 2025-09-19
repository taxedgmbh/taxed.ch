/**
 * String utility functions
 * Comprehensive string manipulation and processing functions
 */

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes the first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return str;
  return str.split(' ').map(word => capitalize(word)).join(' ');
};

/**
 * Converts a string to camelCase
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

/**
 * Converts a string to PascalCase
 */
export const toPascalCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '');
};

/**
 * Converts a string to kebab-case
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Converts a string to snake_case
 */
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

/**
 * Converts a string to Title Case
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, txt => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Truncates a string to a specified length
 */
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

/**
 * Truncates a string to a specified length at word boundaries
 */
export const truncateWords = (str: string, wordCount: number, suffix: string = '...'): string => {
  const words = str.split(' ');
  if (words.length <= wordCount) return str;
  return words.slice(0, wordCount).join(' ') + suffix;
};

/**
 * Removes HTML tags from a string
 */
export const stripHtml = (str: string): string => {
  return str.replace(/<[^>]*>/g, '');
};

/**
 * Escapes HTML characters
 */
export const escapeHtml = (str: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, char => map[char]);
};

/**
 * Unescapes HTML characters
 */
export const unescapeHtml = (str: string): string => {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, char => map[char]);
};

/**
 * Generates a slug from a string
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Generates initials from a name
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, maxLength);
};

/**
 * Generates a random string
 */
export const generateRandomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generates a UUID v4
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const random = Math.random() * 16 | 0;
    const value = char === 'x' ? random : (random & 0x3 | 0x8);
    return value.toString(16);
  });
};

/**
 * Checks if a string is empty or contains only whitespace
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Checks if a string is a valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if a string is a valid URL
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
 * Extracts domain from URL
 */
export const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

/**
 * Masks sensitive information (e.g., email, phone)
 */
export const maskSensitive = (str: string, type: 'email' | 'phone' | 'credit-card'): string => {
  switch (type) {
    case 'email':
      const [local, domain] = str.split('@');
      return `${local.charAt(0)}***@${domain}`;
    case 'phone':
      return str.replace(/(\d{3})\d{3}(\d{3})/, '$1***$2');
    case 'credit-card':
      return str.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2');
    default:
      return str;
  }
};

/**
 * Converts a string to a color (for avatars, etc.)
 */
export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash).toString(16).slice(0, 6);
  return `#${color.padEnd(6, '0')}`;
};

/**
 * Converts bytes to human readable format
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * Converts a string to a number safely
 */
export const toNumber = (str: string, defaultValue: number = 0): number => {
  const num = parseFloat(str);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Converts a string to a boolean
 */
export const toBoolean = (str: string): boolean => {
  return str.toLowerCase() === 'true' || str === '1';
};

/**
 * Pads a string to a specified length
 */
export const padString = (str: string, length: number, padChar: string = '0'): string => {
  return str.padStart(length, padChar);
};

/**
 * Removes duplicate characters from a string
 */
export const removeDuplicates = (str: string): string => {
  return [...new Set(str.split(''))].join('');
};

/**
 * Counts words in a string
 */
export const countWords = (str: string): number => {
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Counts characters in a string (excluding spaces)
 */
export const countCharacters = (str: string): number => {
  return str.replace(/\s/g, '').length;
};

/**
 * Reverses a string
 */
export const reverse = (str: string): string => {
  return str.split('').reverse().join('');
};

/**
 * Checks if a string is a palindrome
 */
export const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
};
