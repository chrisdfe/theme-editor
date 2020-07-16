import {
  createReducer,
  updateEntityById,
  updateEntitiesById,
} from "common/store/reducerUtils";

import * as themeTypes from "common/store/domains/themes/types";
import * as types from "common/store/domains/colorTokenGroups/types";

const initialState = {
  byId: {},
  allIds: [],
  originalState: {},
};

const colorTokenGroupsReducer = createReducer(initialState, {
  // Makes the assumption that there is 1 theme being edited at a time
  [themeTypes.EDIT_CLEARED]: () => {
    return { ...initialState };
  },

  [themeTypes.EDIT_STARTED]: (state, { colorTokenGroups, colorTokens }) => {
    const byId = {
      ...state.byId,
      ...colorTokenGroups.reduce((acc, colorTokenGroup) => {
        const colorTokenGroupColorTokens = colorTokens.filter(
          (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
        );
        const colorTokenIds = colorTokenGroupColorTokens.map(({ id }) => id);

        return {
          ...acc,
          [colorTokenGroup.id]: {
            ...colorTokenGroup,
            colorTokenIds,
          },
        };
      }, {}),
    };

    const allIds = [...state.allIds, ...colorTokenGroups.map(({ id }) => id)];

    const originalState = colorTokenGroups.reduce((acc, colorTokenGroup) => {
      const colorTokenGroupColorTokens = colorTokens.filter(
        (colorToken) => colorToken.colorTokenGroupId === colorTokenGroup.id
      );
      const colorTokenIds = colorTokenGroupColorTokens.map(({ id }) => id);

      return {
        ...acc,
        [colorTokenGroup.id]: {
          ...colorTokenGroup,
          colorTokenIds,
        },
      };
    }, {});

    return {
      byId,
      allIds,
      originalState,
    };
  },
  // [types.UPDATE_EDITED_THEME]: (state, action) => {}
});

export default colorTokenGroupsReducer;
