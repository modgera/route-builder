import React, { useReducer, createContext } from "react";

import globalReducer from "./reducer";

const GlobalContext = createContext(null);

const Store = ({ children }) => {
  const initialState = {
    points: []
  };
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return <GlobalContext.Provider value={{ state, dispatch }}> {children}</GlobalContext.Provider>;
};

export { GlobalContext, Store };
