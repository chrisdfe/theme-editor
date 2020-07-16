import * as selectors from "./selectors";

import { createMockColorToken, createMockSwatchColor } from "tests/utils";

const createEmptyState = () => ({
  entities: {
    colorTokens: {
      byId: {},
      allIds: [],
    },
  },
});

describe("colorToken selectors", () => {
  xdescribe("#getColorTokens");

  describe("#getColorTokensList", () => {
    it("returns an array of colorTokens", () => {
      const colorToken1 = createMockColorToken();
      const colorToken2 = createMockColorToken();

      const state = {
        entities: {
          colorTokens: {
            byId: {
              [colorToken1.id]: colorToken1,
              [colorToken2.id]: colorToken2,
            },
            allIds: [colorToken1.id, colorToken2.id],
          },
        },
      };

      const expectedResult = [colorToken1, colorToken2];

      const result = selectors.getColorTokensList(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getColorTokenSwatchColor", () => {
    it("returns the colorToken's associated swatchColor", () => {
      const swatchColor = createMockSwatchColor({ id: 5 });
      const otherSwatchColor = createMockSwatchColor({ id: 1 });
      const colorToken = createMockColorToken({
        swatchColorId: swatchColor.id,
      });

      const state = {
        entities: {
          swatchColors: {
            byId: {
              [swatchColor.id]: swatchColor,
              [otherSwatchColor.id]: otherSwatchColor,
            },
            allIds: [swatchColor.id, otherSwatchColor],
          },
          colorTokens: {
            byId: {
              [colorToken.id]: colorToken,
            },
            allIds: [colorToken.id],
          },
        },
      };

      const expectedResult = swatchColor;
      expect(selectors.getColorTokenSwatchColor(state, colorToken)).toEqual(
        expectedResult
      );
    });
  });

  describe("#getEditingColorTokens", () => {
    it("returns the colorTokens editing state", () => {
      const mockColorToken = createMockColorToken();
      const colorTokens = [mockColorToken];

      const state = {
        entities: {},
        editing: {
          colorTokens: {
            byId: {
              [mockColorToken.id]: mockColorToken,
            },
            allIds: [mockColorToken.id],
          },
        },
      };

      const expectedResult = {
        byId: {
          [mockColorToken.id]: mockColorToken,
        },
        allIds: [mockColorToken.id],
      };

      const result = selectors.getEditingColorTokens(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingColorTokensList", () => {
    it("returns an array of editing color tokens", () => {
      const mockColorToken = createMockColorToken();
      const colorTokens = [mockColorToken];

      const state = {
        entities: {},
        editing: {
          colorTokens: {
            byId: {
              [mockColorToken.id]: mockColorToken,
            },
            allIds: [mockColorToken.id],
          },
        },
      };

      const expectedResult = colorTokens;

      const result = selectors.getEditingColorTokensList(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("#getEditingColorTokensOriginalState", () => {
    it("returns the edited color tokens' original state", () => {
      const originalColorToken = createMockColorToken();
      const originalColorTokens = [originalColorToken];
      const modifiedColorToken = {
        ...originalColorToken,
        name: "secondary",
      };

      const state = {
        entities: {},
        editing: {
          colorTokens: {
            byId: {
              [originalColorToken.id]: modifiedColorToken,
            },
            allIds: [originalColorToken.id],
            originalState: {
              [originalColorToken.id]: originalColorToken,
            },
          },
        },
      };

      const expectedResult = originalColorTokens;

      expect(selectors.getEditingColorTokensOriginalState(state)).toEqual(
        expectedResult
      );
    });
  });
});
