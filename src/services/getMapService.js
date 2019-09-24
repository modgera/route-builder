import { loadYandexScript } from './Yandex/scriptLoader';
import { loadGoogleScript } from './Google/scriptLoader';

export const getMapService = (apiName, callback) => {
  switch (apiName) {
    case 'Yandex':
      loadYandexScript('YandexMapAPI', callback);
      break;
    case 'Google':
      loadGoogleScript('GoogleMapAPI', callback);
      break;
    default:
      return false;
  }
  return true;
};

export default getMapService;
