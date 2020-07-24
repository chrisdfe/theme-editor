import { omit } from "lodash";

const denormalize = ({
  theme,
  swatch,
  swatchColors,
  colorTokenGroups,
  colorTokens,
}) => {
  // TODO - use SwatchModule.denormalize (except I still need to omit 'themeId' here)
  const cleanedSwatchColors = swatchColors.map((swatchColor) =>
    omit(swatchColor, "swatchId")
  );
  const cleanedSwatch = {
    ...omit(swatch, "themeId", "swatchColorIds"),
    swatchColors: cleanedSwatchColors,
  };

  const cleanedColorTokenGroups = colorTokenGroups.map((colorTokenGroup) => {
    const cleanedColorTokenGroup = omit(colorTokenGroup, "themeId");
    const cleanedColorTokens = colorTokens
      .filter(
        (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
      )
      .map((colorToken) => omit(colorToken, "colorTokenGroupId"));

    return {
      ...cleanedColorTokenGroup,
      colorTokens: cleanedColorTokens,
    };
  });

  return {
    ...theme,
    swatch: cleanedSwatch,
    colorTokenGroups: cleanedColorTokenGroups,
  };
};

export default denormalize;
