import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Percent,
  Truck,
  Clock
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface CartSummaryProps {
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  className?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ 
  onCheckout, 
  onContinueShopping,
  className = '' 
}) => {
  const { items, total, subtotal, tax, discount, shipping, isEmpty } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(price);
  };

  const calculateSavings = () => {
    return items.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + (item.originalPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const totalSavings = calculateSavings();
  const hasDiscount = discount > 0;
  const hasSavings = totalSavings > 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Add some services to get started with your tax optimization journey.
          </p>
          <Button
            onClick={onContinueShopping}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Browse Services
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Card className="p-6 shadow-lg">
        <motion.div variants={itemVariants} className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Order Summary
          </h3>
          <p className="text-gray-600 text-sm">
            {items.length} {items.length === 1 ? 'service' : 'services'} in your cart
          </p>
        </motion.div>

        {/* Pricing Breakdown */}
        <motion.div variants={itemVariants} className="space-y-4 mb-6">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          {/* Discount */}
          {hasDiscount && (
            <div className="flex justify-between items-center text-green-600">
              <div className="flex items-center space-x-2">
                <Percent className="w-4 h-4" />
                <span>Discount</span>
              </div>
              <span className="font-medium">-{formatPrice(discount)}</span>
            </div>
          )}

          {/* Savings */}
          {hasSavings && (
            <div className="flex justify-between items-center text-green-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>You Save</span>
              </div>
              <span className="font-medium">-{formatPrice(totalSavings)}</span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Shipping</span>
            </div>
            <span className="font-medium">
              {shipping === 0 ? 'Free' : formatPrice(shipping)}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">VAT (8.1%)</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-600">{formatPrice(total)}</span>
          </div>
        </motion.div>

        {/* Security & Trust Indicators */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Secure Checkout</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Money Back</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Button
            onClick={onCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Checkout
          </Button>
          
          <Button
            variant="outline"
            onClick={onContinueShopping}
            className="w-full"
          >
            Continue Shopping
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
          </div>
        </motion.div>

        {/* Promo Code */}
        <motion.div variants={itemVariants} className="mt-6">
          <div className="border-t border-gray-200 pt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button variant="outline" size="sm">
                Apply
              </Button>
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};





