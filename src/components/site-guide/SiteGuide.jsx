import {
  ENABLE_SITE_GUIDE,
} from "./siteGuideConfig";

export default function SiteGuide() {
  if (!ENABLE_SITE_GUIDE) {
    return null;
  }

  /*
   * FUTURE SITE GUIDE ARCHITECTURE
   *
   * 1. 3D MODEL
   *    A lazy-loaded React Three Fiber / Three.js
   *    renderer and rigged GLB avatar will attach here.
   *
   * 2. ANIMATION CONTROLLER
   *    Idle, greeting, pointing and navigation
   *    animations will be managed separately from the
   *    page components.
   *
   * 3. NAVIGATION-ECHO HOOKS
   *    The guide may observe React Router location
   *    changes so it can optionally acknowledge or
   *    introduce sections.
   *
   * 4. VOICE
   *    Optional navigation cues should remain opt-in
   *    and muted by default.
   *
   * 5. ACCESSIBILITY
   *    The enabled guide must:
   *    - be dismissible
   *    - support keyboard controls
   *    - respect prefers-reduced-motion
   *    - never trap focus
   *
   * 6. PERFORMANCE
   *    The 3D implementation must be lazy-loaded and
   *    must never block the initial site render.
   *
   * 7. MOBILE / LOW POWER
   *    The guide should either simplify or disable
   *    itself on smaller or resource-constrained
   *    devices.
   */

  return null;
}