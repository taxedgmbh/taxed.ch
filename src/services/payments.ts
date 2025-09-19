/**
 * Payments Service
 * Handles payment processing, methods, and transaction management
 */

import { apiService } from './api';

// Payment method types
export type PaymentMethodType = 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer' | 'crypto' | 'sepa';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
export type Currency = 'CHF' | 'EUR' | 'USD' | 'GBP';

// Payment method interface
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  isActive: boolean;
  metadata?: Record<string, any>;
}

// Payment intent interface
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  clientSecret?: string;
  paymentMethodId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Payment transaction interface
export interface PaymentTransaction {
  id: string;
  intentId: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  description?: string;
  metadata?: Record<string, any>;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Payment refund interface
export interface PaymentRefund {
  id: string;
  transactionId: string;
  amount: number;
  reason?: string;
  status: 'pending' | 'succeeded' | 'failed';
  createdAt: string;
  processedAt?: string;
}

// Payment webhook interface
export interface PaymentWebhook {
  id: string;
  type: string;
  data: Record<string, any>;
  processed: boolean;
  createdAt: string;
}

// Payment configuration interface
export interface PaymentConfig {
  stripePublishableKey: string;
  paypalClientId: string;
  applePayMerchantId: string;
  googlePayMerchantId: string;
  supportedCurrencies: Currency[];
  supportedMethods: PaymentMethodType[];
}

class PaymentsService {
  private config: PaymentConfig | null = null;
  private listeners: Array<(event: PaymentWebhook) => void> = [];

  constructor() {
    this.initializeConfig();
  }

  /**
   * Initialize payment configuration
   */
  private async initializeConfig(): Promise<void> {
    try {
      const response = await apiService.get<PaymentConfig>('/payments/config');
      if (response.success && response.data) {
        this.config = response.data;
      }
    } catch (error) {
      console.error('Failed to initialize payment config:', error);
    }
  }

  /**
   * Get payment configuration
   */
  public getConfig(): PaymentConfig | null {
    return this.config;
  }

