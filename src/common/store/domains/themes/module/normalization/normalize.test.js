import normalize from "./normalize";

describe("ThemeModule/normalization", () => {
  describe("#normalize", () => {
    it("converts a denormalized theme object into store-friendly format", () => {
      const input = {
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

      const expectedResult = {
        theme: { id: 1, name: "mock theme" },
        swatch: { id: 5, themeId: 1, name: "mock swatch" },
        swatchColors: [
          { id: 10, swatchId: 5, hex: "#ffffff" },
          { id: 11, swatchId: 5, hex: "#111111" },
          { id: 12, swatchId: 5, hex: "#ff0000" },
        ],
        colorTokenGroups: [{ id: 15, name: "primary", themeId: 1 }],
        colorTokens: [
          {
            id: 20,
            name: "background",
            swatchColorId: 10,
            colorTokenGroupId: 15,
          },
          {
            id: 21,
            name: "foreground",
            swatchColorId: 11,
            colorTokenGroupId: 15,
          },
          {
            id: 22,
            name: "interactive",
            swatchColorId: 12,
            colorTokenGroupId: 15,
          },
        ],
      };

      const result = normalize(input);

      expect(result).toEqual(expectedResult);
    });
  });
});
