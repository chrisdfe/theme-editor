import React from "react";
import { ReactReduxContext } from "react-redux";

import CommandsContext from "common/commands/CommandsContext";

const Commands = ({ children }) => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        const { dispatch, getState } = store;

        const dispatchCommand = async (command) => {
          command(dispatch, getState);
        };

        return (
          <CommandsContext.Provider value={dispatchCommand}>
            {children}
          </CommandsContext.Provider>
        );
      }}
    </ReactReduxContext.Consumer>
  );
};

export default Commands;
