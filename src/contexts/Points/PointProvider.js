import React, { useReducer, createContext } from "react";

import pointReducer from "./pointReducer";

const PointsContext = createContext(null);

const PointProvider = ({ children }) => {
  const [points, dispatchPoints] = useReducer(pointReducer, []);
  const value = { points, dispatchPoints };
  return <PointsContext.Provider value={value}> {children}</PointsContext.Provider>;
};

export { PointsContext, PointProvider };
