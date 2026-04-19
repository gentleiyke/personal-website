import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg site-navbar sticky-top py-3">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Ikemefula logo" className="navbar-logo" />
          <span className="fw-bold mb-0">Ikemefula Oriaku</span>
        </NavLink>

        <button
          className="navbar-toggler text-white border border-secondary"
          type="button"
          aria-controls="mainNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${menuOpen ? "show" : ""} collapse navbar-collapse`} id="mainNav">
          <div className="navbar-nav ms-auto gap-lg-3" onClick={() => setMenuOpen(false)}>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            <NavLink className="nav-link" to="/projects">
              Projects
            </NavLink>
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
            <NavLink className="nav-link" to="/blog">
              Blog
            </NavLink>
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}