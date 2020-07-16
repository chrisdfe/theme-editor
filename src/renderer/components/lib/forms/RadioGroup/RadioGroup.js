import React from "react";

import FormGroup from "../FormGroup";

import Radio from "./subcomponents/Radio";

import "./RadioGroup.css";

const RadioGroup = ({
  id,
  label,
  currentValue,
  onChange,
  options,
  ...other
}) => {
  return (
    <div className="RadioGroup">
      <fieldset>
        <legend>{label}</legend>
        {options.map((radioProps, index) => (
          <Radio
            {...radioProps}
            checked={radioProps.value === currentValue}
            onChange={onChange}
            key={radioProps.id}
          />
        ))}
      </fieldset>
    </div>
  );
};

RadioGroup.defaultProps = {
  options: [],
  onChange: () => {},
};

export default RadioGroup;
