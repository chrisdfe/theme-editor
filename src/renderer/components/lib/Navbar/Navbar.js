import React from "react";

import "./Navbar.css";

const Navbar = ({ children }) => {
  return (
    <div className="Navbar">
      <div className="Navbar__body">{children}</div>
    </div>
  );
};

export default Navbar;
