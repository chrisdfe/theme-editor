import { combineReducers } from "redux";

import directories from "./directories";
import themes from "./themes";
import swatches from "./swatches";
import swatchColors from "./swatchColors";
import colorTokenGroups from "./colorTokenGroups";
import colorTokens from "./colorTokens";

const combinedReducers = combineReducers({
  directories,
  themes,
  swatches,
  swatchColors,
  colorTokenGroups,
  colorTokens,
});

export default combinedReducers;
