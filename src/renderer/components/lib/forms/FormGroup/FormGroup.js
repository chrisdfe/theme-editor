import React from "react";
import classnames from "classnames";

import "./FormGroup.css";

const FormGroup = ({ id, label, children, hideLabel, ...other }) => {
  const labelClassName = classnames("FormGroup__label", {
    "FormGroup__label--hidden": hideLabel,
  });
  return (
    <div className="FormGroup" {...other}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <div className="FormGroup__input-wrapper">{children}</div>
    </div>
  );
};

FormGroup.defaultProps = {
  hideLabel: false,
};

export default FormGroup;
