import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  const getActiveStyle = (path) => ({
    borderColor:
      location.pathname === path ? "var(--primary-color)" : "transparent",
    color:
      location.pathname === path ? "var(--primary-color)" : "var(--text-main)",
  });

  return (
    <nav>
      <Link to="/" style={getActiveStyle("/")}>
        Home
      </Link>
      <Link to="/detect" style={getActiveStyle("/detect")}>
        Disease Recognition
      </Link>
      <Link to="/about" style={getActiveStyle("/about")}>
        About
      </Link>
    </nav>
  );
}

export default Header;
