/**
 * Cart Service
 * Handles shopping cart management, items, discounts, and checkout
 */

import { apiService } from './api';
import type {
  CartState,
  CartItem,
  CartOperations,
  CartDiscount,
  ShippingOption,
  TaxCalculation,
  CheckoutState,
  CheckoutStep,
  Address,
  PaymentMethod,
  OrderSummary
} from '@/types/cart';

class CartService {
  private cartState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    totalWeight: 0,
    discounts: [],
    shipping: null,
    taxes: [],
    isOpen: false,
    isLoading: false,
    error: null
  };

  private checkoutState: CheckoutState = {
    currentStep: 0,
    steps: this.getDefaultCheckoutSteps(),
    billingAddress: null,
    shippingAddress: null,
    paymentMethod: null,
    orderNotes: '',
    isProcessing: false,
    error: null
  };

  private listeners: Array<(state: CartState) => void> = [];
  private checkoutListeners: Array<(state: CheckoutState) => void> = [];

  constructor() {
    this.initializeCart();
  }

  /**
   * Initialize cart state from localStorage
   */
  private initializeCart(): void {
    try {
      const stored = localStorage.getItem('cart_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cartState = { ...this.cartState, ...parsed };
        this.calculateTotals();
      }
    } catch (error) {
      console.error('Failed to initialize cart state:', error);
      this.clearCart();
    }
  }

  /**
   * Persist cart state to localStorage
   */
  private persistCart(): void {
    try {
      localStorage.setItem('cart_state', JSON.stringify(this.cartState));
    } catch (error) {
      console.error('Failed to persist cart state:', error);
    }
  }

  /**
   * Notify listeners of cart state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.cartState));
  }

  /**
   * Notify checkout listeners
   */
  private notifyCheckoutListeners(): void {
    this.checkoutListeners.forEach(listener => listener(this.checkoutState));
  }

  /**
   * Get default checkout steps
   */
  private getDefaultCheckoutSteps(): CheckoutStep[] {
    return [
      { id: 'shipping', name: 'Shipping', completed: false, required: true },
      { id: 'billing', name: 'Billing', completed: false, required: true },
      { id: 'payment', name: 'Payment', completed: false, required: true },
      { id: 'review', name: 'Review', completed: false, required: true }
    ];
  }

  /**
   * Calculate cart totals
   */
  private calculateTotals(): void {
    this.cartState.totalItems = this.cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartState.totalPrice = this.cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.cartState.totalWeight = this.cartState.items.reduce((sum, item) => sum + ((item.weight || 0) * item.quantity), 0);
    
    this.persistCart();
    this.notifyListeners();
  }

  /**
   * Subscribe to cart state changes
   */
  public subscribe(listener: (state: CartState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Subscribe to checkout state changes
   */
  public subscribeToCheckout(listener: (state: CheckoutState) => void): () => void {
    this.checkoutListeners.push(listener);
    return () => {
      const index = this.checkoutListeners.indexOf(listener);
      if (index > -1) {
        this.checkoutListeners.splice(index, 1);
      }
    };
  }

  /**
   * Get current cart state
   */
  public getCartState(): CartState {
    return { ...this.cartState };
  }

  /**
   * Get current checkout state
   */
  public getCheckoutState(): CheckoutState {
    return { ...this.checkoutState };
  }

  /**
   * Add item to cart
   */
  public addItem(item: Omit<CartItem, 'id' | 'addedAt' | 'updatedAt'>): void {
    const existingItem = this.cartState.items.find(
      cartItem => cartItem.productId === item.productId && 
      JSON.stringify(cartItem.options) === JSON.stringify(item.options)
    );

    if (existingItem) {
      this.updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
    } else {
      const newItem: CartItem = {
        ...item,
        id: this.generateId(),
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.cartState.items.push(newItem);
      this.calculateTotals();
    }
  }

  /**
   * Remove item from cart
   */
  public removeItem(id: string): void {
    this.cartState.items = this.cartState.items.filter(item => item.id !== id);
    this.calculateTotals();
  }

  /**
   * Update item quantity
   */
  public updateQuantity(id: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }

    const item = this.cartState.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      item.updatedAt = new Date().toISOString();
      this.calculateTotals();
    }
  }

  /**
   * Clear cart
   */
  public clearCart(): void {
    this.cartState.items = [];
    this.cartState.discounts = [];
    this.cartState.shipping = null;
    this.cartState.taxes = [];
    this.calculateTotals();
  }

  /**
   * Apply discount code
   */
  public async applyDiscount(code: string): Promise<void> {
    try {
      this.cartState.isLoading = true;
      this.cartState.error = null;
      this.notifyListeners();

      const response = await apiService.post<CartDiscount>('/cart/discounts', { code });
      
      if (response.success && response.data) {
        // Check if discount already applied
        const existingDiscount = this.cartState.discounts.find(d => d.code === code);
        if (existingDiscount) {
          throw new Error('Discount code already applied');
        }

        // Check minimum amount
        if (response.data.minimumAmount && this.cartState.totalPrice < response.data.minimumAmount) {
          throw new Error(`Minimum order amount of ${response.data.minimumAmount} required`);
        }

        this.cartState.discounts.push(response.data);
        this.calculateTotals();
      } else {
        throw new Error(response.error || 'Invalid discount code');
      }
    } catch (error) {
      this.cartState.error = error instanceof Error ? error.message : 'Failed to apply discount';
      throw error;
    } finally {
      this.cartState.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Remove discount
   */
  public removeDiscount(id: string): void {
    this.cartState.discounts = this.cartState.discounts.filter(d => d.id !== id);
    this.calculateTotals();
  }

  /**
   * Set shipping option
   */
  public setShipping(option: ShippingOption): void {
    this.cartState.shipping = option;
    this.persistCart();
    this.notifyListeners();
  }

  /**
   * Get shipping options
   */
  public async getShippingOptions(address: Address): Promise<ShippingOption[]> {
    try {
      const response = await apiService.post<ShippingOption[]>('/cart/shipping-options', address);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch shipping options');
    } catch (error) {
      console.error('Shipping options error:', error);
      throw error;
    }
  }

  /**
   * Calculate taxes
   */
  public async calculateTaxes(address: Address): Promise<TaxCalculation[]> {
    try {
      const response = await apiService.post<TaxCalculation[]>('/cart/calculate-taxes', {
        address,
        items: this.cartState.items,
        shipping: this.cartState.shipping
      });
      
      if (response.success && response.data) {
        this.cartState.taxes = response.data;
        this.persistCart();
        this.notifyListeners();
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to calculate taxes');
    } catch (error) {
      console.error('Tax calculation error:', error);
      throw error;
    }
  }

  /**
   * Get order summary
   */
  public getOrderSummary(): OrderSummary {
    const subtotal = this.cartState.totalPrice;
    const discountAmount = this.cartState.discounts.reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + (subtotal * discount.value / 100);
      } else if (discount.type === 'fixed') {
        return sum + discount.value;
      }
      return sum;
    }, 0);
    
    const shippingCost = this.cartState.shipping?.price || 0;
    const taxAmount = this.cartState.taxes.reduce((sum, tax) => sum + tax.amount, 0);
    
    return {
      subtotal,
      discounts: discountAmount,
      shipping: shippingCost,
      taxes: taxAmount,
      total: subtotal - discountAmount + shippingCost + taxAmount,
      currency: 'CHF',
      itemCount: this.cartState.totalItems
    };
  }

  /**
   * Open cart
   */
  public openCart(): void {
    this.cartState.isOpen = true;
    this.notifyListeners();
  }

  /**
   * Close cart
   */
  public closeCart(): void {
    this.cartState.isOpen = false;
    this.notifyListeners();
  }

  /**
   * Toggle cart
   */
  public toggleCart(): void {
    this.cartState.isOpen = !this.cartState.isOpen;
    this.notifyListeners();
  }

  /**
   * Start checkout process
   */
  public startCheckout(): void {
    this.checkoutState = {
      currentStep: 0,
      steps: this.getDefaultCheckoutSteps(),
      billingAddress: null,
      shippingAddress: null,
      paymentMethod: null,
      orderNotes: '',
      isProcessing: false,
      error: null
    };
    this.notifyCheckoutListeners();
  }

  /**
   * Update checkout step
   */
  public updateCheckoutStep(stepIndex: number, data?: any): void {
    if (stepIndex >= 0 && stepIndex < this.checkoutState.steps.length) {
      this.checkoutState.currentStep = stepIndex;
      this.checkoutState.steps[stepIndex].completed = true;
      this.checkoutState.steps[stepIndex].data = data;
      this.notifyCheckoutListeners();
    }
  }

  /**
   * Set billing address
   */
  public setBillingAddress(address: Address): void {
    this.checkoutState.billingAddress = address;
    this.updateCheckoutStep(1, address);
  }

  /**
   * Set shipping address
   */
  public setShippingAddress(address: Address): void {
    this.checkoutState.shippingAddress = address;
    this.updateCheckoutStep(0, address);
  }

  /**
   * Set payment method
   */
  public setPaymentMethod(method: PaymentMethod): void {
    this.checkoutState.paymentMethod = method;
    this.updateCheckoutStep(2, method);
  }

  /**
   * Process checkout
   */
  public async processCheckout(): Promise<{ orderId: string; paymentUrl?: string }> {
    try {
      this.checkoutState.isProcessing = true;
      this.checkoutState.error = null;
      this.notifyCheckoutListeners();

      const orderData = {
        items: this.cartState.items,
        billingAddress: this.checkoutState.billingAddress,
        shippingAddress: this.checkoutState.shippingAddress,
        paymentMethod: this.checkoutState.paymentMethod,
        orderNotes: this.checkoutState.orderNotes,
        discounts: this.cartState.discounts,
        shipping: this.cartState.shipping,
        taxes: this.cartState.taxes
      };

      const response = await apiService.post<{ orderId: string; paymentUrl?: string }>('/cart/checkout', orderData);
      
      if (response.success && response.data) {
        this.clearCart();
        this.checkoutState.isProcessing = false;
        this.notifyCheckoutListeners();
        return response.data;
      }
      
      throw new Error(response.error || 'Checkout failed');
    } catch (error) {
      this.checkoutState.error = error instanceof Error ? error.message : 'Checkout failed';
      this.checkoutState.isProcessing = false;
      this.notifyCheckoutListeners();
      throw error;
    }
  }

  /**
   * Get cart item count
   */
  public getItemCount(): number {
    return this.cartState.totalItems;
  }

  /**
   * Check if cart is empty
   */
  public isEmpty(): boolean {
    return this.cartState.items.length === 0;
  }

  /**
   * Get cart total
   */
  public getTotal(): number {
    return this.cartState.totalPrice;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Create singleton instance
export const cartService = new CartService();

// Export the class for custom instances
export { CartService };
