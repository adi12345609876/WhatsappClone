import React from "react";
import { View, Text } from "react-native";
import { theme } from "../utils";
import Context from "./Context";

function ContextWrapper(props) {
  return (
    <Context.Provider value={{ theme }}>{props.children}</Context.Provider>
  );
}

export default ContextWrapper;
