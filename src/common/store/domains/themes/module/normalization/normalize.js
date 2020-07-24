import { omit } from "lodash";

const normalize = (theme) => {
  const { swatch, colorTokenGroups } = theme;
  const { swatchColors } = swatch;

  const cleanedTheme = omit(theme, "swatch", "colorTokenGroups");

  // TODO - use SwatchModule.normalize (except with added themeId)
  const cleanedSwatch = {
    ...omit(swatch, "swatchColors"),
    themeId: theme.id,
  };

  const cleanedSwatchColors = swatchColors.map((swatchColor) => ({
    ...swatchColor,
    swatchId: swatch.id,
  }));

  const cleanedColorTokens = colorTokenGroups.reduce(
    (acc, { id, colorTokens }) => {
      const colorTokenGroupColorTokens = colorTokens.map((colorToken) => ({
        ...colorToken,
        colorTokenGroupId: id,
      }));
      return [...acc, ...colorTokenGroupColorTokens];
    },
    []
  );

  const cleanedColorTokenGroups = colorTokenGroups.map((colorTokenGroup) => ({
    ...omit(colorTokenGroup, "colorTokens"),
    themeId: theme.id,
  }));

  return {
    theme: cleanedTheme,
    swatch: cleanedSwatch,
    swatchColors: cleanedSwatchColors,
    colorTokens: cleanedColorTokens,
    colorTokenGroups: cleanedColorTokenGroups,
  };
};

export default normalize;
