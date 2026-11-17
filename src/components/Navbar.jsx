import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/stackly_logo_black.webp"

export default function Navbar({ count }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = ({ isActive }) => (isActive ? "active" : "");
  const close = () => setOpen(false);

  return (
    <header className={scrolled ? "nav scrolled" : "nav"}>
      <div className="nav-inner">
        {/* Replace public/logo-dark.svg with your logo for the white header (or change the src below) */}
        <NavLink to="/" className="logo-link" onClick={close} aria-label="Home">
          <img src={logo} alt="Company logo" className="logo" />
        </NavLink>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? "links open" : "links"}>
          <NavLink to="/" end className={link} onClick={close}>Home</NavLink>
          <NavLink to="/explore" className={link} onClick={close}>Explore Events</NavLink>
          <NavLink to="/registrations" className={link} onClick={close}>
            My Registrations {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
