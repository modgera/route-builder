import GeoObject from './GeoObject';
import { defaultMapCenter } from '../config';

const ADDRESS_ERROR_MES = 'Адрес определить не удалось';

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        reject(defaultMapCenter);
      }
    );
  });
};

const getAddressPart = (partName, components) => {
  const [part] = components.filter(component => component.types.includes(partName));
  if (part) {
    return part.short_name;
  }
  return '';
};

const getAddressText = addressInfo => {
  const addressComponents = addressInfo.address_components;
  if (addressComponents) {
    const streetName = getAddressPart('route', addressComponents);
    if (streetName) {
      const houseNumber = getAddressPart('street_number', addressComponents);
      return `${streetName} ${houseNumber}`;
    }
  }
  return addressInfo.formatted_address;
};

export default class Utils extends GeoObject {
  newLatLng = (lat, lng) => {
    const latLng = new this.googleMap.LatLng(lat, lng);
    return latLng;
  };

  getUserLocation = async () => {
    if (navigator.geolocation) {
      const userPosition = await getCurrentPosition();
      return userPosition;
    }
    return defaultMapCenter;
  };

  getAddress = async coordinates => {
    const geocoder = new this.googleMap.Geocoder();
    const promise = new Promise((resolve, reject) => {
      geocoder.geocode({ location: coordinates }, (results, status) => {
        if (status === 'OK') {
          const addressInfo = results[0];
          const address = getAddressText(addressInfo);
          resolve(address);
        }
        reject(ADDRESS_ERROR_MES);
      });
    });
    const address = await promise;
    return address;
  };
}
