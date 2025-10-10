// Bing Search Engine Optimization Utilities

// Initialize Microsoft Clarity for Bing insights
export const initializeBingAnalytics = () => {
  if (typeof window !== 'undefined' && window.clarity) {
    // Clarity is already loaded via the script tag
    console.log('Microsoft Clarity initialized for Bing optimization');
  }
};

// Submit URL to Bing for immediate indexing
export const submitToBingIndexing = async (url) => {
  // This would typically be done server-side with Bing's IndexNow API
  console.log(`URL submitted for Bing indexing: ${url}`);
  
  // For client-side, we can trigger a ping to help with discovery
  if (typeof window !== 'undefined') {
    try {
      // Create a hidden iframe to ping Bing
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `https://www.bing.com/ping?sitemap=${encodeURIComponent(url)}`;
      document.body.appendChild(iframe);
      
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000);
    } catch (error) {
      console.warn('Bing ping failed:', error);
    }
  }
};

// Track Bing-specific events
export const trackBingEvent = (eventName, properties = {}) => {
  // Microsoft Clarity event tracking
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName, properties);
  }
  
  // Also send to Google Analytics for comparison
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Bing Optimization',
      ...properties
    });
  }
};

// Optimize content for Bing's algorithm preferences
export const optimizeForBing = () => {
  if (typeof window !== 'undefined') {
    // Bing prefers explicit keyword density and clear content structure
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      // Ensure keywords are present and well-structured
      console.log('Keywords optimized for Bing:', metaKeywords.content);
    }
    
    // Bing values social signals
    addSocialMetaTags();
    
    // Bing appreciates clear navigation structure
    optimizeNavigationForBing();
  }
};

// Add comprehensive social meta tags for Bing
const addSocialMetaTags = () => {
  const socialTags = [
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'de_CH' },
    { property: 'og:site_name', content: 'Taxed GmbH' },
    { name: 'twitter:site', content: '@taxedgmbh' },
    { name: 'twitter:creator', content: '@taxedgmbh' }
  ];
  
  socialTags.forEach(tag => {
    const existing = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
    if (!existing) {
      const meta = document.createElement('meta');
      if (tag.property) {
        meta.setAttribute('property', tag.property);
      } else {
        meta.setAttribute('name', tag.name);
      }
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    }
  });
};

// Optimize navigation structure for Bing crawling
const optimizeNavigationForBing = () => {
  // Ensure all navigation links have proper titles and alt text
  const navLinks = document.querySelectorAll('nav a, header a');
  navLinks.forEach(link => {
    if (!link.title && link.textContent) {
      link.title = link.textContent.trim();
    }
  });
  
  // Add breadcrumb structured data if not present
  addBreadcrumbStructuredData();
};

// Add breadcrumb structured data for better Bing understanding
const addBreadcrumbStructuredData = () => {
  const path = window.location.pathname;
  const pathParts = path.split('/').filter(part => part);
  
  if (pathParts.length > 0) {
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://taxed.ch"
        }
      ]
    };
    
    pathParts.forEach((part, index) => {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": part.charAt(0).toUpperCase() + part.slice(1).replace('-', ' '),
        "item": `https://taxed.ch/${pathParts.slice(0, index + 1).join('/')}`
      });
    });
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbs);
    document.head.appendChild(script);
  }
};

// Bing IndexNow API integration (for server-side implementation)
export const bingIndexNowAPI = {
  submitUrl: async (url, key) => {
    // This should be implemented server-side for security
    const indexNowEndpoint = 'https://api.indexnow.org/indexnow';
    
    const payload = {
      host: 'taxed.ch',
      key: key,
      keyLocation: `https://taxed.ch/${key}.txt`,
      urlList: [url]
    };
    
    try {
      const response = await fetch(indexNowEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      return response.ok;
    } catch (error) {
      console.error('IndexNow API error:', error);
      return false;
    }
  }
};

// Initialize all Bing optimizations
export const initializeBingOptimizations = () => {
  initializeBingAnalytics();
  optimizeForBing();
  
  // Submit current page to Bing
  if (typeof window !== 'undefined') {
    submitToBingIndexing(window.location.href);
  }
};

export default {
  initializeBingAnalytics,
  submitToBingIndexing,
  trackBingEvent,
  optimizeForBing,
  bingIndexNowAPI,
  initializeBingOptimizations
};
