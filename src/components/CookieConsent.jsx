import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  getStoredConsent,
  saveConsent,
} from "../utils/consent";


export default function CookieConsent() {
  const [
    consent,
    setConsent,
  ] = useState(null);

  const [
    bannerVisible,
    setBannerVisible,
  ] = useState(false);

  const [
    preferencesOpen,
    setPreferencesOpen,
  ] = useState(false);

  const [
    analyticsEnabled,
    setAnalyticsEnabled,
  ] = useState(false);


  useEffect(() => {
    const stored =
      getStoredConsent();

    if (stored) {
      setConsent(stored);

      setAnalyticsEnabled(
        stored.analytics
      );

      return;
    }

    setBannerVisible(true);
  }, []);


  useEffect(() => {
    function openPreferences() {
      const stored =
        getStoredConsent();

      setAnalyticsEnabled(
        stored?.analytics ??
          false
      );

      setPreferencesOpen(
        true
      );
    }


    window.addEventListener(
      "open-cookie-settings",
      openPreferences
    );


    return () => {
      window.removeEventListener(
        "open-cookie-settings",
        openPreferences
      );
    };
  }, []);


  function acceptAnalytics() {
    const updated =
      saveConsent({
        analytics: true,
      });

    setConsent(updated);

    setAnalyticsEnabled(
      true
    );

    setBannerVisible(
      false
    );

    setPreferencesOpen(
      false
    );
  }


  function essentialOnly() {
    const updated =
      saveConsent({
        analytics: false,
      });

    setConsent(updated);

    setAnalyticsEnabled(
      false
    );

    setBannerVisible(
      false
    );

    setPreferencesOpen(
      false
    );
  }


  function savePreferences() {
    const updated =
      saveConsent({
        analytics:
          analyticsEnabled,
      });

    setConsent(updated);

    setBannerVisible(
      false
    );

    setPreferencesOpen(
      false
    );
  }


  return (
    <>
      {/* =========================
          COOKIE BANNER
      ========================== */}

      {bannerVisible && (
        <section
          className="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
        >
          <div className="container">

            <div className="cookie-banner-inner">

              <div className="cookie-banner-copy">

                <p
                  id="cookie-banner-title"
                  className="cookie-banner-title"
                >
                  Your privacy choices
                </p>

                <p>
                  This website uses essential
                  technologies for basic
                  functionality. With your
                  permission, I also use
                  Google Analytics to understand
                  how visitors use the site.
                </p>

                <p>
                  You can accept analytics,
                  continue with essential
                  technologies only, or manage
                  your preferences.{" "}
                  <Link to="/privacy">
                    Privacy Policy
                  </Link>
                </p>

              </div>


              <div className="cookie-banner-actions">

                <button
                  type="button"
                  className="cookie-button cookie-button-secondary"
                  onClick={
                    essentialOnly
                  }
                >
                  Essential only
                </button>


                <button
                  type="button"
                  className="cookie-button cookie-button-secondary"
                  onClick={() =>
                    setPreferencesOpen(
                      true
                    )
                  }
                >
                  Manage preferences
                </button>


                <button
                  type="button"
                  className="cookie-button cookie-button-primary"
                  onClick={
                    acceptAnalytics
                  }
                >
                  Accept analytics
                </button>

              </div>

            </div>

          </div>
        </section>
      )}


      {/* =========================
          PREFERENCES MODAL
      ========================== */}

      {preferencesOpen && (
        <div
          className="cookie-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setPreferencesOpen(
                false
              );
            }
          }}
        >

          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >

            <div className="cookie-modal-header">

              <div>

                <p className="section-eyebrow">
                  Privacy
                </p>

                <h2
                  id="cookie-modal-title"
                >
                  Cookie preferences
                </h2>

              </div>


              <button
                type="button"
                className="cookie-modal-close"
                aria-label="Close cookie preferences"
                onClick={() =>
                  setPreferencesOpen(
                    false
                  )
                }
              >
                ×
              </button>

            </div>


            <div className="cookie-modal-body">

              {/* ESSENTIAL */}

              <div className="cookie-preference-row">

                <div className="cookie-preference-copy">

                  <h3>
                    Essential
                  </h3>

                  <p>
                    Required for basic site
                    functionality and privacy
                    preference storage. These
                    cannot be switched off.
                  </p>

                </div>


                <div className="cookie-preference-status">
                  Always on
                </div>

              </div>


              {/* ANALYTICS */}

              <div className="cookie-preference-row">

                <div className="cookie-preference-copy">

                  <h3>
                    Analytics
                  </h3>

                  <p>
                    Allows Google Analytics 4
                    to measure website usage
                    and help improve the site.
                  </p>

                </div>


                <label
                  className="cookie-switch"
                >

                  <span className="visually-hidden">
                    Enable analytics
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      analyticsEnabled
                    }
                    onChange={(event) =>
                      setAnalyticsEnabled(
                        event.target.checked
                      )
                    }
                  />

                  <span
                    className="cookie-switch-slider"
                    aria-hidden="true"
                  />

                </label>

              </div>


              <p className="cookie-modal-note">
                You can change these
                preferences at any time.
                See the{" "}
                <Link to="/privacy">
                  Privacy Policy
                </Link>{" "}
                for more information.
              </p>

            </div>


            <div className="cookie-modal-footer">

              <button
                type="button"
                className="cookie-button cookie-button-secondary"
                onClick={
                  essentialOnly
                }
              >
                Essential only
              </button>


              <button
                type="button"
                className="cookie-button cookie-button-primary"
                onClick={
                  savePreferences
                }
              >
                Save preferences
              </button>

            </div>

          </section>

        </div>
      )}
    </>
  );
}