import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  return (
    <nav>
      <Link
        to="/plantdiseasedetection/"
        style={{
          borderColor:
            location.pathname === "/plantdiseasedetection/"
              ? "#646cff"
              : "transparent",
        }}
      >
        Home
      </Link>

      <Link
        to="/plantdiseasedetection/detect"
        style={{
          borderColor:
            location.pathname === "/plantdiseasedetection/detect"
              ? "#646cff"
              : "transparent",
        }}
      >
        Plant Disease Detection
      </Link>

      <Link
        to="/plantdiseasedetection/about"
        style={{
          borderColor:
            location.pathname === "/plantdiseasedetection/about"
              ? "#646cff"
              : "transparent",
        }}
      >
        About
      </Link>
    </nav>
  );
}

export default Header;
