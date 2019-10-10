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

const changeMarkerParams = (marker, params, paramsName) => {
  const markerParams = marker[paramsName];
  if (markerParams) {
    Object.keys(params).forEach(key => {
      const currentParamValue = markerParams.get(key);
      const newParamValue = params[key];
      if (currentParamValue !== newParamValue) {
        markerParams.set(key, params[key]);
      }
    });
  }
};

export default class Marker extends GeoObject {
  createMarker = (map, params = {}, coordinates = []) => {
    const { options = {}, properties = {} } = params;
    const markerCoordinates = getMarkerCoordinate(coordinates, map);
    const marker = new this.ymaps.Placemark(markerCoordinates, properties, options);
    map.geoObjects.add(marker);
    return marker;
  };

  addCenterMarkerToMap = (map, params = {}) => {
    const centerMarker = this.createMarker(map, params);
    map.events.add('actiontickcomplete', () => onChangeMapCenterHandler(map, centerMarker));
    map.geoObjects.add(centerMarker);
  };

  onDragEndEventHandler = async (event, id, callback) => {
    const newCoordinates = event.originalEvent.target.geometry.getCoordinates();
    const address = await this.master.Utils.getAddress(newCoordinates);
    const info = {
      id,
      coordinates: newCoordinates,
      address,
    };
    callback(info);
  };

  addOnDragEndEvent = (marker, id, callback) => {
    marker.events.add('dragend', e => this.onDragEndEventHandler(e, id, callback));
  };

  changeMarker = (marker, params = {}) => {
    const { options, properties } = params;
    if (options) {
      changeMarkerParams(marker, options, 'options');
    }
    if (properties) {
      changeMarkerParams(marker, properties, 'properties');
    }
  };

  deleteMarker = (marker, map) => {
    map.geoObjects.remove(marker);
  };
}
