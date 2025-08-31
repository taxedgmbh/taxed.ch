import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ProductsList from '@/components/ProductsList';

const StorePage = () => {
  return (
    <>
      <Helmet>
        <title>Store | Taxed GmbH - Tax Return Packages</title>
        <meta name="description" content="Purchase your Swiss tax return package directly from our store. Transparent pricing for basic, medium, and advanced complexity levels." />
        <meta property="og:title" content="Store | Taxed GmbH - Tax Return Packages" />
        <meta property="og:description" content="Purchase your Swiss tax return package directly from our store. Transparent pricing for basic, medium, and advanced complexity levels." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Our Tax Return Packages
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Choose the package that best fits your needs and purchase it directly. 
              Simple, transparent, and secure.
            </p>
          </motion.div>

          <ProductsList />
        </div>
      </section>
    </>
  );
};

export default StorePage;