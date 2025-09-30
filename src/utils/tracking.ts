// Tracking utility functions for Google Analytics, GTM, and Meta Pixel

// Google Analytics event tracking
export const trackGAEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Meta Pixel event tracking
export const trackFBEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventParams);
  }
};

// Google Tag Manager dataLayer push
export const trackGTMEvent = (event: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event,
      ...eventData,
    });
  }
};

// Combined tracking for all platforms
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  trackGAEvent(eventName, eventData);
  trackFBEvent(eventName, eventData);
  trackGTMEvent(eventName, eventData);
};

// Predefined conversion events
export const trackLeadSubmission = (source: string, phone: string) => {
  trackEvent('lead_submit', {
    event_category: 'Lead Generation',
    event_label: source,
    value: phone,
  });
  
  // Meta Pixel specific conversion event
  trackFBEvent('Lead', { content_name: source });
};

export const trackBrochureDownload = (phone: string) => {
  trackEvent('brochure_download', {
    event_category: 'Downloads',
    event_label: 'Brochure & Floor Plan',
    value: phone,
  });
  
  // Meta Pixel specific conversion event
  trackFBEvent('Lead', { content_name: 'Brochure Download' });
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'Contact',
    event_label: source,
  });
  
  trackFBEvent('Contact', { content_name: source });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'Contact',
    event_label: 'Phone Call',
  });
  
  trackFBEvent('Contact', { content_name: 'Phone Call' });
};

export const trackSiteVisitRequest = () => {
  trackEvent('site_visit_request', {
    event_category: 'Engagement',
    event_label: 'Site Visit',
  });
  
  trackFBEvent('Schedule', { content_name: 'Site Visit' });
};
