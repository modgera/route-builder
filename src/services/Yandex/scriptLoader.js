import { yandexMapsParams, baseUrl } from "./config";
import YandexMaps from "./YandexMaps";

export const loadYandexScript = (scriptID, callback) => {
  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = getYandexUrl();
    script.id = scriptID;
    if (callback !== undefined) {
      console.log("callback here");
      script.onload = () => handleOnLoadMap(callback);
    }
    //script.addEventListener("load", () => handleOnLoadMap(callback));
    document.head.appendChild(script);
  } else {
    handleOnLoadMap(callback);
  }
};

const getYandexUrl = () => {
  const stringParams = Object.keys(yandexMapsParams)
    .map(key => `${key}=${yandexMapsParams[key]}`)
    .join("&");
  return baseUrl + stringParams;
};

const handleOnLoadMap = callback => {
  window.ymaps.ready(() => handleMapReady(callback));
};

const handleMapReady = callback => {
  const MapService = new YandexMaps(window.ymaps);
  callback(MapService);
};
