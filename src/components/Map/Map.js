import React, { useContext, useEffect } from "react";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

import "./Map.css";

const Map = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const setMapToState = map => {
    dispatch({ type: actions.SET_MAP, info: { map } });
  };

  useEffect(() => {
    if (state.api) {
      state.api.Map.createMap("map-container", setMapToState);
    }
  }, [state.api]);

  return <div id="map-container" className="map-container"></div>;
};

export default Map;
