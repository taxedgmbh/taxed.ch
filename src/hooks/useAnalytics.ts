import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface AnalyticsPageView {
  page_title: string;
  page_location: string;
  page_path?: string;
}

export const useAnalytics = () => {
  // Track page view
  const trackPageView = useCallback((pageData: AnalyticsPageView) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageData.page_title,
        page_location: pageData.page_location,
        page_path: pageData.page_path,
      });
    }
  }, []);

  // Track custom event
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  }, []);

  // Track user interaction
  const trackInteraction = useCallback((element: string, action: string) => {
    trackEvent({
      action,
      category: 'User Interaction',
      label: element,
    });
  }, [trackEvent]);

  // Track form submission
  const trackFormSubmission = useCallback((formName: string, success: boolean) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'Form',
      label: formName,
    });
  }, [trackEvent]);

  // Track button click
  const trackButtonClick = useCallback((buttonName: string) => {
    trackEvent({
      action: 'click',
      category: 'Button',
      label: buttonName,
    });
  }, [trackEvent]);

  // Track link click
  const trackLinkClick = useCallback((linkUrl: string, linkText?: string) => {
    trackEvent({
      action: 'click',
      category: 'Link',
      label: linkText || linkUrl,
    });
  }, [trackEvent]);

  // Track search
  const trackSearch = useCallback((searchTerm: string, resultsCount?: number) => {
    trackEvent({
      action: 'search',
      category: 'Search',
      label: searchTerm,
      value: resultsCount,
    });
  }, [trackEvent]);

  // Track e-commerce events
  const trackPurchase = useCallback((transactionId: string, value: number, currency: string = 'CHF') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
      });
    }
  }, []);

  const trackAddToCart = useCallback((itemId: string, itemName: string, value: number) => {
    trackEvent({
      action: 'add_to_cart',
      category: 'E-commerce',
      label: itemName,
      value: value,
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackInteraction,
    trackFormSubmission,
    trackButtonClick,
    trackLinkClick,
    trackSearch,
    trackPurchase,
    trackAddToCart,
  };
};

export default useAnalytics;
