import GeoObject from './GeoObject';

const addOnClickBalloonClosing = map => {
  map.events.add('click', () => {
    map.balloon.close();
  });
};

export default class Map extends GeoObject {
  createMap = async (containerName, params) => {
    const { mapState, options } = params;
    const center = await this.getNewMapCenter(mapState.center);
    const defaultState = Object.assign(mapState, { center });
    const newMap = await new this.ymaps.Map(containerName, defaultState, options);
    addOnClickBalloonClosing(newMap);
    return newMap;
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
    map.destroy();
  };

  panTo = (map, coordinates) => {
    map.panTo(coordinates);
  };

  moveToFirstPoint = (map, coordinates) => {
    map.setCenter(coordinates);
  };
}
