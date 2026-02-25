/**
 * WhatsApp Lead Tracker
 * Logs every WhatsApp click to Firestore (whatsapp_leads collection)
 * Uses REST API to avoid SDK dependency issues with named database
 */

const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/taxedgmbh/databases/taxedgmbh/documents';

interface LeadData {
  source: string;
  page?: string;
  phoneNumber?: string;
  message?: string;
}

export function trackWhatsAppClick(data: LeadData): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      fields: {
        timestamp: { timestampValue: new Date().toISOString() },
        page: { stringValue: data.page || window.location.pathname },
        referrer: { stringValue: document.referrer || 'direct' },
        userAgent: { stringValue: navigator.userAgent },
        screenSize: { stringValue: `${screen.width}x${screen.height}` },
        language: { stringValue: navigator.language || 'unknown' },
        source: { stringValue: data.source },
        phoneNumber: { stringValue: data.phoneNumber || '' },
        utmSource: { stringValue: params.get('utm_source') || '' },
        utmMedium: { stringValue: params.get('utm_medium') || '' },
        utmCampaign: { stringValue: params.get('utm_campaign') || '' },
      },
    };

    fetch(`${FIRESTORE_BASE}/whatsapp_leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    // Silent fail — never block the user
  }
}
