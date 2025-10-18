import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart as ShoppingCartIcon, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  FileText, 
  Calculator, 
  Building, 
  Briefcase, 
  TrendingUp,
  Shield,
  Users,
  Home,
  Globe
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout, formatCurrency } from '@/api/EcommerceApi';
import { useToast } from '@/components/ui/use-toast';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // Function to get icon and color based on service type
  const getServiceIcon = (productTitle) => {
    const title = productTitle.toLowerCase();
    
    if (title.includes('basic') || title.includes('simple')) {
      return { icon: Home, color: 'from-green-500 to-green-600' };
    } else if (title.includes('standard') || title.includes('regular')) {
      return { icon: Building, color: 'from-blue-500 to-blue-600' };
    } else if (title.includes('premium') || title.includes('advanced')) {
      return { icon: Briefcase, color: 'from-purple-500 to-purple-600' };
    } else if (title.includes('complex') || title.includes('comprehensive')) {
      return { icon: TrendingUp, color: 'from-orange-500 to-orange-600' };
    } else if (title.includes('custom') || title.includes('tailored')) {
      return { icon: Calculator, color: 'from-indigo-500 to-indigo-600' };
    } else if (title.includes('business') || title.includes('corporate')) {
      return { icon: Building, color: 'from-gray-600 to-gray-700' };
    } else if (title.includes('individual') || title.includes('personal')) {
      return { icon: Users, color: 'from-pink-500 to-pink-600' };
    } else if (title.includes('international') || title.includes('expat')) {
      return { icon: Globe, color: 'from-cyan-500 to-cyan-600' };
    } else if (title.includes('security') || title.includes('compliance')) {
      return { icon: Shield, color: 'from-red-500 to-red-600' };
    } else {
      return { icon: FileText, color: 'from-steel-blue to-blue-600' };
    }
  };

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Add some products to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      clearCart();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Checkout Error',
        description: error.message || 'There was a problem initializing checkout. Please try again.',
        variant: 'destructive',
      });
    }
  }, [cartItems, clearCart, toast]);
  
  const cartTotal = useMemo(() => {
    const totalCents = getCartTotal();
    // Assuming all items in cart have same currency, take it from first item
    const currencyInfo = cartItems.length > 0 ? cartItems[0].variant.currency : null;
    return formatCurrency(totalCents, currencyInfo);
  }, [getCartTotal, cartItems]);


  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-dark-gray">Shopping Cart</h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-dark-gray hover:bg-gray-100">
                <X />
              </Button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-light-gray-bg-2">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                  <ShoppingCartIcon size={48} className="mb-4 text-gray-400" />
                  <p>Your cart is empty.</p>
                  <Button asChild variant="link" className="text-steel-blue mt-2" onClick={() => setIsCartOpen(false)}>
                    <Link to="/store">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                cartItems.map(item => {
                  const { icon: IconComponent, color } = getServiceIcon(item.product.title);
                  
                  return (
                    <div key={item.variant.id} className="flex items-start gap-4 bg-white p-3 rounded-lg shadow-sm">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-md border" />
                      ) : (
                        <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-md border flex items-center justify-center`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      )}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-dark-gray">{item.product.title}</h3>
                      <p className="text-sm text-gray-500">{item.variant.title}</p>
                      <p className="text-sm text-brand-red font-bold mt-1">
                        {formatCurrency(item.variant.sale_price_in_cents ?? item.variant.price_in_cents, item.variant.currency)}
                      </p>
                       <div className="flex items-center border border-gray-200 rounded-md w-fit mt-2">
                        <Button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} size="sm" variant="ghost" className="px-2 text-gray-600 hover:bg-gray-100 h-8"><Minus size={14}/></Button>
                        <span className="px-3 text-dark-gray font-medium">{item.quantity}</span>
                        <Button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} size="sm" variant="ghost" className="px-2 text-gray-600 hover:bg-gray-100 h-8"><Plus size={14}/></Button>
                      </div>
                    </div>
                    <Button onClick={() => removeFromCart(item.variant.id)} size="icon" variant="ghost" className="text-gray-400 hover:text-brand-red h-8 w-8 flex-shrink-0">
                      <Trash2 size={16}/>
                    </Button>
                  </div>
                  );
                })
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4 text-dark-gray">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-bold">{cartTotal}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-semibold py-3 text-base">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;