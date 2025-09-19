/**
 * Analytics Service
 * Handles analytics tracking, events, and reporting
 */

import { apiService } from './api';

// Analytics event types
export type AnalyticsEventType = 
  | 'page_view' 
  | 'user_action' 
  | 'ecommerce_purchase' 
  | 'ecommerce_add_to_cart' 
  | 'ecommerce_remove_from_cart'
  | 'ecommerce_checkout'
  | 'ecommerce_payment'
  | 'blog_view'
  | 'blog_comment'
  | 'blog_like'
  | 'contact_form'
  | 'newsletter_signup'
  | 'download'
  | 'search'
  | 'error'
  | 'custom';

// Analytics event interface
export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  name: string;
  properties: Record<string, any>;
  userId?: string;
  sessionId: string;
  timestamp: string;
  page?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
}

// Analytics session interface
export interface AnalyticsSession {
  id: string;
  userId?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  pageViews: number;
  events: number;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
  };
  isActive: boolean;
}

// Analytics page view interface
export interface AnalyticsPageView {
  id: string;
  sessionId: string;
  userId?: string;
  page: string;
  title: string;
  referrer?: string;
  timestamp: string;
  duration?: number;
  scrollDepth?: number;
  exitPage?: boolean;
  entryPage?: boolean;
}

// Analytics user interface
export interface AnalyticsUser {
  id: string;
  userId?: string;
  email?: string;
  name?: string;
  properties: Record<string, any>;
  firstSeen: string;
  lastSeen: string;
  totalSessions: number;
  totalEvents: number;
  totalPageViews: number;
  isActive: boolean;
}

// Analytics report interface
export interface AnalyticsReport {
  period: string;
  startDate: string;
  endDate: string;
  metrics: {
    totalUsers: number;
    totalSessions: number;
    totalPageViews: number;
    totalEvents: number;
    averageSessionDuration: number;
    bounceRate: number;
    conversionRate: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    uniqueViews: number;
  }>;
  topEvents: Array<{
    event: string;
    count: number;
  }>;
  topReferrers: Array<{
    referrer: string;
    count: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  countryBreakdown: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
}

// Analytics goal interface
export interface AnalyticsGoal {
  id: string;
  name: string;
  description?: string;
  type: 'page_view' | 'event' | 'ecommerce' | 'custom';
  target: string;
  value?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Analytics conversion interface
export interface AnalyticsConversion {
  id: string;
  goalId: string;
  sessionId: string;
  userId?: string;
  value?: number;
  timestamp: string;
  properties?: Record<string, any>;
}

class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private isInitialized: boolean = false;
  private eventQueue: AnalyticsEvent[] = [];
  private flushInterval: number = 5000; // 5 seconds
  private flushTimer?: NodeJS.Timeout;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  /**
   * Initialize analytics service
   */
  private initialize(): void {
    if (typeof window !== 'undefined') {
      this.isInitialized = true;
      this.startFlushTimer();
      this.trackPageView();
      
      // Track page visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.trackEvent('page_view', 'page_visible');
        } else {
          this.trackEvent('page_view', 'page_hidden');
        }
      });

