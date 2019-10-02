import { mapsParams, baseUrl } from './config';
import YandexMaps from './YandexMaps';

const getYandexUrl = () => {
  const params = Object.keys(mapsParams);
  const checkApiKey = params.find(p => p === 'apikey');
  if (checkApiKey) {
    const stringParams = params.map(key => `${key}=${mapsParams[key]}`).join('&');
    return baseUrl + stringParams;
  }
  throw new Error('api key fro Yandex Maps is not found');
};

const handleMapReady = callback => {
  const MapService = new YandexMaps(window.ymaps);
  callback(MapService);
};

const handleOnLoadMap = callback => {
  window.ymaps.ready(() => handleMapReady(callback));
};

const loadYandexScript = (scriptID, callback, errorHandler) => {
  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = getYandexUrl();
    script.id = scriptID;
    if (callback) {
      script.onload = () => handleOnLoadMap(callback);
    }
    script.onerror = () => {
      errorHandler('При попытке загрузить Yandex Maps API произошла ошибка');
    };
    document.head.appendChild(script);
  } else {
    handleOnLoadMap(callback);
  }
};

export default loadYandexScript;
export { getYandexUrl, loadYandexScript };
