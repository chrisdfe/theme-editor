import path from "path";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import { setThemeFromFile } from "common/themes/setTheme";

import rootReducer from "common/store/reducers";

import App from "@/App";

// Load default theme on statup
// TODO - can this be done any earlier to preven the flash of white bg?
setThemeFromFile("svg", "apollo.svg");

// redux initialization
const logger = createLogger({
  collapsed: true,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
