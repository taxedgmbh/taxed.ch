import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Edit,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: string;
    category: string;
    duration?: string;
    features?: string[];
    isRecurring?: boolean;
    discount?: number;
    originalPrice?: number;
  };
  onEdit?: (item: any) => void;
  onRemove?: (itemId: string) => void;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onEdit, 
  onRemove,
  className = '' 
}) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
    onRemove?.(item);
  };

  const handleEdit = () => {
    onEdit?.(item);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(price);
  };

  const totalPrice = item.price * item.quantity;
  const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start space-x-4">
          {/* Service Image/Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {item.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Service Category */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.isRecurring && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Recurring
                    </span>
                  )}
                  {item.duration && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Features */}
                {item.features && item.features.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 3).map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{item.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price and Quantity Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="w-8 h-8 p-0"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Price Display */}
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.originalPrice * item.quantity)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Save {formatPrice(savings)}</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    {formatPrice(item.price)} each
                  </div>
                </div>
              </div>
            </div>

            {/* Recurring Service Notice */}
            {item.isRecurring && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    This is a recurring service. You'll be charged monthly.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};






