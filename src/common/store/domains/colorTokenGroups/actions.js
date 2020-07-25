import * as types from "./types";
import PayloadError, {
  validateActionPayload,
} from "common/store/errors/PayloadError";

import * as themeSelectors from "../themes/selectors";

import * as colorTokenActions from "../colorTokens/actions";
import * as ColorTokenModule from "../colorTokens/module";

import * as selectors from "./selectors";
import * as ColorTokenGroupModule from "./module";

export const setColorTokenGroups = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokenGroups"] });
  const { colorTokenGroups } = payload;
  return { type: types.SET_COLOR_TOKEN_GROUPS, colorTokenGroups };
};

export const addColorTokenGroup = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokenGroup"] });
  const { colorTokenGroup } = payload;
  return { type: types.ADD_COLOR_TOKEN_GROUP, colorTokenGroup };
};

export const addColorTokenGroups = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokenGroups"] });
  const { colorTokenGroups } = payload;
  return { type: types.ADD_COLOR_TOKEN_GROUPS, colorTokenGroups };
};

export const createColorTokenGroup = (payload = {}) => async (dispatch) => {
  const { colorTokenGroup: attributes = {}, colorTokens } = payload;

  const colorTokenGroup = ColorTokenGroupModule.create(attributes);

  // TODO - ColorTokenGroupModule.validate
  // TODO - avoid duplicate colorTokenGroup names
  // TODO - create colorTokens if they've been passed in

  dispatch(addColorTokenGroup({ colorTokenGroup }));

  // await dispatch(
  //   colorTokenActions.createColorTokens({
  //     colorTokens: newColorTokens,
  //   })
  // );
};

export const createColorTokenGroupForTheme = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["theme"] });
  const { theme, attributes = {} } = payload;
  const state = getState();

  const themeColorTokenGroups = themeSelectors.getThemeColorTokenGroups(
    state,
    theme
  );

  const colorTokenGroup = ColorTokenGroupModule.createForTheme({
    theme,
    themeColorTokenGroups,
    attributes,
  });

  // TODO
  // if this is the theme's first colorTokenGroup
  // get default set of names + create
  // otherwise, copy the names from the first colorTokenGroup

  return dispatch(createColorTokenGroup({ colorTokenGroup }));
};

export const createColorTokenGroups = (payload = {}) => async () => {};

export const updateColorTokenGroup = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;
  return dispatch({ type: types.UPDATE_COLOR_TOKEN_GROUP, id, attributes });
};

export const updateColorTokenGroups = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["colorTokenGroups"] });
  const { colorTokenGroups } = payload;
  return dispatch({ type: types.UPDATE_COLOR_TOKEN_GROUPS, colorTokenGroups });
};

export const removeColorTokenGroupById = (payload = {}) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  return { type: types.REMOVE_COLOR_TOKEN_GROUP, id };
};

export const removeColorTokenGroupsById = (payload = {}) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return { type: types.REMOVE_COLOR_TOKEN_GROUPS, ids };
};

export const deleteColorTokenGroupById = (payload = {}) => async (dispatch) => {
  validateActionPayload(payload, { required: ["id"] });
  const { id } = payload;
  return dispatch({ type: types.REMOVE_COLOR_TOKEN_GROUP, id });
};

export const deleteColorTokenGroupsById = (payload = {}) => async (
  dispatch
) => {
  validateActionPayload(payload, { required: ["ids"] });
  const { ids } = payload;
  return dispatch({ type: types.REMOVE_COLOR_TOKEN_GROUPS, ids });
};

export const deleteColorTokenGroupsByThemeId = (payload = {}) => async (
  dispatch,
  getState
) => {
  validateActionPayload(payload, { required: ["themeId"] });
  const { themeId } = payload;
  const state = getState();
  const colorTokenGroups = selectors.getColorTokenGroupsByThemeId(
    state,
    themeId
  );
  const ids = colorTokenGroups.map(({ id }) => id);
  return dispatch(deleteColorTokenGroupsById({ ids }));
};

export const createEditingColorTokenGroup = (payload = {}) => {
  validateActionPayload(payload, { required: ["colorTokenGroup"] });
  const { colorTokenGroup: attributes } = payload;

  const colorTokenGroup = ColorTokenGroupModule.create(attributes);

  return { type: types.ADD_EDITING_COLOR_TOKEN_GROUP, colorTokenGroup };
};

// TODO - make all update_ functions use this format. the id + attributes things
//        keeps confusing me
export const updateEditingColorTokenGroup = (payload = {}) => {
  validateActionPayload(payload, { required: ["id", "attributes"] });
  const { id, attributes } = payload;
  return { type: types.UPDATE_EDITING_COLOR_TOKEN_GROUP, id, attributes };
};
