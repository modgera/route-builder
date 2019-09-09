import React, { useReducer, createContext, useEffect } from "react";

import globalReducer from "./reducer";
import actions from "./actions";
import { getMapService } from "../services/getMapService";

const GlobalContext = createContext(null);

const Store = ({ children, apiName = "Google" }) => {
  const initialState = {
    api: null,
    apiName: apiName,
    map: null,
    loading: true,
    points: []
  };
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setMapApi = api => {
    dispatch({ type: actions.SET_MAP_API, info: { api } });
  };

  useEffect(() => {
    getMapService(state.apiName, setMapApi);
  }, [state.apiName]);

  return <GlobalContext.Provider value={{ state, dispatch }}> {children}</GlobalContext.Provider>;
};

export { GlobalContext, Store };
