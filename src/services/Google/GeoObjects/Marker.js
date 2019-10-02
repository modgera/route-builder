import GeoObject from './GeoObject';

const getMarkerCoordinate = (coordinates, map) => {
  if (Object.keys(coordinates).length > 0) {
    return coordinates;
  }
  return map.getCenter();
};

const onChangeMapCenterHandler = (map, centerMarker) => {
  const center = map.getCenter();
  centerMarker.setPosition(center);
};

export default class Marker extends GeoObject {
  createBalloon = (map, marker, message) => {
    const infoWindow = new this.googleMap.InfoWindow({
      content: message,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    this.googleMap.event.addListener(map, 'click', () => {
      infoWindow.close();
    });
    return infoWindow;
  };

  createMarker = (map, options = {}, coordinates = {}) => {
    const position = getMarkerCoordinate(coordinates, map);
    const transformedOptions = this.transformOptions(options);
    const marker = new this.googleMap.Marker({ position, map, ...transformedOptions });
    const { balloon } = options;
    if (balloon) {
      marker.infoWindow = this.createBalloon(map, marker, balloon.content);
    }
    return marker;
  };

  addCenterMarkerToMap = (map, options = {}) => {
    const centerMarker = this.createMarker(map, options);
    map.addListener('bounds_changed', () => onChangeMapCenterHandler(map, centerMarker));
  };

  onDragEndEventHandler = async (marker, id, callback) => {
    const newCoordinates = marker.getPosition();
    const address = await this.master.Utils.getAddress(newCoordinates);
    const info = {
      id,
      coordinates: newCoordinates,
      address,
    };
    callback(info);
  };

  addOnDragEndEvent = (marker, id, callback) => {
    marker.addListener('dragend', () => this.onDragEndEventHandler(marker, id, callback));
  };

  changeMarker = (marker, options) => {
    const transformedOptions = this.transformOptions(options);
    marker.setOptions(transformedOptions);
    const { infoWindow } = marker;
    if (infoWindow) {
      const newContent = options.balloon.content;
      infoWindow.setContent(newContent);
    }
  };

  deleteMarker = marker => {
    marker.setMap(null);
  };

  transformIconOptions = (options, key) => {
    const toPoint = ['origin', 'anchor'];
    const toSize = ['size', 'scaledSize'];
    if (toPoint.includes(key)) {
      return new this.googleMap.Point(...options[key]);
    }
    if (toSize.includes(key)) {
      return new this.googleMap.Size(...options[key]);
    }
    if (key === 'path') {
      return this.googleMap.SymbolPath[options[key]];
    }
    return options[key];
  };

  getIconOptions = options => {
    return Object.keys(options).reduce((tOptions, key) => {
      const newOptionValue = this.transformIconOptions(options, key);
      return {
        ...tOptions,
        [key]: newOptionValue,
      };
    }, {});
  };

  transformOptions = options => {
    const iconOptions = options.icon;
    if (iconOptions && typeof iconOptions === 'object') {
      const newIconOptions = this.getIconOptions(iconOptions);
      return {
        ...options,
        icon: newIconOptions,
      };
    }
    return options;
  };
}
