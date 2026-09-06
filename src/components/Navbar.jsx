import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const resourcePaths = ["/projects", "/publications", "/blog"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const resourcesActive = resourcePaths.some((path) => location.pathname.startsWith(path));

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg site-navbar sticky-top py-3" aria-label="Primary navigation">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
          <img src={logo} alt="Ikemefula Oriaku logo" className="navbar-logo" />
          <span className="brand-name">Ikemefula Oriaku</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`${menuOpen ? "show" : ""} collapse navbar-collapse`} id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className="nav-link" to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about" onClick={closeMenu}>
              About
            </NavLink>
            <NavLink className="nav-link" to="/services" onClick={closeMenu}>
              Services
            </NavLink>

            <div className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle btn btn-link ${resourcesActive ? "active" : ""}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources
              </button>
              <ul className="dropdown-menu dropdown-menu-end site-dropdown">
                <li>
                  <NavLink className="dropdown-item" to="/projects" onClick={closeMenu}>
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/publications" onClick={closeMenu}>
                    Publications
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/blog" onClick={closeMenu}>
                    Blog
                  </NavLink>
                </li>
              </ul>
            </div>

            <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
