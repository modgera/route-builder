import React, { useState, useEffect } from "react";

import loadDynamicScript from "./getApi";

import "./style.css";

const YMaps = () => {
  const [ymaps, setYmaps] = useState(null);

  const url =
    "https://api-maps.yandex.ru/2.1/?apikey=1c3beb93-8646-40be-aad5-14816f0a463d&lang=ru_RU";

  useEffect(() => {
    loadDynamicScript("YandexMap", url, ymaps => setYmaps(ymaps));
  }, []);

  const createMap = ymaps => {
    new ymaps.Map("YMapsID", {
      center: [55.76, 37.64],
      zoom: 10
    });
  };

  if (ymaps) {
    createMap(ymaps);
  }

  return <div id="YMapsID" className="YandexMap"></div>;
};

export default YMaps;
