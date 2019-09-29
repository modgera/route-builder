import { v1 as uuid } from 'uuid';
import GeoObject from './GeoObject';
import { defaultMapCenter } from '../config';

const getAddressPart = (partName, components) => {
  const [part] = components.filter(component => component.kind === partName);
  if (part) {
    return part.name;
  }
  return '';
};

const getAddress = geoObject => {
  if (geoObject) {
    const addressInfo = geoObject.get(0);
    const addressComponents = addressInfo.properties.get('metaDataProperty.GeocoderMetaData.Address.Components');
    if (addressComponents) {
      const streetName = getAddressPart('street', addressComponents);
      if (streetName) {
        const houseNumber = getAddressPart('house', addressComponents);
        return `${streetName} ${houseNumber}`;
      }
    }
    return addressInfo.getAddressLine();
  }
  return 'Не удалось определить адрес';
};

export default class Utils extends GeoObject {
  getUserLocation = async () => {
    try {
      const locationInfo = await this.ymaps.geolocation.get();
      const bounds = locationInfo.geoObjects.get(0).properties.get('boundedBy');
      return this.ymaps.util.bounds.getCenter(bounds);
    } catch (error) {
      return defaultMapCenter;
    }
  };

  getPointInfo = (pointName, map, callback) => {
    const coordinates = map.getCenter();
    this.ymaps
      .geocode(coordinates)
      .then(res => {
        const address = getAddress(res.geoObjects);
        const info = {
          address,
          id: uuid(),
          name: pointName,
          coordinates,
        };
        callback(info);
      })
      .catch(rej => {
        console.error(rej);
      });
  };
}
