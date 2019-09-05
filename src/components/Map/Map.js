import React, { useContext, useState, useEffect } from "react";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

import { getUserLocation } from "../../services/Yandex/YandexMaps";

import "./Map.css";

const Map = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const setMapToState = map => {
    dispatch({ type: actions.SET_MAP, info: { map } });
  };
  useEffect(() => {
    //getUserLocation(state.api, setLocation);
    //if (location) {
    if (state.api) {
      const map = state.api.createMap("map-container", setMapToState);
    }

    //}
  }, [state.api]);

  return <div id="map-container" className="map-container"></div>;
};

export default Map;
