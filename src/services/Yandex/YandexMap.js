import { yandexMapsParams, baseUrl } from "../../config";

const getUrl = () => {
  const stringParams = Object.keys(yandexMapsParams)
    .map(key => `${key}=${yandexMapsParams[key]}`)
    .join("&");
  return baseUrl + stringParams;
};

export const loadMapScript = (scriptID, callback) => {
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

export const getUserLocation = async ymaps => {
  const locationInfo = await ymaps.geolocation.get();
  const bounds = locationInfo.geoObjects.get(0).properties.get("boundedBy");
  return ymaps.util.bounds.getCenter(bounds);
  //need catch and return deffault location

  // ymaps.geolocation.get().then(res => {
  // 	const bounds = res.geoObjects.get(0).properties.get("boundedBy");
  // 	const userCoord = ymaps.util.bounds.getCenter(bounds);
  // 	return callback(userCoord);
  // });
};