  /**
   * Subscribe to payment webhooks
   */
  public subscribe(listener: (event: PaymentWebhook) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Create payment intent
   */
  public async createPaymentIntent(
    amount: number,
    currency: Currency = 'CHF',
    paymentMethodId?: string,
    metadata?: Record<string, any>
  ): Promise<PaymentIntent> {
    try {
      const response = await apiService.post<PaymentIntent>('/payments/intents', {
        amount,
        currency,
        paymentMethodId,
        metadata
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create payment intent');
    } catch (error) {
      console.error('Create payment intent error:', error);
      throw error;
    }
  }

  /**
   * Confirm payment intent
   */
  public async confirmPaymentIntent(
    intentId: string,
    paymentMethodId?: string,
    returnUrl?: string
  ): Promise<PaymentIntent> {
    try {
      const response = await apiService.post<PaymentIntent>(`/payments/intents/${intentId}/confirm`, {
        paymentMethodId,
        returnUrl
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to confirm payment intent');
    } catch (error) {
      console.error('Confirm payment intent error:', error);
      throw error;
    }
  }

  /**
   * Cancel payment intent
   */
  public async cancelPaymentIntent(intentId: string): Promise<PaymentIntent> {
    try {
      const response = await apiService.post<PaymentIntent>(`/payments/intents/${intentId}/cancel`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to cancel payment intent');
    } catch (error) {
      console.error('Cancel payment intent error:', error);
      throw error;
    }
  }

  /**
   * Get payment intent
   */
  public async getPaymentIntent(intentId: string): Promise<PaymentIntent> {
    try {
      const response = await apiService.get<PaymentIntent>(`/payments/intents/${intentId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Payment intent not found');
    } catch (error) {
      console.error('Get payment intent error:', error);
      throw error;
    }
  }

  /**
   * Get payment methods
   */
  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response = await apiService.get<PaymentMethod[]>('/payments/methods');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch payment methods');
    } catch (error) {
      console.error('Get payment methods error:', error);
      throw error;
    }
  }

  /**
   * Add payment method
   */
  public async addPaymentMethod(
    type: PaymentMethodType,
    token: string,
    metadata?: Record<string, any>
  ): Promise<PaymentMethod> {
    try {
      const response = await apiService.post<PaymentMethod>('/payments/methods', {
        type,
        token,
        metadata
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to add payment method');
    } catch (error) {
      console.error('Add payment method error:', error);
      throw error;
    }
  }

  /**
   * Update payment method
   */
  public async updatePaymentMethod(
    methodId: string,
    updates: Partial<PaymentMethod>
  ): Promise<PaymentMethod> {
    try {
      const response = await apiService.put<PaymentMethod>(`/payments/methods/${methodId}`, updates);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to update payment method');
    } catch (error) {
      console.error('Update payment method error:', error);
      throw error;
    }
  }

  /**
   * Delete payment method
   */
  public async deletePaymentMethod(methodId: string): Promise<void> {
    try {
      const response = await apiService.delete(`/payments/methods/${methodId}`);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete payment method');
      }
    } catch (error) {
      console.error('Delete payment method error:', error);
      throw error;
    }
  }

  /**
   * Set default payment method
   */
  public async setDefaultPaymentMethod(methodId: string): Promise<PaymentMethod> {
    try {
      const response = await apiService.post<PaymentMethod>(`/payments/methods/${methodId}/default`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to set default payment method');
    } catch (error) {
      console.error('Set default payment method error:', error);
      throw error;
    }
  }

  /**
   * Get payment transactions
   */
  public async getPaymentTransactions(
    page: number = 1,
    limit: number = 20,
    filters?: {
      status?: PaymentStatus;
      method?: PaymentMethodType;
      dateFrom?: string;
      dateTo?: string;
    }
  ): Promise<{
    transactions: PaymentTransaction[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.method) queryParams.append('method', filters.method);
      if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);

      const response = await apiService.get<{
        transactions: PaymentTransaction[];
        total: number;
        page: number;
        limit: number;
      }>(`/payments/transactions?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch payment transactions');
    } catch (error) {
      console.error('Get payment transactions error:', error);
      throw error;
    }
  }

  /**
   * Get payment transaction
   */
  public async getPaymentTransaction(transactionId: string): Promise<PaymentTransaction> {
    try {
      const response = await apiService.get<PaymentTransaction>(`/payments/transactions/${transactionId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Payment transaction not found');
    } catch (error) {
      console.error('Get payment transaction error:', error);
      throw error;
    }
  }

  /**
   * Create payment refund
   */
  public async createRefund(
    transactionId: string,
    amount?: number,
    reason?: string
  ): Promise<PaymentRefund> {
    try {
      const response = await apiService.post<PaymentRefund>('/payments/refunds', {
        transactionId,
        amount,
        reason
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create refund');
    } catch (error) {
      console.error('Create refund error:', error);
      throw error;
    }
  }

  /**
   * Get payment refunds
   */
  public async getRefunds(
    transactionId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{
    refunds: PaymentRefund[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      if (transactionId) queryParams.append('transactionId', transactionId);

      const response = await apiService.get<{
        refunds: PaymentRefund[];
        total: number;
        page: number;
        limit: number;
      }>(`/payments/refunds?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch refunds');
    } catch (error) {
      console.error('Get refunds error:', error);
      throw error;
    }
  }

  /**
   * Get payment webhooks
   */
  public async getWebhooks(
    page: number = 1,
    limit: number = 20
  ): Promise<{
    webhooks: PaymentWebhook[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      const response = await apiService.get<{
        webhooks: PaymentWebhook[];
        total: number;
        page: number;
        limit: number;
      }>(`/payments/webhooks?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch webhooks');
    } catch (error) {
      console.error('Get webhooks error:', error);
      throw error;
    }
  }

  /**
   * Process payment webhook
   */
  public async processWebhook(webhookId: string): Promise<PaymentWebhook> {
    try {
      const response = await apiService.post<PaymentWebhook>(`/payments/webhooks/${webhookId}/process`);

      if (response.success && response.data) {
        // Notify listeners
        this.listeners.forEach(listener => listener(response.data!));
        return response.data;
      }

      throw new Error(response.error || 'Failed to process webhook');
    } catch (error) {
      console.error('Process webhook error:', error);
      throw error;
    }
  }

  /**
   * Get payment statistics
   */
  public async getPaymentStats(
    period: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<{
    totalAmount: number;
    transactionCount: number;
    successRate: number;
    averageAmount: number;
    refundAmount: number;
    refundCount: number;
  }> {
    try {
      const response = await apiService.get<{
        totalAmount: number;
        transactionCount: number;
        successRate: number;
        averageAmount: number;
        refundAmount: number;
        refundCount: number;
      }>(`/payments/stats?period=${period}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch payment statistics');
    } catch (error) {
      console.error('Get payment stats error:', error);
      throw error;
    }
  }

  /**
   * Validate payment method
   */
  public async validatePaymentMethod(
    type: PaymentMethodType,
    data: Record<string, any>
  ): Promise<{ valid: boolean; errors: string[] }> {
    try {
      const response = await apiService.post<{ valid: boolean; errors: string[] }>('/payments/validate', {
        type,
        data
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to validate payment method');
    } catch (error) {
      console.error('Validate payment method error:', error);
      throw error;
    }
  }

  /**
   * Get supported payment methods
   */
  public getSupportedMethods(): PaymentMethodType[] {
    return this.config?.supportedMethods || [];
  }

  /**
   * Get supported currencies
   */
  public getSupportedCurrencies(): Currency[] {
    return this.config?.supportedCurrencies || ['CHF'];
  }

  /**
   * Check if payment method is supported
   */
  public isMethodSupported(method: PaymentMethodType): boolean {
    return this.getSupportedMethods().includes(method);
  }

  /**
   * Check if currency is supported
   */
  public isCurrencySupported(currency: Currency): boolean {
    return this.getSupportedCurrencies().includes(currency);
  }

  /**
   * Format amount for display
   */
  public formatAmount(amount: number, currency: Currency = 'CHF'): string {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: currency
    }).format(amount / 100);
  }

  /**
   * Convert amount to cents
   */
  public toCents(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Convert cents to amount
   */
  public fromCents(cents: number): number {
    return cents / 100;
  }
}

// Create singleton instance
export const paymentsService = new PaymentsService();

// Export the class for custom instances
export { PaymentsService };
