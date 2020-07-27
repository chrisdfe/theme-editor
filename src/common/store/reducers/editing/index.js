import { combineReducers } from "redux";

import themes from "./themes";
import swatches from "./swatches";
import swatchColors from "./swatchColors";
import colorTokenGroups from "./colorTokenGroups";
import colorTokens from "./colorTokens";
import colorTokenModifications from "./colorTokenModifications";

const combinedReducers = combineReducers({
  themes,
  swatches,
  swatchColors,
  colorTokenGroups,
  colorTokens,
  colorTokenModifications,
});

export default combinedReducers;
