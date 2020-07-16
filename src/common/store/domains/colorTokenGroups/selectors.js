import { mapValues } from "lodash";
import { createSelector } from "reselect";

import { getEntityList } from "common/store/reducerUtils";

import * as colorTokenSelectors from "../colorTokens/selectors";

export const getColorTokenGroups = (state) => state.entities.colorTokenGroups;

export const getColorTokenGroupsList = createSelector(
  getColorTokenGroups,
  getEntityList
);

export const getColorTokenGroupsByThemeId = createSelector(
  getColorTokenGroupsList,
  (_, themeId) => themeId,
  (colorTokenGroups, themeId) =>
    colorTokenGroups.filter(
      (colorTokenGroup) => colorTokenGroup.themeId === themeId
    )
);

export const getColorTokenGroupColorTokens = createSelector(
  colorTokenSelectors.getColorTokensList,
  (_, colorTokenGroup) => colorTokenGroup,
  (colorTokensList, colorTokenGroup) =>
    colorTokensList.filter(
      (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
    )
);

export const getColorTokenGroupsColorTokensFlatList = createSelector(
  colorTokenSelectors.getColorTokensList,
  (_, colorTokenGroups) => colorTokenGroups,
  (colorTokensList, colorTokenGroups) => {
    const colorTokenGroupIds = colorTokenGroups.map(({ id }) => id);
    return colorTokensList.filter((colorToken) =>
      colorTokenGroupIds.includes(colorToken.colorTokenGroupId)
    );
  }
);

export const getEditingColorTokenGroups = (state) =>
  state.editing.colorTokenGroups;

export const getEditingColorTokenGroupsList = createSelector(
  getEditingColorTokenGroups,
  getEntityList
);

export const getEditingColorTokenGroupsOriginalState = createSelector(
  getEditingColorTokenGroups,
  ({ originalState, allIds }) => allIds.map((id) => originalState[id])
);

export const getEditingColorTokenGroupColorTokensById = createSelector(
  colorTokenSelectors.getEditingColorTokens,
  getEditingColorTokenGroups,
  (colorTokens, colorTokenGroups) =>
    mapValues(colorTokenGroups.byId, (colorTokenGroup, id) =>
      colorTokenGroup.colorTokenIds.map(
        (colorTokenId) => colorTokens.byId[colorTokenId]
      )
    )
);

export const getEditingColorTokenGroupColorTokensList = createSelector(
  colorTokenSelectors.getEditingColorTokensList,
  (_, colorTokenGroup) => colorTokenGroup,
  (colorTokensList, colorTokenGroup) =>
    colorTokensList.filter(
      (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
    )
);

export const getEditingColorTokenGroupsColorTokensFlatList = createSelector(
  colorTokenSelectors.getEditingColorTokensList,
  getEditingColorTokenGroupsList,
  (colorTokensList, colorTokenGroups) => {
    const colorTokenGroupIds = colorTokenGroups.map(({ id }) => id);
    return colorTokensList.filter((colorToken) =>
      colorTokenGroupIds.includes(colorToken.colorTokenGroupId)
    );
  }
);
