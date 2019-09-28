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

const changeMarkerParams = (marker, params, paramsName) => {
  const markerParams = marker[paramsName];
  Object.keys(params).forEach(key => {
    const currentParamValue = markerParams.get(key);
    const newParamValue = params[key];
    if (currentParamValue !== newParamValue) {
      markerParams.set(key, params[key]);
    }
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

  changeMarker = (marker, options, properties) => {
    changeMarkerParams(marker, options, 'options');
    changeMarkerParams(marker, properties, 'properties');
    // Object.keys(options).forEach(key => {
    //   marker.options.set(key, options[key]);
    // });
    // Object.keys(properties).forEach(key => {
    //   marker.properties.set(key, properties[key]);
    // });
  };

  deleteMarker = (map, marker) => {
    map.geoObjects.remove(marker);
  };
}
