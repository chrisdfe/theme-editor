import * as ColorTokenGroupModule from "./colorTokenGroup";
import { v4 as uuid } from "uuid";

import { createMockColorTokenGroup } from "tests/utils";

jest.mock("uuid");

describe("ColorToken module", () => {
  describe("#create", () => {
    let newColorTokenGroup;
    beforeEach(() => {
      const attributes = { name: "primary" };
      newColorTokenGroup = ColorTokenGroupModule.create(attributes);
    });

    it.each(["id", "colorTokenIds"])("adds %s attribute", (attribute) => {
      expect(newColorTokenGroup).toHaveProperty(attribute);
    });
  });

  xdescribe("#createForTheme");
  xdescribe("#createColorTokensForGroup");

  describe("#validate", () => {
    describe("creates errors for missing required fields", () => {
      let result;

      beforeEach(() => {
        const allColorTokenGroups = [];
        const attributes = {};
        result = ColorTokenGroupModule.validate(
          attributes,
          allColorTokenGroups
        );
      });

      it('has "required field" errors', () => {
        expect(result.errors).toHaveProperty("required");
      });

      it.each(["id", "name"])("(%s)", (fieldName) => {
        expect(result.errors.required).toContain(fieldName);
      });
    });

    describe("#ensures that names are unique", () => {
      let result;
      beforeEach(() => {
        const allColorTokenGroups = [
          {
            id: 1,
            name: "primary",
          },
          {
            id: 2,
            name: "secondary",
          },
        ];

        const newColorTokenGroup = { id: 3, name: "primary" };
        result = ColorTokenGroupModule.validate(
          newColorTokenGroup,
          allColorTokenGroups
        );
      });

      it("has 'duplicate name' error", () => {
        expect(result.errors).toHaveProperty("duplicateName");
      });

      it("specifies the duplicate name error", () => {
        expect(result.errors.duplicateName).toContain("primary");
      });
    });
  });

  // i.e 'primary', 'secondary', 'tertiary', ?
  describe("#getNextName", () => {
    it("gets the next name in the list", () => {
      const allColorTokenGroups = [{ id: 1, name: "primary" }];
      const nextName = ColorTokenGroupModule.getNextName(allColorTokenGroups);
      expect(nextName).toEqual("secondary");
    });

    it.todo("handles 4+ names");
  });

  describe("#copy", () => {
    it("creates a copy of a given colorTokenGroup", () => {
      const colorTokenGroup = ColorTokenGroupModule.create();
      const colorTokenGroupCopy = ColorTokenGroupModule.copy(colorTokenGroup);
      expect(colorTokenGroupCopy).toMatchObject(colorTokenGroup);
    });
  });

  describe("#copyWithNewId", () => {
    let colorTokenGroup;
    let expectedColorTokenGroupCopy;
    let colorTokenGroupCopy;

    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);
      colorTokenGroup = createMockColorTokenGroup({ id: 1 });
      expectedColorTokenGroupCopy = createMockColorTokenGroup({
        id: 2,
        originalId: 1,
      });

      colorTokenGroupCopy = ColorTokenGroupModule.copyWithNewId(
        colorTokenGroup
      );
    });

    it("creates a copy of a given colorToken", () => {
      expect(colorTokenGroupCopy).toEqual(expectedColorTokenGroupCopy);
    });
  });
});
