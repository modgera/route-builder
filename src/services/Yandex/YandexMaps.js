export default class YandexMaps {
  constructor(api) {
    this.ymaps = api;
    this.map = null;
  }

  //need catch and return default location
  getUserLocation = async () => {
    const locationInfo = await this.ymaps.geolocation.get();
    const bounds = locationInfo.geoObjects.get(0).properties.get("boundedBy");
    return this.ymaps.util.bounds.getCenter(bounds);
  };

  createMap = (containerName, callback) => {
    this.getUserLocation().then(coord => {
      const map = new this.ymaps.Map(containerName, {
        center: coord,
        zoom: 12
      });
      callback(map);
    });
  };

  addPoint = map => {
    const coord = map.getCenter();
    console.log(coord);
  };
  // onPointDragEnd = event => {
  //   const newCoordinates = event.originalEvent.target.geometry.getCoordinates();
  //   ymap.geocode(coordinates).then(res => {
  //     const firstGeoObject = res.geoObjects.get(0);
  //     dispatch({
  //       type: actions.CHANGE_POINT_INFO,
  //       info: { id, coordinates: newCoordinates, address: firstGeoObject.getAddressLine() }
  //     });
  //   });
  // };
}
