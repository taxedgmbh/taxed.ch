import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show the button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '+41799107787'; // Taxed GmbH phone number
  const defaultMessage = encodeURIComponent(
    "Hello! I'm interested in your Swiss tax consulting services. Could you please provide more information?"
  );

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </button>

      {/* Chat Options Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Taxed GmbH</h3>
                  <p className="text-xs text-gray-500">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-3">
                Hi! Need help with Swiss taxes? We're here to assist you.
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  💬 Chat on WhatsApp
                </p>
                <p className="text-xs text-gray-500">
                  Get instant support
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Start WhatsApp Chat</span>
              </button>
              
              <button
                onClick={handlePhoneClick}
                className="w-full bg-steel-blue hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Mon-Fri 9:00-18:00
              </p>
            </div>
          </div>

          {/* Arrow pointing to button */}
          <div className="absolute bottom-0 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;
