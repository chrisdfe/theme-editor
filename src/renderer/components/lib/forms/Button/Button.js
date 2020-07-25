import React from "react";
import classNames from "classnames";

import "./Button.css";

const Button = ({ children, size, ...other }) => {
  const className = classNames("Button", `Button--size-${size}`);

  return (
    <button className={className} {...other}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: "default",
};

export default Button;
