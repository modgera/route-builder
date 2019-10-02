import { loadYandexScript } from './Yandex/scriptLoader';
import { loadGoogleScript } from './Google/scriptLoader';

export const getMapService = (apiName, callback, errorHandler) => {
  switch (apiName) {
    case 'Yandex':
      loadYandexScript('YandexMapAPI', callback, errorHandler);
      break;
    case 'Google':
      loadGoogleScript('GoogleMapAPI', callback, errorHandler);
      break;
    default:
      return false;
  }
  return true;
};

export default getMapService;
