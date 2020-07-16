import React from "react";

import "./Radio.css";

const Radio = ({ id, label, value, onChange, checked, ...other }) => {
  return (
    <div className="Radio" {...other}>
      <label className="Radio__label" htmlFor={id}>
        <input
          className="Radio__input"
          type="radio"
          id={id}
          name={id}
          value={value}
          checked={checked}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <div className="Radio__figure" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Radio;
