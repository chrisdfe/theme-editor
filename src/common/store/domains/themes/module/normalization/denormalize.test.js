import denormalize from "./denormalize";

describe("ThemeModule/normalization", () => {
  describe("#denormalize", () => {
    let theme;
    let swatch;
    let colorTokenGroups;
    let colorTokens;
    let result;
    let expectedResult;

    beforeEach(() => {
      const theme = { id: 1, name: "mock theme" };

      swatch = {
        id: 5,
        themeId: 1,
        name: "mock swatch",
        swatchColorIds: [10, 11, 12],
      };
      const swatchColor1 = { id: 10, swatchId: 5, hex: "#ffffff" };
      const swatchColor2 = { id: 11, swatchId: 5, hex: "#111111" };
      const swatchColor3 = { id: 12, swatchId: 5, hex: "#ff0000" };
      const swatchColors = [swatchColor1, swatchColor2, swatchColor3];

      const colorTokenGroup = { id: 15, themeId: 1, name: "primary" };
      colorTokenGroups = [colorTokenGroup];
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

      expectedResult = {
        id: 1,
        name: "mock theme",
        swatch: {
          id: 5,
          name: "mock swatch",
          swatchColors: [
            { id: 10, hex: "#ffffff" },
            { id: 11, hex: "#111111" },
            { id: 12, hex: "#ff0000" },
          ],
        },
        colorTokenGroups: [
          {
            id: 15,
            name: "primary",
            colorTokens: [
              {
                id: 20,
                name: "background",
                swatchColorId: 10,
              },
              {
                id: 21,
                name: "foreground",
                swatchColorId: 11,
              },
              {
                id: 22,
                name: "interactive",
                swatchColorId: 12,
              },
            ],
          },
        ],
      };

      result = denormalize({
        theme,
        swatch,
        swatchColors,
        colorTokenGroups,
        colorTokens,
      });
    });

    it("denormalizes a theme + its relations from the app state", () => {
      expect(result).toEqual(expectedResult);
    });

    describe("strips out extra fields", () => {
      it("swatch.themeId", () => {
        expect(result.swatch.themeId).toBeUndefined();
      });

      it("swatch.swatchColorIds", () => {
        expect(result.swatch.swatchColorIds).toBeUndefined();
      });
    });
  });
});
