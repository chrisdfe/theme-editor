import React from "react";
import classnames from "classnames";

import FormGroup from "../FormGroup";

import "./TextInput.css";

const TextInput = ({
  children,
  label,
  id,
  size,
  type,
  hideLabel,
  ...other
}) => {
  const className = classnames("TextInput", {
    [`TextInput--size-${size}`]: size,
  });

  return (
    <FormGroup label={label} id={id} hideLabel={hideLabel}>
      <input type="text" className={className} id={id} {...other}>
        {children}
      </input>
    </FormGroup>
  );
};

export default TextInput;
