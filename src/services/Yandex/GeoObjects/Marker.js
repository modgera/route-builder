import GeoObject from './GeoObject';

const onChangeMapCenterHandler = (map, centerMarker) => {
  const currentState = map.action.getCurrentState();
  const geoCenter = map.options.get('projection').fromGlobalPixels(currentState.globalPixelCenter, currentState.zoom);
  centerMarker.geometry.setCoordinates(geoCenter);
};

const getMarkerCoordinate = (coordinates, map) => {
  if (coordinates.length > 0) {
    return coordinates;
  }
  return map.getCenter();
};

const onDragEndEventHandler = (event, ymaps, id, callback) => {
  const newCoordinates = event.originalEvent.target.geometry.getCoordinates();
  ymaps.geocode(newCoordinates).then(res => {
    const firstGeoObject = res.geoObjects.get(0);
    const info = {
      id,
      coordinates: newCoordinates,
      address: firstGeoObject.getAddressLine(),
    };
    callback(info);
  });
};

export default class Marker extends GeoObject {
  createMarker = (map, options = {}, props = {}, coordinates = []) => {
    const markerCoordinates = getMarkerCoordinate(coordinates, map);
    const marker = new this.ymaps.Placemark(markerCoordinates, props, options);
    return marker;
  };

  addMarkerToMap = (map, marker) => {
    map.geoObjects.add(marker);
  };

  addCenterMarkerToMap = (map, options = {}, props = {}) => {
    const centerMarker = this.createMarker(map, options, props);
    map.events.add('actiontickcomplete', () => onChangeMapCenterHandler(map, centerMarker));
    this.addMarkerToMap(map, centerMarker);
  };

  addOnDragEndEvent = (marker, id, callback) => {
    marker.events.add('dragend', e => onDragEndEventHandler(e, this.ymaps, id, callback));
  };

  clean = map => {
    // const { geoObjects } = map;
    // const removeCount = geoObjects.getLength() - 1;
    // map.geoObjects.splice(1, removeCount);
    map.geoObjects.removeAll();
  };
}
