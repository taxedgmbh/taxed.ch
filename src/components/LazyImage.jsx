import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * LazyImage Component
 *
 * Optimized image component with lazy loading, blur-up effect, and error handling.
 * Improves Core Web Vitals (LCP, CLS) by deferring off-screen images.
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alternative text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {string} aspectRatio - Aspect ratio (e.g., "16/9", "4/3", "1/1")
 * @param {string} priority - "high" for above-fold images (eager loading)
 *
 * @example
 * <LazyImage
 *   src="https://example.com/image.jpg"
 *   alt="Description"
 *   className="rounded-lg"
 *   aspectRatio="16/9"
 * />
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  priority = 'low',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={priority === 'high' ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
