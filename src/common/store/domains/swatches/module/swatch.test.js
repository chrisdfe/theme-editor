import * as SwatchModule from "./swatch";
import { v4 as uuid } from "uuid";

import { createMockSwatch } from "tests/utils";

jest.mock("uuid");

describe("SwatchModule", () => {
  describe("#create", () => {
    describe("creates a new module", () => {
      it("assigns an id", () => {
        const expectedId = 2;
        uuid.mockImplementationOnce(() => expectedId);
        const newSwatch = SwatchModule.create();
        expect(newSwatch.id).toEqual(expectedId);
      });

      it("using the supplied parameters", () => {
        const name = "Monokai";
        const swatchColorIds = [];

        const newSwatch = SwatchModule.create({
          name,
        });

        expect(newSwatch).toMatchObject({ name, swatchColorIds });
      });

      describe("if no parameters are provided", () => {
        it.each(["id", "name", "swatchColorIds"])(
          "sets a default %n field",
          (field) => {
            const newSwatch = SwatchModule.create();
            expect(newSwatch).toHaveProperty(field);
          }
        );
      });
    });
  });

  xdescribe("#createForTheme");

  describe("#validate", () => {
    describe("creates errors for missing required fields", () => {
      let result;

      beforeEach(() => {
        const allSwatches = [];
        const attributes = {};
        result = SwatchModule.validate(attributes, allSwatches);
      });

      it('has "required field" errors', () => {
        expect(result.errors).toHaveProperty("required");
      });

      it.each(["id", "name"])("(%s)", (fieldName) => {
        expect(result.errors.required).toContain(fieldName);
      });
    });

    describe("ensures that names are unique", () => {
      let result;

      beforeEach(() => {
        const allSwatches = [
          {
            id: 1,
            name: "Sunset",
            swatchColorIds: [],
          },
          {
            id: 2,
            name: "Gloom",
            swatchColorIds: [],
          },
        ];

        const newSwatch = { id: 3, name: "Gloom" };
        result = SwatchModule.validate(newSwatch, allSwatches);
      });

      it("has 'duplicate name' error", () => {
        expect(result.errors).toHaveProperty("duplicateName");
      });

      it("specifies the duplicate name error", () => {
        expect(result.errors.duplicateName).toContain("Gloom");
      });
    });
  });

  describe("#copy", () => {
    it("creates a copy of a given swatch", () => {
      const swatch = SwatchModule.create();
      const swatchCopy = SwatchModule.copy(swatch);
      expect(swatchCopy).toMatchObject(swatch);
    });
  });

  describe("#copyWithNewId", () => {
    let swatch;
    let expectedSwatchCopy;
    let swatchCopy;

    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);
      swatch = createMockSwatch({ id: 1, swatchColorIds: [1, 2, 3] });
      expectedSwatchCopy = createMockSwatch({
        id: 2,
        originalId: 1,
        swatchColorIds: [1, 2, 3],
      });
      swatchCopy = SwatchModule.copyWithNewId(swatch);
    });

    it("creates a copy of a given swatch", () => {
      expect(swatchCopy).toEqual(expectedSwatchCopy);
    });
  });
});
