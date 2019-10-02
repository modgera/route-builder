import GeoObject from './GeoObject';

export default class Polyline extends GeoObject {
  add = (map, coordinates, options) => {
    const polyline = new this.googleMap.Polyline({
      path: coordinates,
      ...options,
    });

    polyline.setMap(map);
    return polyline;
  };

  changeCoordinates = (route, coordinates) => {
    route.setPath(coordinates);
  };
}
