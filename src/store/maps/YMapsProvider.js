import React, { useState, useEffect } from "react";

import {YMapsContext} from './YMapsContext';
import loadMapScript from "../../services/yandexMap";

import "./style.css";

const YMapsProvider = ({children}) => {
  const [ymaps, setYmaps] = useState(null);

  useEffect(() => {
    loadMapScript("YandexMap", ymaps => setYmaps(ymaps));
  }, []);

  return <YMapsContext.Provider value={ymaps}> {children}</YMapsContext.Provider>;
};

export default YMapsProvider;
