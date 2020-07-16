import {
  createMockTheme,
  createMockSwatch,
  createMockSwatchColor,
  createMockColorTokenGroup,
  createMockColorToken,
} from "tests/utils";

import denormalize from "./denormalize";

import normalize from "./normalize";

describe("ThemeModule/normalization", () => {
  describe("consistency", () => {
    it("doesn't change/remove data during the process", () => {
      const theme = { id: 1, name: "mock theme" };

      const swatch = { id: 5, themeId: 1, name: "mock swatch" };
      const swatchColor1 = { id: 10, swatchId: 5, hex: "#ffffff" };
      const swatchColor2 = { id: 11, swatchId: 5, hex: "#111111" };
      const swatchColor3 = { id: 12, swatchId: 5, hex: "#ff0000" };
      const swatchColors = [swatchColor1, swatchColor2, swatchColor3];

      const colorTokenGroup = { id: 15, themeId: 1, name: "primary" };
      const colorTokenGroups = [colorTokenGroup];
      const colorTokenBackground = {
        id: 20,
        colorTokenGroupId: 15,
        name: "background",
        swatchColorId: 10,
      };
      const colorTokenForeground = {
        id: 21,
        colorTokenGroupId: 15,
        name: "foreground",
        swatchColorId: 11,
      };
      const colorTokenInteractive = {
        id: 22,
        colorTokenGroupId: 15,
        name: "interactive",
        swatchColorId: 12,
      };
      const colorTokens = [
        colorTokenBackground,
        colorTokenForeground,
        colorTokenInteractive,
      ];

      const input = {
        theme,
        swatch,
        swatchColors,
        colorTokenGroups,
        colorTokens,
      };

      const result = normalize(denormalize(input));
      expect(result).toEqual(input);
    });
  });
});
