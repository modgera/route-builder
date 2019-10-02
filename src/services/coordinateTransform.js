const toYandexCoordinates = coordinates => {
  if (typeof coordinates === 'object') {
    return [coordinates.lat(), coordinates.lng()];
  }
  return coordinates;
};

const toGoogleCoordinates = (coordinates, api) => {
  if (Array.isArray(coordinates)) {
    return api.Utils.newLatLng(...coordinates);
  }
  return coordinates;
};

const transform = (points, transformCoordinates, api) => {
  if (points.length > 0) {
    return points.reduce((tPoints, point) => {
      const newCoordinates = transformCoordinates(point.coordinates, api);
      const newPoint = {
        ...point,
        coordinates: newCoordinates,
      };
      return [...tPoints, newPoint];
    }, []);
  }
  return points;
};

const getTransformedPoints = (points, apiName, api) => {
  if (points.length > 0) {
    switch (apiName) {
      case 'Yandex':
        return transform(points, toYandexCoordinates);
      case 'Google':
        return transform(points, toGoogleCoordinates, api);
      default:
        return points;
    }
  }
  return points;
};

export default getTransformedPoints;
