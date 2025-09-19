/**
 * Shopping cart type definitions
 * Defines types for cart management, items, and checkout
 */

// Cart item structure
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  category?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  options?: Record<string, string>;
  addedAt: string;
  updatedAt: string;
}

// Cart state
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalWeight: number;
  discounts: CartDiscount[];
  shipping: ShippingOption | null;
  taxes: TaxCalculation[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

// Cart operations
export interface CartOperations {
  addItem: (item: Omit<CartItem, 'id' | 'addedAt' | 'updatedAt'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => Promise<void>;
  removeDiscount: (id: string) => void;
  setShipping: (option: ShippingOption) => void;
}

// Discount codes
export interface CartDiscount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  description: string;
  minimumAmount?: number;
  maximumDiscount?: number;
  expiresAt?: string;
  appliedAt: string;
}

// Shipping options
export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  carrier: string;
  trackingNumber?: string;
  isExpress: boolean;
  isInternational: boolean;
}

// Tax calculation
export interface TaxCalculation {
  id: string;
  name: string;
  rate: number;
  amount: number;
  type: 'vat' | 'sales_tax' | 'gst';
  region: string;
}

// Checkout process
export interface CheckoutStep {
  id: string;
  name: string;
  completed: boolean;
  required: boolean;
  data?: any;
}

export interface CheckoutState {
  currentStep: number;
  steps: CheckoutStep[];
  billingAddress: Address | null;
  shippingAddress: Address | null;
  paymentMethod: PaymentMethod | null;
  orderNotes?: string;
  isProcessing: boolean;
  error: string | null;
}

// Address structure
export interface Address {
  id?: string;
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
  isDefault?: boolean;
}

// Payment methods
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

// Order summary
export interface OrderSummary {
  subtotal: number;
  discounts: number;
  shipping: number;
  taxes: number;
  total: number;
  currency: string;
  itemCount: number;
}
