import React, { useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { initializeCheckout, formatCurrency } from '@/api/EcommerceApi';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();

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

  const handleRemove = (item) => {
    removeFromCart(item.variant.id);
    toast({
      title: 'Item Removed',
      description: `${item.product.title} has been removed from your cart.`,
    });
  };

  const cartTotal = useMemo(() => {
    const totalCents = getCartTotal();
    const currencyInfo = cartItems.length > 0 ? cartItems[0].variant.currency : null;
    return formatCurrency(totalCents, currencyInfo);
  }, [getCartTotal, cartItems]);

  return (
    <>
      <Helmet>
        <title>Your Cart | Taxed GmbH</title>
        <meta name="description" content="Review and manage items in your shopping cart." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Your Shopping Cart
            </h1>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ShoppingCart className="mx-auto h-24 w-24 text-gray-300" />
              <p className="mt-4 text-xl text-dark-gray">Your cart is empty.</p>
              <Button asChild className="mt-6 bg-steel-blue hover:bg-steel-blue/90 text-white">
                <Link to="/store">Continue Shopping</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.variant.id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                    >
                      <Card className="flex items-center p-4">
                        <img src={item.product.image} alt={item.product.title} className="w-24 h-24 object-cover rounded-md border mr-4" />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg text-dark-gray">{item.product.title}</h3>
                          <p className="text-sm text-gray-600">{item.variant.title}</p>
                          <div className="flex items-center border border-gray-200 rounded-md w-fit mt-2">
                            <Button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} size="sm" variant="ghost" className="px-2 text-gray-600 hover:bg-gray-100 h-8"><Minus size={14}/></Button>
                            <span className="px-3 text-dark-gray font-medium">{item.quantity}</span>
                            <Button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} size="sm" variant="ghost" className="px-2 text-gray-600 hover:bg-gray-100 h-8"><Plus size={14}/></Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-steel-blue">{formatCurrency(item.variant.sale_price_in_cents ?? item.variant.price_in_cents, item.variant.currency)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-brand-red mt-2"
                            onClick={() => handleRemove(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{cartTotal}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col space-y-4">
                    <Button
                      className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        clearCart();
                        toast({ title: 'Cart Cleared', description: 'All items have been removed from your cart.' });
                      }}
                    >
                      Clear Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;