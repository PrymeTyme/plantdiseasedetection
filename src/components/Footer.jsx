import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">All rights reserved copyright © {currentYear}</div>
  );
}

export default Footer;
