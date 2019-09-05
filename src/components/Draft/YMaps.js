import React, { useState, useEffect } from "react";

import loadDynamicScript from "./getApi";

import "./style.css";

const YMaps = () => {
  const [ymaps, setYmaps] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    loadDynamicScript("YandexMap", ymaps => setYmaps(ymaps));
  }, []);

  const createMap = ymaps => {
    const map = new ymaps.Map("YMapsID", {
      center: [55.76, 37.64],
      zoom: 10
    });
    setMap(map);
  };

  if (ymaps) {
    createMap(ymaps);
  }

  return <div id="YMapsID" className="YandexMap"></div>;
};

export default YMaps;
