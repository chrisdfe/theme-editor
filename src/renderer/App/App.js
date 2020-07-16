import React from "react";

import AppMenu from "./subcomponents/AppMenu";
import AppRouter from "./subcomponents/AppRouter";
import Commands from "./subcomponents/Commands";
import ThemeUploadRegion from "./subcomponents/ThemeUploadRegion";

import "normalize.css/normalize.css";

import "./App.css";

const App = ({ children }) => {
  return (
    <div className="App">
      <Commands>
        <AppMenu />
        <ThemeUploadRegion>
          <AppRouter />
        </ThemeUploadRegion>
      </Commands>
    </div>
  );
};

export default App;
