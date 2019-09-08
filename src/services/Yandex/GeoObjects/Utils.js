import GeoObject from "./GeoObject";

export default class Utils extends GeoObject {
  getUserLocation = async () => {
    const locationInfo = await this.ymaps.geolocation.get();
    const bounds = locationInfo.geoObjects.get(0).properties.get("boundedBy");
    return this.ymaps.util.bounds.getCenter(bounds);
  };
}
