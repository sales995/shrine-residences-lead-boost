type DataLayerEntry = Record<string, unknown>;
type GTMWindow = Window & { dataLayer?: DataLayerEntry[] };

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const GTM_ENABLED = import.meta.env.VITE_ENABLE_GTM === "true" && Boolean(GTM_ID);

let gtmInitialized = false;

const getGTMWindow = () => window as GTMWindow;

const ensureDataLayer = () => {
  if (!isBrowser) return;
  getGTMWindow().dataLayer = getGTMWindow().dataLayer || [];
};

const insertNoScriptFallback = () => {
  if (!isBrowser || !GTM_ID || document.getElementById("gtm-noscript")) return;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";

  const noscript = document.createElement("noscript");
  noscript.id = "gtm-noscript";
  noscript.appendChild(iframe);

  document.body?.insertBefore(noscript, document.body.firstChild);
};

export const initGTM = () => {
  if (!isBrowser || !GTM_ENABLED || gtmInitialized || !GTM_ID) return;

  ensureDataLayer();
  getGTMWindow().dataLayer!.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  if (!document.getElementById("gtm-script")) {
    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head?.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertNoScriptFallback, { once: true });
  } else {
    insertNoScriptFallback();
  }

  gtmInitialized = true;
};

const pushEvent = (event: string, eventData?: Record<string, unknown>) => {
  if (!isBrowser || !GTM_ENABLED) return;
  ensureDataLayer();
  getGTMWindow().dataLayer!.push({
    event,
    ...eventData,
  });
};

export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  pushEvent(eventName, eventData);
};

export const trackLeadSubmission = (source: string, phone: string) => {
  trackEvent("lead_submit", {
    event_category: "Lead Generation",
    event_label: source,
    value: phone,
  });
};

export const trackBrochureDownload = (phone: string) => {
  trackEvent("brochure_download", {
    event_category: "Downloads",
    event_label: "Brochure & Floor Plan",
    value: phone,
  });
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent("whatsapp_click", {
    event_category: "Contact",
    event_label: source,
  });
};

export const trackPhoneClick = () => {
  trackEvent("phone_click", {
    event_category: "Contact",
    event_label: "Phone Call",
  });
};

export const trackSiteVisitRequest = () => {
  trackEvent("site_visit_request", {
    event_category: "Engagement",
    event_label: "Site Visit",
  });
};

export const isGTMEnabled = () => GTM_ENABLED;

