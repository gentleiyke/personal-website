export const CONSENT_STORAGE_KEY =
  "ikemefula-cookie-consent";

export const CONSENT_VERSION = 1;

export function getStoredConsent() {
  try {
    const stored =
      localStorage.getItem(
        CONSENT_STORAGE_KEY
      );

    if (!stored) {
      return null;
    }

    const parsed =
      JSON.parse(stored);

    if (
      parsed.version !==
      CONSENT_VERSION
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}


export function saveConsent({
  analytics,
}) {
  const consent = {
    version:
      CONSENT_VERSION,

    essential: true,

    analytics:
      Boolean(analytics),

    updatedAt:
      new Date().toISOString(),
  };

  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify(consent)
  );

  window.dispatchEvent(
    new CustomEvent(
      "site-consent-change",
      {
        detail: consent,
      }
    )
  );

  return consent;
}


export function clearConsent() {
  localStorage.removeItem(
    CONSENT_STORAGE_KEY
  );

  window.dispatchEvent(
    new CustomEvent(
      "site-consent-reset"
    )
  );
}