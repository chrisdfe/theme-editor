import { combineReducers } from "redux";

import themes from "./themes";
import swatches from "./swatches";
import swatchColors from "./swatchColors";
import colorTokenGroups from "./colorTokenGroups";
import colorTokens from "./colorTokens";

const combinedReducers = combineReducers({
  themes,
  swatches,
  swatchColors,
  colorTokenGroups,
  colorTokens,
});

export default combinedReducers;
