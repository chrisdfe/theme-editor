import * as genericReducers from "./genericReducers";

describe("genericReducers", () => {
  describe("#addEntityById", () => {
    it("adds an entity to the state indexed by id", () => {
      const entity = { id: 1, name: "entity 1" };

      const state = {};

      const expectedState = {
        [entity.id]: entity,
      };

      expect(genericReducers.addEntityById(state, entity)).toEqual(
        expectedState
      );
    });
  });

  describe("#addEntityIdToList", () => {
    it("adds an entity id the state", () => {
      const entity = { id: 1, name: "entity 1" };

      const state = [];

      const expectedState = [entity.id];

      expect(genericReducers.addEntityIdToList(state, entity)).toEqual(
        expectedState
      );
    });
  });

  describe("#addEntitiesById", () => {
    it("adds an array of entities to the state indexed by id", () => {
      const entity1 = { id: 1, name: "entity 1" };
      const entity2 = { id: 2, name: "entity 2" };
      const entities = [entity1, entity2];

      const state = {};

      const expectedState = {
        [entity1.id]: entity1,
        [entity2.id]: entity2,
      };

      expect(genericReducers.addEntitiesById(state, entities)).toEqual(
        expectedState
      );
    });
  });

  describe("#addEntityIdsToList", () => {
    it("adds an array of entity ids the state", () => {
      const entity1 = { id: 1, name: "entity 1" };
      const entity2 = { id: 2, name: "entity 2" };
      const entities = [entity1, entity2];

      const state = [];

      const expectedState = [entity1.id, entity2.id];

      expect(genericReducers.addEntityIdsToList(state, entities)).toEqual(
        expectedState
      );
    });
  });
});
