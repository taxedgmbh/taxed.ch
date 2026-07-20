/**
 * WhatsApp Lead Tracker
 * Logs every WhatsApp click to our own backend (/api/whatsapp-lead.php),
 * which stores the lead on the server and notifies info@taxed.ch.
 * (The previous Firestore integration was rejected by security rules,
 * so no lead was ever stored.)
 */

interface LeadData {
  source: string;
  page?: string;
  phoneNumber?: string;
  message?: string;
}

export function trackWhatsAppClick(data: LeadData): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const lead = JSON.stringify({
      page: data.page || window.location.pathname + window.location.search,
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      screenSize: `${screen.width}x${screen.height}`,
      language: navigator.language || 'unknown',
      source: data.source,
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    });

    // sendBeacon survives the page losing focus when WhatsApp opens
    if (!(navigator.sendBeacon && navigator.sendBeacon('/api/whatsapp-lead.php', lead))) {
      fetch('/api/whatsapp-lead.php', { method: 'POST', body: lead, keepalive: true }).catch(() => {});
    }
  } catch {
    // Silent fail — never block the user
  }
}
