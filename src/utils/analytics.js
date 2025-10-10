// Google Analytics and Performance Tracking Utilities

// Initialize Google Analytics
export const initializeAnalytics = () => {
  // Your Google Analytics ID
  const GA_MEASUREMENT_ID = 'G-8QGTP1064K';
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    });
  }
};

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-8QGTP1064K', {
      page_path: path,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
};

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    }).catch(error => {
      console.warn('Web Vitals library not available:', error);
    });
  }
};

// Send metrics to Google Analytics
const sendToAnalytics = (metric) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_parameters: {
        metric_rating: metric.rating,
        metric_delta: metric.delta,
      }
    });
  }
};

// Track user interactions
export const trackUserInteraction = (action, element) => {
  trackEvent('user_interaction', {
    category: 'UI',
    label: element,
    action: action
  });
};

// Track form submissions
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submission', {
    category: 'Forms',
    label: formName,
    value: success ? 1 : 0
  });
};

// Track file downloads
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    category: 'Downloads',
    label: fileName,
    file_type: fileType
  });
};

// Track external link clicks
export const trackExternalLink = (url) => {
  trackEvent('external_link_click', {
    category: 'Outbound Links',
    label: url
  });
};

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackWebVitals,
  trackUserInteraction,
  trackFormSubmission,
  trackDownload,
  trackExternalLink
};
