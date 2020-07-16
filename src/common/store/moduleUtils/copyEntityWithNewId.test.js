import { mapValues } from "lodash";
import copyEntityWithNewId from "./copyEntityWithNewId";
import { v4 as uuid } from "uuid";

jest.mock("uuid");

describe("#copyEntityWithNewId", () => {
  let entity;
  let entityCopy;
  let expectedEntityCopy;

  describe("flat entity", () => {
    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);

      entity = { id: 1, name: "generic entity name" };
      expectedEntityCopy = {
        id: 2,
        originalId: 1,
        name: "generic entity name",
      };
      entityCopy = copyEntityWithNewId(entity);
    });

    it("creates a copy of a given entity", () => {
      expect(entityCopy).toEqual(expectedEntityCopy);
    });
  });

  describe("nested entity", () => {
    beforeEach(() => {
      uuid.mockImplementationOnce(() => 2);

      entity = {
        id: 1,
        name: "entityWithNestedAttributes",
        associationIds: [1, 2, 3],
      };
      expectedEntityCopy = {
        id: 2,
        originalId: 1,
        name: "entityWithNestedAttributes",
        associationIds: [1, 2, 3],
      };
      entityCopy = copyEntityWithNewId(entity);
    });

    it("creates a copy of a given entity", () => {
      expect(entityCopy).toMatchObject(expectedEntityCopy);
    });
  });
});
