import { loadYandexScript } from "./Yandex/constructor";

export const getMapService = (apiName, callback) => {
  switch (apiName) {
    case "Yandex":
      loadYandexScript("YandexMapAPI", callback);
      break;
    case "Google":
      break;
    default:
      return null;
  }
};
