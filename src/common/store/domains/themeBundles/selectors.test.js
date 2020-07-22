import * as themeBundleSelectors from "./selectors";

import {
  createMockTheme,
  createMockSwatch,
  createMockSwatchColor,
  createMockColorTokenGroup,
  createMockColorToken,
  createMockThemeBundle,
} from "tests/utils";

const createMockThemeBundleSlice = (
  { theme, swatch, swatchColors, colorTokenGroups, colorTokens },
  params = {}
) => ({
  themes: {
    byId: {
      [theme.id]: theme,
    },
    allIds: [theme.id],
  },
  swatches: {
    byId: {
      [swatch.id]: swatch,
    },
    allIds: [swatch.id],
  },
  swatchColors: {
    byId: swatchColors.reduce(
      (acc, swatchColor) => ({
        ...acc,
        [swatchColor.id]: swatchColor,
      }),
      {}
    ),
    allIds: swatchColors.map(({ id }) => id),
  },
  colorTokenGroups: {
    byId: colorTokenGroups.reduce(
      (acc, colorTokenGroup) => ({
        ...acc,
        [colorTokenGroup.id]: colorTokenGroup,
      }),
      {}
    ),
    allIds: colorTokenGroups.map(({ id }) => id),
  },
  colorTokens: {
    byId: colorTokens.reduce(
      (acc, colorToken) => ({
        ...acc,
        [colorToken.id]: colorToken,
      }),
      {}
    ),
    allIds: colorTokens.map(({ id }) => id),
  },
  ...params,
});

const getEditingThemeBundleState = (
  originalThemeBundle,
  modifiedThemeBundle
) => ({
  entities: {},
  editing: {
    themes: {
      byId: {
        [modifiedThemeBundle.theme.id]: modifiedThemeBundle.theme,
      },
      allIds: [modifiedThemeBundle.theme.id],
      originalState: {
        [modifiedThemeBundle.theme.id]: originalThemeBundle.theme,
      },
    },
    swatches: {
      byId: {
        [modifiedThemeBundle.swatch.id]: modifiedThemeBundle.swatch,
      },
      allIds: [modifiedThemeBundle.swatch.id],
      originalState: {
        [modifiedThemeBundle.swatch.id]: originalThemeBundle.swatch,
      },
    },
    swatchColors: {
      byId: modifiedThemeBundle.swatchColors.reduce(
        (acc, swatchColor) => ({
          ...acc,
          [swatchColor.id]: swatchColor,
        }),
        {}
      ),
      allIds: modifiedThemeBundle.swatchColors.map(({ id }) => id),
      originalState: originalThemeBundle.swatchColors.reduce(
        (acc, swatchColor) => ({
          ...acc,
          [swatchColor.id]: swatchColor,
        }),
        {}
      ),
    },
    colorTokenGroups: {
      byId: modifiedThemeBundle.colorTokenGroups.reduce(
        (acc, colorTokenGroup) => ({
          ...acc,
          [colorTokenGroup.id]: colorTokenGroup,
        }),
        {}
      ),
      allIds: modifiedThemeBundle.colorTokenGroups.map(({ id }) => id),
      originalState: originalThemeBundle.colorTokenGroups.reduce(
        (acc, colorTokenGroup) => ({
          ...acc,
          [colorTokenGroup.id]: colorTokenGroup,
        }),
        {}
      ),
    },
    colorTokens: {
      byId: modifiedThemeBundle.colorTokens.reduce(
        (acc, colorToken) => ({
          ...acc,
          [colorToken.id]: colorToken,
        }),
        {}
      ),
      allIds: modifiedThemeBundle.colorTokens.map(({ id }) => id),
      originalState: originalThemeBundle.colorTokens.reduce(
        (acc, colorToken) => ({
          ...acc,
          [colorToken.id]: colorToken,
        }),
        {}
      ),
    },
  },
});

describe("themeBundle selectors", () => {
  describe("#getThemeBundleByThemeId", () => {
    it("selects atheme bundle by theme id", () => {
      const themeBundle = createMockThemeBundle();

      const { theme } = themeBundle;

      const state = {
        entities: createMockThemeBundleSlice(themeBundle),
        editing: {},
      };

      expect(
        themeBundleSelectors.getThemeBundleByThemeId(state, theme.id)
      ).toEqual(themeBundle);
    });
  });

  describe("#getEditingThemeBundle", () => {
    it("selects the theme bundle currently being edited", () => {
      const themeBundle = createMockThemeBundle();

      const state = {
        entities: {},
        editing: createMockThemeBundleSlice(themeBundle),
      };

      expect(themeBundleSelectors.getEditingThemeBundle(state)).toEqual(
        themeBundle
      );
    });
  });

  describe("#getEditingThemeBundleOriginalState", () => {
    it("selects the original state of the current editing theme bundle", () => {
      const originalThemeBundle = createMockThemeBundle();
      const modifiedThemeBundle = {
        ...originalThemeBundle,
        theme: {
          ...originalThemeBundle.theme,
          name: "Updated theme name",
        },
        swatch: {
          ...originalThemeBundle.swatch,
          name: "Updated swatch name",
        },
      };

      const state = getEditingThemeBundleState(
        originalThemeBundle,
        modifiedThemeBundle
      );

      const expectedResult = originalThemeBundle;

      expect(
        themeBundleSelectors.getEditingThemeBundleOriginalState(state)
      ).toEqual(expectedResult);
    });
  });

  xdescribe("#getEditingThemeBundleDiff", () => {
    it("selects a diff betwen the current editing theme bundle and the original state", () => {
      const originalThemeBundle = createMockThemeBundle();
      const modifiedThemeBundle = {
        ...originalThemeBundle,
        theme: {
          ...originalThemeBundle.theme,
          name: "Updated theme name",
        },
        swatch: {
          ...originalThemeBundle.swatch,
          name: "Updated swatch name",
        },
      };

      const state = getEditingThemeBundleState(
        originalThemeBundle,
        modifiedThemeBundle
      );

      const expectedResult = {
        theme: {
          name: [
            originalThemeBundle.theme.name,
            modifiedThemeBundle.theme.name,
          ],
        },
        swatch: {
          name: [
            originalThemeBundle.swatch.name,
            modifiedThemeBundle.swatch.name,
          ],
        },
      };

      expect(themeBundleSelectors.getEditingThemeBundleDiff(state)).toEqual(
        expectedResult
      );
    });
  });

  describe("#getEditingThemeBundleHasChanges", () => {
    it("returns true if changes have been made", () => {
      const originalThemeBundle = createMockThemeBundle();
      const modifiedThemeBundle = {
        ...originalThemeBundle,
        theme: {
          ...originalThemeBundle.theme,
          name: "Updated theme name",
        },
        swatch: {
          ...originalThemeBundle.swatch,
          name: "Updated swatch name",
        },
      };

      const state = getEditingThemeBundleState(
        originalThemeBundle,
        modifiedThemeBundle
      );

      const expectedResult = true;

      expect(
        themeBundleSelectors.getEditingThemeBundleHasChanges(state)
      ).toEqual(expectedResult);
    });

    it("returns false if no changes have been made", () => {
      const originalThemeBundle = createMockThemeBundle();
      const modifiedThemeBundle = {
        ...originalThemeBundle,
      };

      const state = getEditingThemeBundleState(
        originalThemeBundle,
        modifiedThemeBundle
      );

      const expectedResult = false;

      expect(
        themeBundleSelectors.getEditingThemeBundleHasChanges(state)
      ).toEqual(expectedResult);
    });
  });
});