      // Track beforeunload
      window.addEventListener('beforeunload', () => {
        this.flushEvents();
      });
    }
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Start flush timer
   */
  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flushEvents();
    }, this.flushInterval);
  }

  /**
   * Stop flush timer
   */
  private stopFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined;
    }
  }

  /**
   * Set user ID
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Clear user ID
   */
  public clearUserId(): void {
    this.userId = undefined;
  }

  /**
   * Track page view
   */
  public trackPageView(page?: string, title?: string): void {
    if (!this.isInitialized) return;

    const pageData = {
      page: page || window.location.pathname,
      title: title || document.title,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    };

    this.trackEvent('page_view', 'page_view', pageData);
  }

  /**
   * Track custom event
   */
  public trackEvent(
    type: AnalyticsEventType,
    name: string,
    properties: Record<string, any> = {}
  ): void {
    if (!this.isInitialized) return;

    const event: AnalyticsEvent = {
      id: this.generateEventId(),
      type,
      name,
      properties,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };

    this.eventQueue.push(event);

    // Flush immediately for important events
    if (['ecommerce_purchase', 'ecommerce_checkout', 'contact_form'].includes(type)) {
      this.flushEvents();
    }
  }

  /**
   * Track ecommerce purchase
   */
  public trackPurchase(
    transactionId: string,
    value: number,
    currency: string = 'CHF',
    items: Array<{
      id: string;
      name: string;
      category?: string;
      quantity: number;
      price: number;
    }>
  ): void {
    this.trackEvent('ecommerce_purchase', 'purchase', {
      transactionId,
      value,
      currency,
      items
    });
  }

  /**
   * Track add to cart
   */
  public trackAddToCart(
    productId: string,
    name: string,
    category?: string,
    price: number,
    quantity: number = 1
  ): void {
    this.trackEvent('ecommerce_add_to_cart', 'add_to_cart', {
      productId,
      name,
      category,
      price,
      quantity
    });
  }

  /**
   * Track remove from cart
   */
  public trackRemoveFromCart(
    productId: string,
    name: string,
    category?: string,
    price: number,
    quantity: number = 1
  ): void {
    this.trackEvent('ecommerce_remove_from_cart', 'remove_from_cart', {
      productId,
      name,
      category,
      price,
      quantity
    });
  }

  /**
   * Track checkout
   */
  public trackCheckout(
    step: string,
    value?: number,
    currency: string = 'CHF'
  ): void {
    this.trackEvent('ecommerce_checkout', 'checkout', {
      step,
      value,
      currency
    });
  }

  /**
   * Track blog view
   */
  public trackBlogView(
    postId: string,
    title: string,
    category?: string,
    author?: string
  ): void {
    this.trackEvent('blog_view', 'blog_view', {
      postId,
      title,
      category,
      author
    });
  }

  /**
   * Track blog comment
   */
  public trackBlogComment(postId: string, commentId: string): void {
    this.trackEvent('blog_comment', 'blog_comment', {
      postId,
      commentId
    });
  }

  /**
   * Track blog like
   */
  public trackBlogLike(postId: string): void {
    this.trackEvent('blog_like', 'blog_like', {
      postId
    });
  }

  /**
   * Track contact form submission
   */
  public trackContactForm(formName: string, success: boolean = true): void {
    this.trackEvent('contact_form', 'contact_form', {
      formName,
      success
    });
  }

  /**
   * Track newsletter signup
   */
  public trackNewsletterSignup(source?: string): void {
    this.trackEvent('newsletter_signup', 'newsletter_signup', {
      source
    });
  }

  /**
   * Track download
   */
  public trackDownload(
    fileName: string,
    fileType: string,
    fileSize?: number
  ): void {
    this.trackEvent('download', 'download', {
      fileName,
      fileType,
      fileSize
    });
  }

  /**
   * Track search
   */
  public trackSearch(query: string, results?: number): void {
    this.trackEvent('search', 'search', {
      query,
      results
    });
  }

  /**
   * Track error
   */
  public trackError(
    error: string,
    errorMessage?: string,
    errorStack?: string
  ): void {
    this.trackEvent('error', 'error', {
      error,
      errorMessage,
      errorStack
    });
  }

  /**
   * Track custom event
   */
  public trackCustom(
    name: string,
    properties: Record<string, any> = {}
  ): void {
    this.trackEvent('custom', name, properties);
  }

  /**
   * Flush events to server
   */
  public async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await apiService.post('/analytics/events', { events });
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
      // Re-add events to queue for retry
      this.eventQueue.unshift(...events);
    }
  }

  /**
   * Get analytics report
   */
  public async getReport(
    startDate: string,
    endDate: string,
    metrics?: string[]
  ): Promise<AnalyticsReport> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('startDate', startDate);
      queryParams.append('endDate', endDate);
      if (metrics?.length) {
        queryParams.append('metrics', metrics.join(','));
      }

      const response = await apiService.get<AnalyticsReport>(`/analytics/report?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch analytics report');
    } catch (error) {
      console.error('Get analytics report error:', error);
      throw error;
    }
  }

  /**
   * Get real-time analytics
   */
  public async getRealTimeAnalytics(): Promise<{
    activeUsers: number;
    activeSessions: number;
    topPages: Array<{ page: string; views: number }>;
    topEvents: Array<{ event: string; count: number }>;
  }> {
    try {
      const response = await apiService.get<{
        activeUsers: number;
        activeSessions: number;
        topPages: Array<{ page: string; views: number }>;
        topEvents: Array<{ event: string; count: number }>;
      }>('/analytics/realtime');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch real-time analytics');
    } catch (error) {
      console.error('Get real-time analytics error:', error);
      throw error;
    }
  }

  /**
   * Get user analytics
   */
  public async getUserAnalytics(userId: string): Promise<AnalyticsUser> {
    try {
      const response = await apiService.get<AnalyticsUser>(`/analytics/users/${userId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch user analytics');
    } catch (error) {
      console.error('Get user analytics error:', error);
      throw error;
    }
  }

  /**
   * Get session analytics
   */
  public async getSessionAnalytics(sessionId: string): Promise<AnalyticsSession> {
    try {
      const response = await apiService.get<AnalyticsSession>(`/analytics/sessions/${sessionId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch session analytics');
    } catch (error) {
      console.error('Get session analytics error:', error);
      throw error;
    }
  }

  /**
   * Get analytics goals
   */
  public async getGoals(): Promise<AnalyticsGoal[]> {
    try {
      const response = await apiService.get<AnalyticsGoal[]>('/analytics/goals');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch analytics goals');
    } catch (error) {
      console.error('Get analytics goals error:', error);
      throw error;
    }
  }

  /**
   * Create analytics goal
   */
  public async createGoal(goal: Omit<AnalyticsGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<AnalyticsGoal> {
    try {
      const response = await apiService.post<AnalyticsGoal>('/analytics/goals', goal);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create analytics goal');
    } catch (error) {
      console.error('Create analytics goal error:', error);
      throw error;
    }
  }

  /**
   * Get conversions
   */
  public async getConversions(
    goalId?: string,
    startDate?: string,
    endDate?: string
  ): Promise<AnalyticsConversion[]> {
    try {
      const queryParams = new URLSearchParams();
      if (goalId) queryParams.append('goalId', goalId);
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const response = await apiService.get<AnalyticsConversion[]>(`/analytics/conversions?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch conversions');
    } catch (error) {
      console.error('Get conversions error:', error);
      throw error;
    }
  }

  /**
   * Generate event ID
   */
  private generateEventId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get current session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Get current user ID
   */
  public getUserId(): string | undefined {
    return this.userId;
  }

  /**
   * Check if analytics is initialized
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Destroy analytics service
   */
  public destroy(): void {
    this.stopFlushTimer();
    this.flushEvents();
    this.isInitialized = false;
  }
}

// Create singleton instance
export const analyticsService = new AnalyticsService();

// Export the class for custom instances
export { AnalyticsService };
