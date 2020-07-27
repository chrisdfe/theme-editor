import path from "path";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "common/store/reducers";

import App from "@/App";

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
