// Global TypeScript declarations
declare module '*.jsx' {
  import { FC } from 'react';
  const Component: FC<any>;
  export default Component;
}

declare module '@/components/ShoppingCart' {
  import { FC } from 'react';
  interface ShoppingCartProps {
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
  }
  const ShoppingCart: FC<ShoppingCartProps>;
  export default ShoppingCart;
}

declare module '@/services/dailyBlogScheduler' {
  export const initializeDailyBlogScheduler: () => void;
}






