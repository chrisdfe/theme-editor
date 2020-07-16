import React from "react";
import chroma from "chroma-js";

import ColorSlider from "../ColorSlider";

import "./RGBAControls.css";

const chromaColorFromRGBA = (rgba) => {
  const [red, green, blue, alpha] = rgba;
  return chroma([red, green, blue]).alpha(alpha);
};

const RGBAControls = ({ name, rgba, onRGBAChange }) => {
  const [red, green, blue, alpha] = rgba;

  return (
    <div className="TokenCard__controls TokenCard__controls--rgba">
      <ColorSlider
        id={`${name}-red`}
        label="red"
        value={red}
        onChange={(newRed) => {
          onRGBAChange([newRed, green, blue, alpha]);
        }}
      />

      <ColorSlider
        id={`${name}-green`}
        label="green"
        value={green}
        onChange={(newGreen) => {
          onRGBAChange([red, newGreen, blue, alpha]);
        }}
      />

      <ColorSlider
        id={`${name}-blue`}
        label="blue"
        value={blue}
        onChange={(newBlue) => {
          onRGBAChange([red, green, newBlue, alpha]);
        }}
      />

      <ColorSlider
        id={`${name}-alpha`}
        label="alpha"
        min={0}
        max={1}
        step={0.05}
        value={alpha}
        onChange={(newAlpha) => {
          onRGBAChange([red, green, blue, newAlpha]);
        }}
      />
    </div>
  );
};

export default RGBAControls;
