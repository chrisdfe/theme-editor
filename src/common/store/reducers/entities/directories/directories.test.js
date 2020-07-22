import { createMockDirectory } from "tests/utils";

import directoriesReducer from "./directories";

const createEmptyState = () => ({ byId: {}, allIds: [] });
const createMockState = (state = {}) => ({ ...createEmptyState(), ...state });

xdescribe("directoriesReducer", () => {
  xdescribe("addDirectory");
  xdescribe("removeDirectory");
});
