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
}
