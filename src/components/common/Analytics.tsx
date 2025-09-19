/**
 * Analytics Component
 * Handles Google Analytics, Google Tag Manager, and custom analytics tracking
 */

import React, { useEffect } from 'react';
import { BaseComponentProps } from '@/types/common';

interface AnalyticsProps extends BaseComponentProps {
  trackingId?: string;
  gtmId?: string;
  debug?: boolean;
  anonymizeIp?: boolean;
  cookieDomain?: string;
  cookieExpires?: number;
  sendPageView?: boolean;
  customDimensions?: Record<string, string | number>;
  customMetrics?: Record<string, number>;
  enhancedEcommerce?: boolean;
  userId?: string;
  sessionId?: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  trackingId,
  gtmId,
  debug = false,
  anonymizeIp = true,
  cookieDomain = 'auto',
  cookieExpires = 63072000, // 2 years
  sendPageView = true,
  customDimensions,
  customMetrics,
  enhancedEcommerce = false,
  userId,
  sessionId,
  className,
}) => {
  useEffect(() => {
    // Initialize Google Analytics
    if (trackingId && typeof window !== 'undefined') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', trackingId, {
        anonymize_ip: anonymizeIp,
        cookie_domain: cookieDomain,
        cookie_expires: cookieExpires,
        send_page_view: sendPageView,
        custom_map: customDimensions,
        custom_metrics: customMetrics,
        enhanced_ecommerce: enhancedEcommerce,
        user_id: userId,
        session_id: sessionId,
        debug_mode: debug,
      });

      // Set custom dimensions
      if (customDimensions) {
        Object.entries(customDimensions).forEach(([key, value]) => {
          gtag('config', trackingId, {
            custom_map: { [key]: value },
          });
        });
      }
    }
  }, [trackingId, debug, anonymizeIp, cookieDomain, cookieExpires, sendPageView, customDimensions, customMetrics, enhancedEcommerce, userId, sessionId]);

  useEffect(() => {
    // Initialize Google Tag Manager
    if (gtmId && typeof window !== 'undefined') {
      // Load GTM script
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);

      // Add noscript fallback
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }, [gtmId]);

  return null;
};

// Analytics tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', window.gtag('config', 'GA_MEASUREMENT_ID'), {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

export const trackConversion = (conversionId: string, conversionLabel: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value: value,
      currency: currency,
    });
  }
};

export const trackEcommerce = (action: string, parameters: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters);
  }
};

// Predefined tracking events
export const AnalyticsEvents = {
  // Page events
  PAGE_VIEW: 'page_view',
  PAGE_LOAD: 'page_load',
  PAGE_SCROLL: 'page_scroll',
  
  // User interaction events
  CLICK: 'click',
  SCROLL: 'scroll',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  
  // E-commerce events
  PURCHASE: 'purchase',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_ITEM: 'view_item',
  VIEW_CART: 'view_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  
  // Engagement events
  SEARCH: 'search',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SHARE: 'share',
  DOWNLOAD: 'file_download',
  
  // Business events
  CONTACT_FORM: 'contact_form',
  APPOINTMENT_BOOKING: 'appointment_booking',
  DOCUMENT_DOWNLOAD: 'document_download',
  SERVICE_INQUIRY: 'service_inquiry',
};

// Custom hook for analytics
export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', window.gtag('config', 'GA_MEASUREMENT_ID'), {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  const trackConversion = (conversionId: string, conversionLabel: string, value?: number, currency?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${conversionId}/${conversionLabel}`,
        value: value,
        currency: currency,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  };
};

// Declare global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
