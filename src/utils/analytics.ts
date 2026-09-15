/**
 * Kazon India - Precision Orthopedic Implants & Surgical Innovation
 * Enterprise Analytics & Tag Manager Dispatcher (GA4, GTM dataLayer & Custom Medical B2B Events)
 */

import { logFirebaseEvent, firebaseConfig } from '../lib/firebase';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    __KAZON_ANALYTICS_EVENTS__?: Array<{
      event: string;
      params: Record<string, any>;
      timestamp: string;
    }>;
  }
}

// Read Measurement ID from environment or fallback to Firebase Config (G-CRRZLDBC2H)
export const GA_MEASUREMENT_ID = 
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || 
  firebaseConfig.measurementId || 
  'G-CRRZLDBC2H';

let isInitialized = false;

/**
 * Initialize Google Analytics 4 and Tag Manager dataLayer
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.__KAZON_ANALYTICS_EVENTS__ = window.__KAZON_ANALYTICS_EVENTS__ || [];

  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
  }

  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith('G-')) {
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: true,
      });
    } else {
      // Configure existing gtag from index.html if present
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: true,
      });
    }
  }

  isInitialized = true;
}

/**
 * Low-level event dispatcher to GA4, dataLayer, and local telemetry buffer
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  const timestamp = new Date().toISOString();
  const enrichedParams = {
    ...params,
    app_brand: 'Kazon India',
    business_unit: 'Orthopedic & Spinal Surgical Implants',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    timestamp,
  };

  // 1. Dispatch to dataLayer for GTM / BigQuery pipelines
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...enrichedParams,
    });

    // 2. Dispatch to GA4 via gtag
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, enrichedParams);
    }

    // 2b. Dispatch directly to Firebase Analytics SDK
    logFirebaseEvent(eventName, enrichedParams);

    // 3. Keep a rolling debug log in development/inspection
    window.__KAZON_ANALYTICS_EVENTS__ = window.__KAZON_ANALYTICS_EVENTS__ || [];
    window.__KAZON_ANALYTICS_EVENTS__.push({
      event: eventName,
      params: enrichedParams,
      timestamp,
    });
    if (window.__KAZON_ANALYTICS_EVENTS__.length > 50) {
      window.__KAZON_ANALYTICS_EVENTS__.shift();
    }
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`%c[Analytics: ${eventName}]`, 'color: #085F2C; font-weight: bold;', enrichedParams);
  }
}

/**
 * Track Virtual Page Views on Route Navigation
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  const title = pageTitle || (typeof document !== 'undefined' ? document.title : '');
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: title,
  });
}

/**
 * Track Commercial & Clinical Call-to-Action (CTA) Clicks
 */
export function trackCTA(
  ctaName: string,
  location: string,
  metadata: Record<string, any> = {}
): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
    ...metadata,
  });
}

/**
 * Track Hospital & Institutional RFQ (Request for Quotation) Submissions
 */
export function trackRFQSubmission(data: {
  productId?: string;
  productName?: string;
  volumeTier?: string;
  targetMaterial?: string;
  hospital?: string;
  role?: string;
  country?: string;
  source: 'modal' | 'dedicated_page';
}): void {
  trackEvent('rfq_submitted', {
    event_category: 'lead_generation',
    event_label: data.productName || 'General Orthopedic RFQ',
    ...data,
  });
}

/**
 * Track Biomedical Engineer Consultation Requests
 */
export function trackEngineerInquiry(data: {
  topic: string;
  hasAttachment: boolean;
  company?: string;
  source: 'modal' | 'dedicated_page';
}): void {
  trackEvent('engineer_consultation_requested', {
    event_category: 'lead_generation',
    event_label: data.topic,
    ...data,
  });
}

/**
 * Track General Contact Desk Inquiries
 */
export function trackContactSubmission(data: {
  subject: string;
  source: string;
}): void {
  trackEvent('contact_form_submitted', {
    event_category: 'contact',
    event_label: data.subject,
    ...data,
  });
}

/**
 * Track Technical Dossiers, Surgical Technique Guides, and CAD Downloads
 */
export function trackDossierDownload(
  docTitle: string,
  docType: string,
  productId?: string
): void {
  trackEvent('dossier_download', {
    event_category: 'clinical_resources',
    doc_title: docTitle,
    doc_type: docType,
    product_id: productId || 'general',
  });
}

/**
 * Track Implant Catalog Filtering and Search Operations
 */
export function trackCatalogFilter(
  filterType: 'category' | 'family' | 'anatomy' | 'material' | 'search' | 'reset' | string,
  value: string,
  matchedCount?: number
): void {
  trackEvent('catalog_filter', {
    filter_type: filterType,
    filter_value: value,
    results_count: matchedCount,
  });
}

/**
 * Track Product Metrology & 3D Viewer Interactions
 */
export function trackProductInteraction(
  productId: string,
  productName: string,
  action: 'view_details' | 'view_cad_3d' | 'switch_tab' | 'drop_datum_pin',
  extra: Record<string, any> = {}
): void {
  trackEvent('product_interaction', {
    product_id: productId,
    product_name: productName,
    interaction_action: action,
    ...extra,
  });
}

/**
 * Track Phone Calls to 24/7 OT Dispatch Helpline
 */
export function trackPhoneHelpline(phoneNumber: string, location: string): void {
  trackEvent('phone_call_initiated', {
    event_category: 'hotline',
    phone_number: phoneNumber,
    location,
  });
}

/**
 * Track Direct Email Enquiries
 */
export function trackEmailClick(email: string, location: string): void {
  trackEvent('email_inquiry_initiated', {
    event_category: 'email',
    email_address: email,
    location,
  });
}

/**
 * Track General Contact Clicks (Phone, Email, WhatsApp, Address)
 */
export function trackContactClick(
  type: 'phone' | 'email' | 'whatsapp' | 'address',
  value: string,
  location: string
): void {
  trackEvent('contact_click', {
    contact_type: type,
    contact_target: value,
    location,
  });
}

/**
 * Track Interactive Scientific Modules (Anatomy Explorer, Materials Comparator, Manufacturing Lifecycle, Trust & Metrology)
 */
export function trackScientificModule(
  module:
    | 'anatomy_explorer'
    | 'materials_comparator'
    | 'material_science_comparator'
    | 'manufacturing_lifecycle'
    | 'metrology_stage'
    | 'regulatory_trust'
    | string,
  action: string,
  details: Record<string, any> = {}
): void {
  trackEvent('interactive_module_engaged', {
    module_name: module,
    module_action: action,
    ...details,
  });
}
