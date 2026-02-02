import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>Payment Successful | Taxed GmbH</title>
        <meta name="description" content="Your payment was successful. Thank you for your purchase." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-[60vh] flex items-center justify-center bg-light-gray-bg-1 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-2xl shadow-xl"
        >
          <div>
            <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
            <h1 className="mt-6 text-4xl font-extrabold text-dark-gray">
              Payment Successful!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Thank you for your order. We've received your payment and will process your request shortly. A confirmation email has been sent to you.
            </p>
          </div>
          <div className="mt-6">
            <Button asChild className="w-full bg-steel-blue hover:bg-steel-blue/90 text-white">
              <Link to="/store">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;