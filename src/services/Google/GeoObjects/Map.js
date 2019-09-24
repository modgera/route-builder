import GeoObject from './GeoObject';

export default class Map extends GeoObject {
  createMap = (containerName, callback) => {
    const newMap = new this.googleMap.Map(
      document.getElementById(containerName),
      {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      }
    );
    callback(newMap);
  };
}
