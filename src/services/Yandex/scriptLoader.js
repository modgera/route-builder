import { yandexMapsParams, baseUrl } from './config';
import YandexMaps from './YandexMaps';

const getYandexUrl = () => {
  const stringParams = Object.keys(yandexMapsParams)
    .map(key => `${key}=${yandexMapsParams[key]}`)
    .join('&');
  return baseUrl + stringParams;
};

const handleMapReady = callback => {
  const MapService = new YandexMaps(window.ymaps);
  callback(MapService);
};

const handleOnLoadMap = callback => {
  window.ymaps.ready(() => handleMapReady(callback));
};

const loadYandexScript = (scriptID, callback) => {
  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = getYandexUrl();
    script.id = scriptID;
    if (callback) {
      script.onload = () => handleOnLoadMap(callback);
    }
    document.head.appendChild(script);
  } else {
    handleOnLoadMap(callback);
  }
};

export default loadYandexScript;
export { getYandexUrl, loadYandexScript };
