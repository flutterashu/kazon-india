import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  Firestore 
} from 'firebase/firestore';
import { getAnalytics, isSupported, logEvent, Analytics } from 'firebase/analytics';

/**
 * Firebase Configuration for Jio-Jindgi Project
 * Provided by user for storing form submissions in Cloud Firestore & telemetry tracking.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyDv0R3iLvW77JqA3ecajNho-RtzUGlQ0QY",
  authDomain: "jio-jindgi.firebaseapp.com",
  projectId: "jio-jindgi",
  storageBucket: "jio-jindgi.appspot.com",
  messagingSenderId: "45102179586",
  appId: "1:45102179586:web:e43da20e35364f6a150e1b",
  measurementId: "G-CRRZLDBC2H"
};

// Initialize or reuse the Firebase App instance
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Cloud Firestore Database Instance
export const db: Firestore = getFirestore(app);

// Safe Analytics initialization for browser environment with event queueing
export let analyticsInstance: Analytics | null = null;
const eventQueue: Array<{ eventName: string; params: Record<string, any> }> = [];
let isQueueFlushing = false;

const analyticsPromise: Promise<Analytics | null> = (async () => {
  if (typeof window === 'undefined') return null;
  try {
    const supported = await isSupported();
    if (supported) {
      analyticsInstance = getAnalytics(app);
      // Flush any events that were logged before isSupported resolved
      if (!isQueueFlushing && eventQueue.length > 0) {
        isQueueFlushing = true;
        while (eventQueue.length > 0) {
          const item = eventQueue.shift();
          if (item && analyticsInstance) {
            try {
              logEvent(analyticsInstance, item.eventName, item.params);
            } catch (e) {
              // Ignore single event failure
            }
          }
        }
        isQueueFlushing = false;
      }
      return analyticsInstance;
    }
  } catch (err) {
    console.debug('[Firebase Analytics] Not supported or blocked:', err);
  }
  return null;
})();

/**
 * Log custom events directly through Firebase Analytics SDK
 */
export function logFirebaseEvent(eventName: string, params: Record<string, any> = {}) {
  try {
    if (analyticsInstance) {
      logEvent(analyticsInstance, eventName, params);
    } else {
      // Queue for when analyticsInstance is ready
      eventQueue.push({ eventName, params });
      analyticsPromise.then((instance) => {
        if (instance && !isQueueFlushing && eventQueue.length > 0) {
          isQueueFlushing = true;
          while (eventQueue.length > 0) {
            const item = eventQueue.shift();
            if (item) {
              try {
                logEvent(instance, item.eventName, item.params);
              } catch (e) {
                // Ignore
              }
            }
          }
          isQueueFlushing = false;
        }
      });
    }
  } catch (err) {
    // Non-blocking telemetry
    console.debug('[Firebase Analytics] Event dispatch notice:', err);
  }
}

// Interfaces for Form Submissions stored in Firestore
export interface QuoteRequestPayload {
  productId: string;
  productName: string;
  volumeTier: string;
  targetMaterial: string;
  name: string;
  email: string;
  phone?: string;
  hospital?: string;
  role?: string;
  country?: string;
  notes?: string;
  source: 'modal' | 'dedicated_page' | 'catalog_card' | 'category_page_card' | string;
}

export interface EngineerInquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic: string;
  message: string;
  fileName?: string | null;
  source: 'modal' | 'dedicated_page' | string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  source: 'contact_page' | string;
}

export interface SubmissionResult {
  success: boolean;
  referenceId: string;
  storedInFirestore: boolean;
  timestamp: string;
  collection: string;
}

/**
 * Persist RFQ (Request for Quote & Sample Kit) to Firestore 'quote_requests' collection
 */
export async function submitQuoteRequestToFirestore(
  data: QuoteRequestPayload
): Promise<SubmissionResult> {
  const localRefId = 'KZN-RFQ-' + Date.now().toString(36).toUpperCase();
  const timestamp = new Date().toISOString();

  try {
    const docRef = await addDoc(collection(db, 'quote_requests'), {
      ...data,
      referenceId: localRefId,
      status: 'pending_review',
      department: 'Export & Hospital Procurement Desk',
      clientTimestamp: timestamp,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    logFirebaseEvent('quote_request_submitted', {
      product_id: data.productId,
      product_name: data.productName,
      volume_tier: data.volumeTier,
      firestore_id: docRef.id,
    });

    return {
      success: true,
      referenceId: docRef.id || localRefId,
      storedInFirestore: true,
      timestamp,
      collection: 'quote_requests',
    };
  } catch (error) {
    console.debug('[Kazon Dispatch] Queueing submission locally:', error);
    saveOfflineBackup('kazon_offline_rfqs', { ...data, referenceId: localRefId, timestamp });
    
    return {
      success: true,
      referenceId: localRefId,
      storedInFirestore: false,
      timestamp,
      collection: 'quote_requests',
    };
  }
}

/**
 * Persist Biomedical Engineering Consult Inquiry to Firestore 'engineer_inquiries' collection
 */
export async function submitEngineerInquiryToFirestore(
  data: EngineerInquiryPayload
): Promise<SubmissionResult> {
  const localRefId = 'KZN-ENG-' + Date.now().toString(36).toUpperCase();
  const timestamp = new Date().toISOString();

  try {
    const docRef = await addDoc(collection(db, 'engineer_inquiries'), {
      ...data,
      referenceId: localRefId,
      status: 'pending_engineering_triage',
      department: '5-Axis CNC & Biomechanical R&D',
      clientTimestamp: timestamp,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    logFirebaseEvent('engineer_consult_submitted', {
      topic: data.topic,
      has_attachment: !!data.fileName,
      firestore_id: docRef.id,
    });

    return {
      success: true,
      referenceId: docRef.id || localRefId,
      storedInFirestore: true,
      timestamp,
      collection: 'engineer_inquiries',
    };
  } catch (error) {
    console.debug('[Kazon Dispatch] Queueing engineering consult locally:', error);
    saveOfflineBackup('kazon_offline_engineering_inquiries', { ...data, referenceId: localRefId, timestamp });

    return {
      success: true,
      referenceId: localRefId,
      storedInFirestore: false,
      timestamp,
      collection: 'engineer_inquiries',
    };
  }
}

/**
 * Persist Contact Desk Message to Firestore 'contact_messages' collection
 */
export async function submitContactMessageToFirestore(
  data: ContactMessagePayload
): Promise<SubmissionResult> {
  const localRefId = 'KZN-MSG-' + Date.now().toString(36).toUpperCase();
  const timestamp = new Date().toISOString();

  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...data,
      referenceId: localRefId,
      status: 'new_inquiry',
      clientTimestamp: timestamp,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    logFirebaseEvent('contact_message_submitted', {
      subject: data.subject,
      firestore_id: docRef.id,
    });

    return {
      success: true,
      referenceId: docRef.id || localRefId,
      storedInFirestore: true,
      timestamp,
      collection: 'contact_messages',
    };
  } catch (error) {
    console.debug('[Kazon Dispatch] Queueing contact message locally:', error);
    saveOfflineBackup('kazon_offline_contact_messages', { ...data, referenceId: localRefId, timestamp });

    return {
      success: true,
      referenceId: localRefId,
      storedInFirestore: false,
      timestamp,
      collection: 'contact_messages',
    };
  }
}

function saveOfflineBackup(key: string, item: any) {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(item);
    localStorage.setItem(key, JSON.stringify(existing.slice(-50)));
  } catch {
    // Ignore storage quota errors
  }
}
