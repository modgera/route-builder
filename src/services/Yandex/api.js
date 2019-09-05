import { yandexMapsParams, baseUrl } from "../../config";

const getUrl = () => {
  const stringParams = Object.keys(yandexMapsParams)
    .map(key => `${key}=${yandexMapsParams[key]}`)
    .join("&");
  return baseUrl + stringParams;
};

export const loadMapApi = (scriptID, callback) => {
  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = getUrl();
    script.id = scriptID;
    script.onload = () => {
      window.ymaps.ready(() => callback(window.ymaps));
    };
    document.head.appendChild(script);
  } else {
    window.ymaps.ready(() => callback(window.ymaps));
  }
};
