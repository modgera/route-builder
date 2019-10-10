import GeoObject from './GeoObject';
import { defaultMapCenter } from '../config';

const ADDRESS_ERROR_MES = 'Адрес определить не удалось';

const getAddressPart = (partName, components) => {
  const [part] = components.filter(component => component.kind === partName);
  if (part) {
    return part.name;
  }
  return '';
};

const getAddressText = geoObjects => {
  try {
    const addressInfo = geoObjects.get(0);
    const addressComponents = addressInfo.properties.get('metaDataProperty.GeocoderMetaData.Address.Components');
    if (addressComponents) {
      const streetName = getAddressPart('street', addressComponents);
      if (streetName) {
        const houseNumber = getAddressPart('house', addressComponents);
        return `${streetName} ${houseNumber}`;
      }
    }
    return addressInfo.getAddressLine();
  } catch {
    return ADDRESS_ERROR_MES;
  }
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

  getAddress = async coordinates => {
    try {
      const addressInfo = await this.ymaps.geocode(coordinates);
      return getAddressText(addressInfo.geoObjects);
    } catch (error) {
      console.error(error);
      return ADDRESS_ERROR_MES;
    }
  };
}
