/**
 * Data formatting utility functions
 * Functions for formatting various data types for display
 */

import { CURRENCY, DATE_FORMATS } from './constants';

/**
 * Formats a currency value for display
 */
export const formatCurrency = (
  amount: number,
  currency: string = CURRENCY.DEFAULT,
  locale: string = CURRENCY.LOCALE
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
 * Formats a number with thousand separators
 */
export const formatNumber = (
  number: number,
  locale: string = 'de-CH',
  options?: Intl.NumberFormatOptions
): string => {
  try {
    return new Intl.NumberFormat(locale, options).format(number);
  } catch (error) {
    console.error('Number formatting error:', error);
    return number.toString();
  }
};

/**
 * Formats a percentage
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1,
  locale: string = 'de-CH'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } catch (error) {
    console.error('Percentage formatting error:', error);
    return `${value.toFixed(decimals)}%`;
  }
};

/**
 * Formats a date for display
 */
export const formatDate = (
  date: string | Date,
  format: string = DATE_FORMATS.DISPLAY,
  locale: string = 'de-CH'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (format === DATE_FORMATS.DISPLAY) {
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(dateObj);
    }
    
    if (format === DATE_FORMATS.DATETIME) {
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    }
    
    if (format === DATE_FORMATS.TIME) {
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    }
    
    return dateObj.toLocaleDateString(locale);
  } catch (error) {
    console.error('Date formatting error:', error);
    return date.toString();
  }
};

/**
 * Formats a relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (
  date: string | Date,
  locale: string = 'de-CH'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return formatDate(date);
  }
};

/**
 * Formats a file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Formats a phone number
 */
export const formatPhoneNumber = (phone: string, country: string = 'CH'): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  if (country === 'CH') {
    // Swiss phone number formatting
    if (cleaned.startsWith('41')) {
      // International format
      return `+41 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    } else if (cleaned.startsWith('0')) {
      // National format
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
  }
  
  return phone;
};

/**
 * Formats a Swiss postal code
 */
export const formatSwissPostalCode = (postalCode: string): string => {
  const cleaned = postalCode.replace(/\D/g, '');
  if (cleaned.length === 4) {
    return cleaned;
  }
  return postalCode;
};

/**
 * Formats a Swiss VAT number
 */
export const formatSwissVAT = (vat: string): string => {
  const cleaned = vat.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `CHE-${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)} MWST`;
  }
  return vat;
};

/**
 * Formats a Swiss IBAN
 */
export const formatSwissIBAN = (iban: string): string => {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  if (cleaned.length === 21 && cleaned.startsWith('CH')) {
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  }
  return iban;
};

/**
 * Formats a credit card number
 */
export const formatCreditCard = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, '');
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Formats a name (capitalizes first letter of each word)
 */
export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats initials from a name
 */
export const formatInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

/**
 * Formats a slug from a string
 */
export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Formats a truncate text
 */
export const formatTruncate = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Formats a list of items
 */
export const formatList = (items: string[], conjunction: string = 'and'): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  
  const lastItem = items.pop();
  return `${items.join(', ')}, ${conjunction} ${lastItem}`;
};
