import React from "react";
import { View, Text } from "react-native";
import { theme } from "../utils";

const GlobalContext = React.createContext({
  theme,
});

export default GlobalContext;
