/**
 * Application constants
 * Centralized constants used throughout the application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Application Information
export const APP_INFO = {
  NAME: 'Taxed GmbH',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional tax consulting and bookkeeping services',
  AUTHOR: 'Taxed GmbH',
  WEBSITE: 'https://taxed.ch',
  EMAIL: 'info@taxed.ch',
  PHONE: '+41 44 123 4567',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  TEAM: '/team',
  BLOG: '/blog',
  PRICING: '/pricing',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  CLIENT_PORTAL: '/client-portal',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  GUEST: 'guest',
} as const;

// Permissions
export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin',
} as const;

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  MESSAGE_MIN_LENGTH: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD.MM.YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD.MM.YYYY HH:mm',
  TIME: 'HH:mm',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

// Currency
export const CURRENCY = {
  DEFAULT: 'CHF',
  SYMBOL: 'CHF',
  DECIMAL_PLACES: 2,
  LOCALE: 'de-CH',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'taxed_user',
  TOKEN: 'taxed_token',
  CART: 'taxed_cart',
  PREFERENCES: 'taxed_preferences',
  THEME: 'taxed_theme',
  LANGUAGE: 'taxed_language',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'Invalid file type',
  NETWORK_ERROR: 'Network error. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_SENT: 'Email sent successfully',
  FORM_SUBMITTED: 'Form submitted successfully',
  ITEM_ADDED: 'Item added successfully',
  ITEM_REMOVED: 'Item removed successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  BLOG_ENABLED: true,
  ECOMMERCE_ENABLED: true,
  CLIENT_PORTAL_ENABLED: true,
  ANALYTICS_ENABLED: true,
  DARK_MODE_ENABLED: true,
  MULTI_LANGUAGE_ENABLED: false,
} as const;

// Social Media
export const SOCIAL_MEDIA = {
  LINKEDIN: 'https://linkedin.com/company/taxed-gmbh',
  TWITTER: 'https://twitter.com/taxed_gmbh',
  FACEBOOK: 'https://facebook.com/taxed.gmbh',
  INSTAGRAM: 'https://instagram.com/taxed_gmbh',
} as const;

// Business Hours
export const BUSINESS_HOURS = {
  MONDAY: '09:00-17:00',
  TUESDAY: '09:00-17:00',
  WEDNESDAY: '09:00-17:00',
  THURSDAY: '09:00-17:00',
  FRIDAY: '09:00-17:00',
  SATURDAY: 'Closed',
  SUNDAY: 'Closed',
} as const;
