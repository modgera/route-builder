import GoogleMaps from './GoogleMaps';
import { mapsParams, baseUrl } from './config';

const getGoogleUrl = () => {
  const params = Object.keys(mapsParams);
  const checkApiKey = params.find(p => p === 'key');
  if (checkApiKey) {
    const stringParams = params.map(key => `${key}=${mapsParams[key]}`).join('&');
    return baseUrl + stringParams;
  }
  throw new Error('api key fro Google Maps is not found');
};

const handleOnLoadMap = callback => {
  const MapService = new GoogleMaps(window.google.maps);
  callback(MapService);
};

const loadGoogleScript = (scriptID, callback, errorHandler) => {
  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = getGoogleUrl();
    script.id = scriptID;
    if (callback) {
      script.onload = () => handleOnLoadMap(callback);
    }
    script.onerror = () => {
      errorHandler('При попытке загрузить Google Maps API произошла ошибка');
    };
    document.head.appendChild(script);
  } else {
    handleOnLoadMap(callback);
  }
};

export default loadGoogleScript;

export { getGoogleUrl, loadGoogleScript };
