import React, { useReducer, createContext, useEffect } from "react";

import globalReducer from "./reducer";
import actions from "./actions";
import { loadMapScript } from "../services/Yandex/yandexMap";

const GlobalContext = createContext(null);

const Store = ({ children }) => {
  const initialState = {
    api: null,
    map: null,
    loading: true,
    points: []
  };
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    loadMapScript("MapAPI", api => dispatch({ type: actions.SET_MAP_API, info: { api } }));
  }, []);

  return <GlobalContext.Provider value={{ state, dispatch }}> {children}</GlobalContext.Provider>;
};

export { GlobalContext, Store };
