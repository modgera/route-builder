import { useContext } from 'react';
import { getOptions, getProperties } from './settings';

import { GlobalContext } from '../../store/provider';

// import { polylineOptions } from "../../config";

const getRouteCoordinates = points => {
  return points.map(elem => elem.coordinates);
};

const MapRoute = () => {
  const { state } = useContext(GlobalContext);
  const { api, map, apiName, points } = state;
  const options = getOptions(apiName);
  const properties = getProperties(apiName);
  const coordinates = getRouteCoordinates(points);
  api.Polyline.addRoute(map, coordinates, properties, options);
  return null;
};

export default MapRoute;
