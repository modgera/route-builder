import GeoObject from "./GeoObject";
import { configMapState } from "../config";

export default class Map extends GeoObject {
  createMap = async (containerName, callback, customMapState = {}) => {
    const center = await this._getMapCenter(customMapState.center);
    const defaultState = Object.assign(configMapState, customMapState, { center });
    const newMap = new this.ymaps.Map(containerName, defaultState);
    callback(newMap);
  };

  _getMapCenter = mapCenter => {
    if (!mapCenter) {
      return this.master.Utils.getUserLocation();
    }
    return mapCenter;
  };
}
