import { useContext, useState, useEffect } from 'react';
import getOptions from './settings';

import { GlobalContext } from '../../store/provider';

const getRouteCoordinates = points => {
  return points.map(elem => elem.coordinates);
};

const MapRoute = () => {
  const [route, setRoute] = useState(null);
  const { state } = useContext(GlobalContext);
  const { api, map, apiName, points } = state;

  useEffect(() => {
    setRoute(null);
  }, [api]);

  useEffect(() => {
    const coordinates = getRouteCoordinates(points);
    if (route) {
      api.Polyline.changeCoordinates(route, coordinates);
    } else {
      const options = getOptions(apiName);
      const newRoute = api.Polyline.add(map, coordinates, options);
      setRoute(newRoute);
    }
  }, [points]);

  return null;
};

export default MapRoute;
