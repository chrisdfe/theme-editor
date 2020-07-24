import { omit } from "lodash";

const normalize = ({ swatch }) => {
  const { swatchColors } = swatch;

  const normalizedSwatchColors = swatchColors.map((swatchColor) => ({
    ...swatchColor,
    swatchId: swatch.id,
  }));

  const normalizedSwatch = {
    ...omit(swatch, "swatchColors"),
    swatchColorIds: swatchColors.map(({ id }) => id),
  };

  return {
    swatch: normalizedSwatch,
    swatchColors: normalizedSwatchColors,
  };
};

export default normalize;
