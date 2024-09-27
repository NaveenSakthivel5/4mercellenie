import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Logo from "./assets/Logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header" style={{ margin: 0, position:'' }}>
      <Link to="/">
        <img className="layer-1" src={Logo} alt="Layer 1 Logo" />
      </Link>
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div className="about-contact">
          
          <Link to="/about" className="link link--helike">
            <span>About</span>
          </Link>
          <span className="separator1"> - </span>
          
          <Link to="/contact" className="link link--helike">
            <span>Contact</span>
          </Link>
        </div>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        <span className={`bar ${menuOpen ? "open" : ""}`}></span>
      </div>
    </header>
  );
};

export default Header;
