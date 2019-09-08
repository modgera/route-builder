import Map from "./GeoObjects/Map";
import Utils from "./GeoObjects/Utils";
import Marker from "./GeoObjects/Marker";
import Polyline from "./GeoObjects/Polyline";

export default class YandexMaps {
  constructor(api) {
    this.Map = new Map(this, api);
    this.Utils = new Utils(this, api);
    this.Marker = new Marker(this, api);
    this.Polyline = new Polyline(this, api);
  }
}
