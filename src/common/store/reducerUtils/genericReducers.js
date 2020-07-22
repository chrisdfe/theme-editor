import { omit, mapValues } from "lodash";

export const getEntityList = (state) =>
  state.allIds.map((id) => state.byId[id]);

export const addEntityById = (state, entity) => {
  return {
    ...state,
    [entity.id]: entity,
  };
};

export const addEntityIdToList = (state, entity) => [...state, entity.id];

export const addEntityIdsToList = (state, entities) => {
  const ids = entities.map(({ id }) => id);
  return [...state, ...ids];
};

export const addEntitiesById = (state, entities) => {
  const entitiesById = entities.reduce((acc, entity) => {
    return {
      ...acc,
      [entity.id]: entity,
    };
  }, {});

  return {
    ...state,
    ...entitiesById,
  };
};

export const removeEntityById = (state, id) => omit(state, id);

export const removeEntitiesById = (state, ids) => omit(state, ids);

export const removeEntityIdFromList = (state, id) =>
  state.filter((otherId) => otherId !== id);

export const updateEntityById = (state, id, attributes) => {
  return {
    ...state,
    [id]: {
      ...(state[id] || {}),
      ...attributes,
    },
  };
};

export const updateEntitiesById = (state, updates) => {
  return mapValues(state, (entity) => {
    const attributes = updates[entity.id];

    if (attributes) {
      return { ...entity, ...attributes };
    }

    return entity;
  });
};
