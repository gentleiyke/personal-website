import { ENABLE_SITE_GUIDE } from "./siteGuideConfig";

export default function SiteGuide() {
  if (!ENABLE_SITE_GUIDE) return null;

  // Future 3D guide architecture hooks:
  // 1. Lazy-load the React Three Fiber / Three.js renderer here.
  // 2. Attach the rigged GLB model and animation controller here.
  // 3. Attach route-aware navigation echo / page-context hooks here.
  // 4. Add opt-in, dismiss, keyboard controls and reduced-motion handling here.
  // 5. Add mobile / low-power fallback behaviour here.

  return null;
}
