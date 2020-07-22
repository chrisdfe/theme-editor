import fs from "fs";
import path from "path";
import util from "util";
import electron from "electron";

import * as DirectoryModule from "common/store/domains/directories/module";
import * as directoryActions from "common/store/domains/directories/actions";

import scanDirectoryAndAddEntities from "../scanDirectoryAndAddEntities";

const readdir = util.promisify(fs.readdir);

const { dialog } = electron.remote;

const addDirectoriesFromDialog = (payload = {}) => async (
  dispatch,
  getState,
  doCommand
) => {
  const state = getState();

  const { type } = payload;

  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (canceled) {
    return;
  }

  const directories = filePaths.map((filePath) =>
    DirectoryModule.create({ type, filePath })
  );
  await dispatch(directoryActions.addDirectories({ directories }));

  return doCommand(scanDirectoryAndAddEntities({ type, directories }));
};

export default addDirectoriesFromDialog;
