import GeoObject from "./GeoObject";
import { defaultMapState } from "../config";

export default class Map extends GeoObject {
  createMap = async (containerName, callback, mapState = {}) => {
    const coord = await this._getMapCenter(mapState.center);
    const defaultState = Object.assign(defaultMapState, mapState, { center: coord });
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
