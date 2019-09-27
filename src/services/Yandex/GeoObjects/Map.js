import GeoObject from './GeoObject';
import { configMapState } from '../config';

export default class Map extends GeoObject {
  createMap = async (containerName, callback, customMapState = {}) => {
    const center = await this.getMapCenter(customMapState.center);
    const defaultState = Object.assign(configMapState, customMapState, { center });
    const newMap = new this.ymaps.Map(containerName, defaultState);
    if (callback) {
      callback(newMap);
    }
  };

  getMapCenter = mapCenter => {
    if (!mapCenter) {
      return this.master.Utils.getUserLocation();
    }
    return mapCenter;
  };
}
