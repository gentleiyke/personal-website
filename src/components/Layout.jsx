import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import SiteGuide from "./site-guide/SiteGuide";

export default function Layout() {
  return (
    <div className="site-shell">

      <a
        className="skip-link"
        href="#main-content"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Outlet />
      </main>

      <SiteGuide />

      <Footer />

    </div>
  );
}