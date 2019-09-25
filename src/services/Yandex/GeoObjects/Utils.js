import { v1 as uuid } from 'uuid';
import GeoObject from './GeoObject';
import { defaultMapCenter } from '../config';

export default class Utils extends GeoObject {
  getUserLocation = async () => {
    try {
      const locationInfo = await this.ymaps.geolocation.get();
      const bounds = locationInfo.geoObjects
        .get(0)
        .properties.get('boundedBy');
      return this.ymaps.util.bounds.getCenter(bounds);
    } catch (error) {
      return defaultMapCenter;
    }
  };

  getAddressFromCoordinate = (pointName, map, callback) => {
    const coordinates = map.getCenter();
    this.ymaps.geocode(coordinates).then(res => {
      const firstGeoObject = res.geoObjects.get(0);
      const info = {
        address: firstGeoObject.getAddressLine(),
        id: uuid(),
        name: pointName,
        coordinates,
      };
      callback(info);
    });
  };
}
