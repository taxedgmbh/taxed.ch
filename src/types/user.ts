/**
 * User-related type definitions
 * Defines types for user management, profiles, and preferences
 */

// User profile
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  nationality?: string;
  language: string;
  timezone: string;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

// User preferences
export interface UserPreferences {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  marketing: MarketingPreferences;
  updatedAt: string;
}

// Notification preferences
export interface NotificationPreferences {
  email: {
    general: boolean;
    security: boolean;
    marketing: boolean;
    updates: boolean;
    reminders: boolean;
  };
  push: {
    general: boolean;
    security: boolean;
    updates: boolean;
    reminders: boolean;
  };
  sms: {
    security: boolean;
    reminders: boolean;
  };
}

// Privacy preferences
export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  allowSearch: boolean;
  dataSharing: boolean;
  analytics: boolean;
}

// Marketing preferences
export interface MarketingPreferences {
  newsletter: boolean;
  promotions: boolean;
  productUpdates: boolean;
  surveys: boolean;
  partnerOffers: boolean;
}

// User address
export interface UserAddress {
  id: string;
  userId: string;
  type: 'billing' | 'shipping' | 'both';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// User activity
export interface UserActivity {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'profile_update' | 'password_change' | 'email_change' | 'address_add' | 'order_placed' | 'review_submitted';
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

// User session
export interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  deviceInfo: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
    userAgent: string;
  };
  location?: {
    country: string;
    city: string;
    ipAddress: string;
  };
  isActive: boolean;
  expiresAt: string;
  lastActivityAt: string;
  createdAt: string;
}

// User subscription
export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  paymentMethod?: string;
  nextBillingDate?: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

// User role and permissions
export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

// User statistics
export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  totalReviews: number;
  averageRating: number;
  wishlistItems: number;
  cartItems: number;
  loginCount: number;
  daysSinceLastLogin: number;
}
