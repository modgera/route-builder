import React, { useContext, useState, useEffect } from "react";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

import { getUserLocation } from "../../services/Yandex/yandexMap";

import "./Map.css";

const Map = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    //getUserLocation(state.api, setLocation);
    //if (location) {
    if (state.api) {
      const map = new state.api.Map("map-container", {
        center: [55.75, 37.57],
        zoom: 12
      });
      dispatch({ type: actions.SET_MAP, info: { map } });
    }

    //}
  }, [state.api]);

  return <div id="map-container" className="map-container"></div>;
};

export default Map;
