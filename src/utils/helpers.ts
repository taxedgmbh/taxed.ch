/**
 * Utility functions for common operations
 */

/**
 * Formats a currency value for display
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'CHF')
 * @param locale - The locale for formatting (default: 'de-CH')
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // "CHF 1'234.56"
 * formatCurrency(1234.56, 'EUR', 'en-US') // "€1,234.56"
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'CHF',
  locale: string = 'de-CH'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${currency} ${amount.toFixed(2)}`;
  }
};

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns True if valid, false otherwise
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced function
 * @example
 * const debouncedSearch = debounce(searchFunction, 300);
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Generates a random ID
 * @param length - The length of the ID (default: 8)
 * @returns Random alphanumeric ID
 * @example
 * generateId() // "a1b2c3d4"
 * generateId(12) // "a1b2c3d4e5f6"
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 * @example
 * capitalize('hello world') // "Hello world"
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 * @example
 * truncate('This is a long string', 10) // "This is a ..."
 */
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

/**
 * Sleeps for a specified number of milliseconds
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 * @example
 * await sleep(1000); // Wait 1 second
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Clamps a number between min and max values
 * @param value - The value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-1, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
