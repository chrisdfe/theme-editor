import { omit } from "lodash";

const denormalize = ({ swatch, swatchColors }) => {
  const cleanedSwatchColors = swatchColors
    .filter((swatchColor) => swatch.swatchColorIds.includes(swatchColor.id))
    .map((swatchColor) => omit(swatchColor, "swatchId"));

  const cleanedSwatch = {
    ...omit(swatch, "swatchColorIds"),
    swatchColors: cleanedSwatchColors,
  };

  return cleanedSwatch;
};

export default denormalize;
