import GeoObject from "./GeoObject";

export default class Map extends GeoObject {
  createMap = (containerName, callback) => {
    this.master.Utils.getUserLocation().then(coord => {
      const newMap = new this.ymaps.Map(containerName, {
        center: coord,
        zoom: 12
      });
      callback(newMap);
    });
  };
}
