import React from "react";

import "./ColorSlider.css";

// TODO
// Rounds a float to 4 decimal places
// 1) move to utils
// 2) # decimal places param
// const roundFloat = (number) =>
//   Math.round((number + Number.EPSILON) * 10000) / 10000;

// TODO
// 1) Add number input
// 2) Genericize - this could be a 'RangeInput'
// 3) Spruce up with CSS
const ColorSlider = ({ id, label, min, max, step, value, onChange }) => {
  return (
    <div className="ColorSlider">
      <label className="ColorSlider__label" htmlFor={id}>
        <span className="ColorSlider__label-text">{label}</span>
        <input
          className="ColorSlider__input"
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const { value } = e.target;
            // const valueAsInteger = parseFloat(value);
            onChange(valueAsInteger);
          }}
        />
      </label>
    </div>
  );
};

ColorSlider.defaultProps = {
  min: 0,
  max: 255,
  step: 1,
};

export default ColorSlider;
