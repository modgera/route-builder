import GeoObject from './GeoObject';

export default class Polyline extends GeoObject {
  addRoute = (map, coordinates, properties, options) => {
    const polyline = new this.ymaps.Polyline(coordinates, properties, options);
    // console.log(polyline);
    // const polyline = new this.ymaps.AnimatedLine(coordinates, properties, options);
    map.geoObjects.add(polyline);
  };
}
