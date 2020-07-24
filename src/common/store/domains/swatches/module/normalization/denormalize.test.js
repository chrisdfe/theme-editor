import denormalize from "./denormalize";

describe("SwatchModule/normalization", () => {
  describe("#denormalize", () => {
    it("denormalizes a swatch + swatchColors", () => {
      const swatch = {
        id: 5,
        name: "mock swatch",
        swatchColorIds: [10, 11, 12],
      };
      const swatchColor1 = { id: 10, swatchId: 5, hex: "#ffffff" };
      const swatchColor2 = { id: 11, swatchId: 5, hex: "#111111" };
      const swatchColor3 = { id: 12, swatchId: 5, hex: "#ff0000" };
      const swatchColors = [swatchColor1, swatchColor2, swatchColor3];

      const expectedResult = {
        id: 5,
        name: "mock swatch",
        swatchColors: [
          { id: 10, hex: "#ffffff" },
          { id: 11, hex: "#111111" },
          { id: 12, hex: "#ff0000" },
        ],
      };

      const result = denormalize({ swatch, swatchColors });
      expect(result).toEqual(expectedResult);
    });
  });
});
