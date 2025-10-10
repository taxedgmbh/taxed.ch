// Performance Optimization Utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/fonts/inter-var.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical images
    const heroImage = new Image();
    heroImage.src = '/images/backgrounds/hero-bg.webp';
  }
};

// Optimize images with lazy loading
export const optimizeImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    body { margin: 0; font-family: Inter, system-ui, sans-serif; }
    .hero-section { min-height: 100vh; background: linear-gradient(135deg, #1e40af, #3b82f6); }
    .loading-spinner { 
      width: 40px; height: 40px; border: 4px solid #f3f4f6; 
      border-top: 4px solid #3b82f6; border-radius: 50%; 
      animation: spin 1s linear infinite; margin: 20px auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};

// Resource hints for better performance
export const addResourceHints = () => {
  if (typeof window !== 'undefined') {
    // DNS prefetch for external domains
    const dnsPrefetch = [
      'https://www.googletagmanager.com',
      'https://fonts.googleapis.com',
      'https://unpkg.com'
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical origins
    const preconnect = [
      'https://fonts.gstatic.com'
    ];

    preconnect.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  preloadCriticalResources();
  optimizeImages();
  addResourceHints();
  inlineCriticalCSS();
  
  // Register service worker in production
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker();
  }
};

export default {
  preloadCriticalResources,
  optimizeImages,
  registerServiceWorker,
  inlineCriticalCSS,
  addResourceHints,
  initializePerformanceOptimizations
};
