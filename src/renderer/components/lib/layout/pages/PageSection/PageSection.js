import React from "react";
import classnames from "classnames";

import "./PageSection.css";

const PageSection = ({ children, className }) => {
  const wrapperClassName = classnames("PageSection", className);
  return <div className={wrapperClassName}>{children}</div>;
};

export default PageSection;
