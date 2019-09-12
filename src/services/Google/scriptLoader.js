import GoogleMaps from "./GoogleMaps";

export const loadGoogleScript = (scriptID, callback) => {
  const existingScript = document.getElementById(scriptID);
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = getGoogleUrl();
    script.id = scriptID;
    script.onload = () => handleOnLoadMap(callback);
    document.head.appendChild(script);
  } else {
    handleOnLoadMap(callback);
  }
};

const getGoogleUrl = () => {
  // const stringParams = Object.keys(yandexMapsParams)
  //   .map(key => `${key}=${yandexMapsParams[key]}`)
  //   .join("&");
  return "https://maps.googleapis.com/maps/api/js?key=AIzaSyBe7feu53P7g4HiJyLXEXpM0Td7UPYOgxI";
};

const handleOnLoadMap = callback => {
  const MapService = new GoogleMaps(window.google.maps);
  callback(MapService);
};
