import * as ThemeModule from "./theme";
import { omit } from "lodash";
import { v4 as uuid } from "uuid";

import { createMockTheme } from "tests/utils";

jest.mock("uuid");

describe("ThemeModule", () => {
  xdescribe("#create");

  describe("#validate", () => {
    describe("creates errors for missing required fields", () => {
      let result;

      beforeEach(() => {
        const attributes = {};
        const allThemes = [];
        result = ThemeModule.validate(attributes, allThemes);
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
        const newTheme = { id: 3, name: "conflicting name theme" };

        const allThemes = [
          {
            id: 1,
            name: "Monokai",
          },
          {
            id: 2,
            name: "conflicting name theme",
          },
        ];

        result = ThemeModule.validate(newTheme, allThemes);
      });

      it("has 'duplicate name' error", () => {
        expect(result.errors).toHaveProperty("duplicateName");
      });

      it("specifies the duplicate name error", () => {
        expect(result.errors.duplicateName).toContain("conflicting name theme");
      });
    });
  });

  describe("#copy", () => {
    it("creates a copy of a given theme", () => {
      const theme = createMockTheme();
      const themeCopy = ThemeModule.copy(theme);
      expect(themeCopy).toMatchObject(theme);
    });
  });

  describe("#copyWithNewId", () => {
    let theme;
    let expectedThemeCopy;
    let themeCopy;

    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);
      theme = createMockTheme({ id: 1 });
      expectedThemeCopy = createMockTheme({
        id: 2,
        originalId: 1,
      });
      themeCopy = ThemeModule.copyWithNewId(theme);
    });

    it("creates a copy of a given theme", () => {
      expect(themeCopy).toEqual(expectedThemeCopy);
    });
  });
});
