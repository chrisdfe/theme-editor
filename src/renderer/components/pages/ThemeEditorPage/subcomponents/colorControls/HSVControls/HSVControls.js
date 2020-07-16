import React from "react";
import chroma from "chroma-js";

import "./HSVControls.css";

import ColorSlider from "../ColorSlider";

const chromaColorFromHSV = (hsv, alpha) => {
  const [hue, saturation, value] = hsv;
  return chroma.hsv(hue, saturation, value).alpha(alpha);
};

const HSVControls = ({ rgba, onRGBAChange }) => {
  // HSV doesn't contain alpha information so we'll need to save this
  // value for the onRGBAChange callback
  const [red, green, blue, alpha] = rgba;
  const chromaColor = chromaColorFromRGBA(rgba);
  const [hue, saturation, value] = chromaColor.hsv();

  return (
    <div className="TokenCard__controls TokenCard__controls--hsl">
      <ColorSlider
        id={`${name}-hue`}
        label="hue"
        value={hue}
        min={0}
        max={360}
        step={1}
        onChange={(newHue) => {
          // TODO - prevent chroma's very clever 'NaN' values from messing
          // things up here (i.e don't any of these to a new value if it is NaN)
          // const newHSL = avoidNaNHSVValues(
          //   [newHue, saturation, value],
          //   [hue, saturation, value]
          // );
          const newColor = chromaColorFromHSV(newHSL, alpha);
          const newRGBA = newColor.rgba();
          onRGBAChange(newRGBA);
        }}
      />

      <ColorSlider
        id={`${name}-saturation`}
        label="sat"
        value={saturation}
        min={0}
        max={1}
        step={0.01}
        onChange={(newSaturation) => {
          const newColor = chromaColorFromHSV(
            [hue, newSaturation, value],
            alpha
          );
          console.log("newColor", newColor.hsl());

          onRGBAChange(newColor.rgba());
        }}
      />

      <ColorSlider
        id={`${name}-value`}
        label="value"
        value={value}
        min={0}
        max={1}
        step={0.01}
        onChange={(newValue) => {
          const newColor = chromaColorFromHSV(
            [hue, saturation, newValue],
            alpha
          );
          const newRGBA = newColor.rgba();
          onRGBAChange(newRGBA);
        }}
      />

      <ColorSlider
        id={`${name}-alpha`}
        label="alpha"
        min={0}
        max={1}
        step={0.1}
        value={alpha}
        onChange={(newAlpha) => {
          onRGBAChange([red, green, blue, newAlpha]);
        }}
      />
    </div>
  );
};

export default HSVControls;
