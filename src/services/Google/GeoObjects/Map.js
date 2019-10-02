import GeoObject from './GeoObject';

export default class Map extends GeoObject {
  createMap = (containerName, callback) => {
    const newMap = new this.googleMap.Map(document.getElementById(containerName), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    callback(newMap);
  };

  createMap = async (containerName, callback, options = {}) => {
    const center = await this.getNewMapCenter(options.center);
    const defaultOptions = Object.assign(options, { center });
    const mapContainer = document.getElementById(containerName);
    const newMap = new this.googleMap.Map(mapContainer, defaultOptions);
    if (callback) {
      callback(newMap);
    }
  };

  getNewMapCenter = mapCenter => {
    if (!mapCenter) {
      return this.master.Utils.getUserLocation();
    }
    return mapCenter;
  };

  getMapCenter = map => {
    return map.getCenter();
  };

  destroy = map => {
    const { event } = this.googleMap;
    event.clearListeners(map, 'click');
    event.clearListeners(map, 'bounds_changed');
    event.clearInstanceListeners(window);
    event.clearInstanceListeners(document);
    const mapContainer = document.getElementById('map-container');
    event.clearInstanceListeners(mapContainer);
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }
  };

  panTo = (map, coordinates) => {
    map.panTo(coordinates);
  };

  moveToFirstPoint = (map, coordinates) => {
    this.panTo(map, coordinates);
  };
}
