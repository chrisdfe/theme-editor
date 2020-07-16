import React, { useContext } from "react";

import CommandsContext from "common/commands/CommandsContext";

import { remote } from "electron";
const { app, Menu } = remote;

// const isMac = process.platform === "darwin";

const AppMenu = () => {
  // const dispatchCommand = useContext(CommandsContext);
  // console.log("AppMenu");
  return null;
};

export default AppMenu;
