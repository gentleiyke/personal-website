import ReactGA from "react-ga4";

const measurementId =
  import.meta.env
    .VITE_GA_MEASUREMENT_ID;

let analyticsInitialised =
  false;


export function enableAnalytics() {
  if (!measurementId) {
    console.warn(
      "GA measurement ID is not configured."
    );

    return false;
  }


  /*
   * Remove any previous GA disable flag.
   */

  window[
    `ga-disable-${measurementId}`
  ] = false;


  if (!analyticsInitialised) {
    ReactGA.initialize(
      measurementId,
      {
        gaOptions: {
          anonymizeIp: true,
        },
      }
    );

    analyticsInitialised =
      true;
  }


  return true;
}


export function disableAnalytics() {
  if (!measurementId) {
    return;
  }

  /*
   * Google supports this flag for
   * disabling further analytics hits.
   */

  window[
    `ga-disable-${measurementId}`
  ] = true;
}


export function sendPageView(
  path
) {
  if (
    !analyticsInitialised ||
    !measurementId ||
    window[
      `ga-disable-${measurementId}`
    ]
  ) {
    return;
  }


  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
}


export {
  measurementId,
};