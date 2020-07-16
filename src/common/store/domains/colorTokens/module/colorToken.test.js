import * as ColorTokenModule from "./colorToken";
import { v4 as uuid } from "uuid";

import { createMockColorToken } from "tests/utils";

jest.mock("uuid");

describe("ColorToken module", () => {
  xdescribe("#create", () => {
    describe("creates a new colorToken", () => {
      it("adds id attribute", () => {
        const attributes = { name: "foreground" };
        const newColorToken = ColorTokenModule.create(attributes);
        expect(newColorToken).toHaveProperty("id");
      });
    });
  });

  xdescribe("#validate", () => {
    xdescribe("required attributes");
    xdescribe("hex color");
  });

  describe("#getDefaultColorTokenNames", () => {
    it("returns an array of default colorToken names", () => {
      const names = ColorTokenModule.getDefaultColorTokenNames();
      expect(Array.isArray(names)).toBe(true);
    });
  });

  describe("#copy", () => {
    it("creates a copy of a given colorToken", () => {
      const colorToken = ColorTokenModule.create();
      const colorTokenCopy = ColorTokenModule.copy(colorToken);
      expect(colorTokenCopy).toMatchObject(colorToken);
    });
  });

  describe("#copyWithNewId", () => {
    let colorToken;
    let expectedColorTokenCopy;
    let colorTokenCopy;

    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);
      colorToken = createMockColorToken({ id: 1 });
      expectedColorTokenCopy = createMockColorToken({
        id: 2,
        originalId: 1,
      });
      colorTokenCopy = ColorTokenModule.copyWithNewId(colorToken);
    });

    it("creates a copy of a given colorToken", () => {
      expect(colorTokenCopy).toEqual(expectedColorTokenCopy);
    });
  });
});
