import normalize from "./normalize";

describe("SwatchModule/normalization", () => {
  describe("#normalize", () => {
    it("normalizes a denormalzed swatch", () => {
      const swatch = {
        id: 5,
        name: "mock swatch",
        swatchColors: [
          { id: 10, hex: "#ffffff" },
          { id: 11, hex: "#111111" },
          { id: 12, hex: "#ff0000" },
        ],
      };

      const expectedResult = {
        swatch: {
          id: 5,
          name: "mock swatch",
          swatchColorIds: [10, 11, 12],
        },
        swatchColors: [
          { id: 10, hex: "#ffffff", swatchId: 5 },
          { id: 11, hex: "#111111", swatchId: 5 },
          { id: 12, hex: "#ff0000", swatchId: 5 },
        ],
      };

      const result = normalize({ swatch });

      expect(result).toEqual(expectedResult);
    });
  });
});
