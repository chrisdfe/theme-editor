import React from "react";
import { ReactReduxContext } from "react-redux";

import CommandsContext from "common/commands/CommandsContext";

const Commands = ({ children }) => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const { dispatch, getState } = store;

        const doCommand = async (command) => {
          command(dispatch, getState, doCommand);
        };

        return (
          <CommandsContext.Provider value={doCommand}>
            {children}
          </CommandsContext.Provider>
        );
      }}
    </ReactReduxContext.Consumer>
  );
};

export default Commands;
