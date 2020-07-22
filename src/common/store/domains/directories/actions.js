import { validateActionPayload } from "common/store/errors/PayloadError";

import * as DirectoryModule from "./module";
import * as types from "./types";

export const addDirectory = (payload = {}) => {
  validateActionPayload(payload, { required: ["directory"] });
};

export const addDirectories = (payload = {}) => (dispatch) => {
  validateActionPayload(payload, { required: ["directories"] });
  const { directories } = payload;

  // TODO - filter out directories that already exist in the state

  dispatch({ type: types.ADD_DIRECTORIES, directories });
};

export const createDirectories = (payload = {}) => (dispatch) => {
  validateActionPayload(payload, { required: ["directories"] });
  const { directories } = payload;

  const createdDirectories = directories.map((attributes) =>
    DirectoryModule.create(attributes)
  );

  console.log('createdDirectories', createdDirectories)

  dispatch(addDirectories({ directories: createdDirectories }));
};

// export const removeDirectory = () => {};

// export const removeDirectories = () => {};
