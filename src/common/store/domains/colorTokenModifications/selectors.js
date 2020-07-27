import { createSelector } from "reselect";

import { getEntityList } from "common/store/reducerUtils";

export const getEditingColorTokenModifications = (state) =>
  state.editing.colorTokenModifications;

export const getEditingColorTokenModificationsList = createSelector(
  getEditingColorTokenModifications,
  getEntityList
);

export const getEditingColorTokenModificationsOriginalState = createSelector(
  getEditingColorTokenModifications,
  ({ originalState, allIds }) => allIds.map((id) => originalState[id])
);
