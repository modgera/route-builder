import { loadYandexScript } from "./Yandex/constructor";
import { loadGoogleScript } from "./Google/constructor";
export const getMapService = (apiName, callback) => {
  switch (apiName) {
    case "Yandex":
      loadYandexScript("YandexMapAPI", callback);
      break;
    case "Google":
      loadGoogleScript("GoogleMapAPI", callback);
      break;
    default:
      return null;
  }
};
