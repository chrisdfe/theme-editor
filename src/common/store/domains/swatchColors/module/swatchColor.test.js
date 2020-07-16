import { v4 as uuid } from "uuid";
import * as SwatchColorModule from "./swatchColor";

import { createMockSwatchColor } from "tests/utils";

jest.mock("uuid");

describe("SwatchColorModule", () => {
  xdescribe("#create", () => {
    xdescribe("creates a new module", () => {
      xit("using the supplied parameters");
      xit("using default parameters if none are provided");
    });
  });

  xdescribe("#validate", () => {
    xdescribe("required attributes");
    xdescribe("hex color");
  });

  describe("#copy", () => {
    it("creates a copy of a given swatchColor", () => {
      const swatchColor = SwatchColorModule.create();
      const swatchColorCopy = SwatchColorModule.copy(swatchColor);
      expect(swatchColorCopy).toMatchObject(swatchColor);
    });
  });

  describe("#copyWithNewId", () => {
    let swatchColor;
    let expectedSwatchColorCopy;
    let swatchColorCopy;

    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);
      swatchColor = createMockSwatchColor({ id: 1 });
      expectedSwatchColorCopy = createMockSwatchColor({
        id: 2,
        originalId: 1,
      });
      swatchColorCopy = SwatchColorModule.copyWithNewId(swatchColor);
    });

    it("creates a copy of a given swatchColor", () => {
      expect(swatchColorCopy).toEqual(expectedSwatchColorCopy);
    });
  });
});
