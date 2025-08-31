import React from 'react';
import { motion } from 'framer-motion';
import ProductsList from '@/components/ProductsList';

const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 bg-light-gray-bg-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
            Our Tax Return Packages
          </h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Choose the package that best fits your needs. Simple, transparent, and secure.
          </p>
        </motion.div>
        <ProductsList />
      </div>
    </section>
  );
};

export default PackagesSection;