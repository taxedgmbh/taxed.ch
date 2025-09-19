import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { CartItem, CartContextType } from '@/types';

interface CartItemWithVariant extends CartItem {
  variant: {
    id: string;
    title: string;
    price_in_cents: number;
    sale_price_in_cents?: number;
    manage_inventory: boolean;
    inventory_quantity?: number;
  };
  product: {
    id: string;
    title: string;
    handle: string;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'e-commerce-cart';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemWithVariant[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = useCallback((
    product: { id: string; title: string; handle: string },
    variant: {
      id: string;
      title: string;
      price_in_cents: number;
      sale_price_in_cents?: number;
      manage_inventory: boolean;
      inventory_quantity?: number;
    },
    quantity: number,
    availableQuantity: number
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (variant.manage_inventory) {
        const existingItem = cartItems.find(item => item.variant.id === variant.id);
        const currentCartQuantity = existingItem ? existingItem.quantity : 0;
        if ((currentCartQuantity + quantity) > availableQuantity) {
          const error = new Error(`Not enough stock for ${product.title} (${variant.title}). Only ${availableQuantity} left.`);
          reject(error);
          return;
        }
      }

      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.variant.id === variant.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.variant.id === variant.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { product, variant, quantity }];
      });
      resolve();
      setIsCartOpen(true);
    });
  }, [cartItems]);

  const removeFromCart = useCallback((variantId: string): void => {
    setCartItems(prevItems => prevItems.filter(item => item.variant.id !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number): void => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.variant.id === variantId) {
          const newQuantity = Math.max(1, quantity);
          if (item.variant.manage_inventory && item.variant.inventory_quantity !== null) {
            return { ...item, quantity: Math.min(newQuantity, item.variant.inventory_quantity) };
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }, []);
  
  const clearCart = useCallback((): void => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback((): number => {
    return cartItems.reduce((total, item) => {
      const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const value = useMemo((): CartContextType => ({
    items: cartItems.map(item => ({
      id: item.variant.id,
      name: `${item.product.title} - ${item.variant.title}`,
      price: (item.variant.sale_price_in_cents ?? item.variant.price_in_cents) / 100,
      quantity: item.quantity,
      image: '', // Add image if available
      description: item.variant.title
    })),
    isCartOpen,
    setIsCartOpen,
    addItem: (item: Omit<CartItem, 'quantity'>) => {
      // This would need to be adapted based on your product structure
      console.log('Add item not implemented for this cart structure');
    },
    removeItem: removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice: getCartTotal,
    getTotalItems: () => cartItems.reduce((total, item) => total + item.quantity, 0)
  }), [cartItems, isCartOpen, removeFromCart, updateQuantity, clearCart, getCartTotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
