import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

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
      <Navbar />
      <Outlet />
      <footer className="footer py-5 mt-5">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-md-6">
              <p className="mb-0">© {new Date().getFullYear()} Ikemefula Oriaku</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-social-links d-flex flex-wrap justify-content-md-end gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-social-link"
                    aria-label={social.label}
                  >
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}