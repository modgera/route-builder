import { useContext, useState } from 'react';
import { getOptions, getProperties } from './settings';

import { GlobalContext } from '../../store/provider';

// import { polylineOptions } from "../../config";

const getRouteCoordinates = points => {
  return points.map(elem => elem.coordinates);
};

const MapRoute = () => {
  const [route, setRoute] = useState(null);
  const { state } = useContext(GlobalContext);
  const { api, map, apiName, points } = state;
  const coordinates = getRouteCoordinates(points);
  if (route) {
    api.Polyline.changeCoordinates(route, coordinates);
  } else {
    const options = getOptions(apiName);
    const properties = getProperties(apiName);
    const newRoute = api.Polyline.addRoute(map, coordinates, properties, options);
    setRoute(newRoute);
  }

  return null;
};

export default MapRoute;
