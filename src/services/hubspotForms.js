// Native submission to the HubSpot Forms API (EU data residency).
// Replaces the hosted share-page iframes so forms render in the site's
// own design while keeping the same HubSpot CRM pipeline and tracking.

export const HUBSPOT_PORTAL_ID = '144079809';

export const HUBSPOT_FORMS = {
  contact: 'c40d0d42-b00b-4e85-b934-7ec291ab5758',
  newsletter: 'b884ed00-41ce-4bc3-8e68-13faec766761'
};

const getHubspotCookie = () => {
  const match = document.cookie.match(/(^|;\s*)hubspotutk=([^;]*)/);
  return match ? match[2] : undefined;
};

/**
 * Submit fields to a HubSpot form.
 * @param {string} formId - HubSpot form GUID
 * @param {Record<string, string>} fields - field name -> value
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export const submitHubSpotForm = async (formId, fields) => {
  const url = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`;

  const context = {
    pageUri: window.location.href,
    pageName: document.title
  };
  const hutk = getHubspotCookie();
  if (hutk) context.hutk = hutk;

  const body = {
    fields: Object.entries(fields)
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
      .map(([name, value]) => ({ objectTypeId: '0-1', name, value: String(value).trim() })),
    context
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (response.ok) {
    const data = await response.json().catch(() => ({}));
    return { ok: true, message: data.inlineMessage };
  }

  const error = await response.json().catch(() => ({}));
  return {
    ok: false,
    message: error?.errors?.map((e) => e.message).join('; ') || `Submission failed (${response.status})`
  };
};
