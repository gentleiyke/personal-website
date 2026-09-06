import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SiteGuide from "./site-guide/SiteGuide";

const socialLinks = [
  { label: "Facebook", url: "https://www.facebook.com/gentleiykeo", icon: "fab fa-facebook-f" },
  { label: "X", url: "https://x.com/gentle_iyke", icon: "fab fa-twitter" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/gentleiyke", icon: "fab fa-linkedin-in" },
  { label: "GitHub", url: "https://github.com/gentleiyke", icon: "fab fa-github" },
  { label: "YouTube", url: "https://www.youtube.com/@Ikemefulaoriaku", icon: "fab fa-youtube" },
  { label: "TikTok", url: "https://www.tiktok.com/@ikemefulaoriaku", icon: "fab fa-tiktok" },
];

export default function Layout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>

      <footer className="footer py-5 mt-5">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-7">
              <p className="footer-brand mb-2">Ikemefula Oriaku</p>
              <p className="footer-copy mb-0">
                Data & analytics, development, and education brought together through one practical, evidence-led professional brand.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="footer-social-links d-flex flex-wrap justify-content-lg-end gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link"
                    aria-label={social.label}
                  >
                    <i className={social.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-meta d-flex flex-column flex-md-row justify-content-between gap-2 mt-4 pt-4">
            <p className="mb-0">© {new Date().getFullYear()} Ikemefula Oriaku. All rights reserved.</p>
            <p className="mb-0">Built with React, Vite, Bootstrap and custom CSS.</p>
          </div>
        </div>
      </footer>

      <SiteGuide />
    </div>
  );
}
