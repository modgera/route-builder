import GeoObject from './GeoObject';

const onChangeMapCenterHandler = (map, centerMarker) => {
  const currentState = map.action.getCurrentState();
  const geoCenter = map.options
    .get('projection')
    .fromGlobalPixels(
      currentState.globalPixelCenter,
      currentState.zoom
    );
  centerMarker.geometry.setCoordinates(geoCenter);
};

export default class Marker extends GeoObject {
  addMarker = (map, options = {}, props = {}) => {
    const marker = new this.ymaps.Placemark(
      map.getCenter(),
      props,
      options
    );
    map.geoObjects.add(marker);
    return marker;
  };

  addCenterMarkerToMap = (map, options = {}, props = {}) => {
    const centerMarker = this.addMarker(map, options, props);
    map.events.add('actiontickcomplete', () =>
      onChangeMapCenterHandler(map, centerMarker)
    );
  };
}
