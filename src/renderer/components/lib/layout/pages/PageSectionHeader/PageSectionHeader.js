import React from "react";

import "./PageSectionHeader.css";

const PageSectionHeader = ({ children }) => {
  return (
    <div className="PageSectionHeader">
      <h2>{children}</h2>
    </div>
  );
};

export default PageSectionHeader;
