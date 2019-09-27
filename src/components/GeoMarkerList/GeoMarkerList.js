import { useContext, useEffect } from 'react';
import actions from '../../store/actions';
import { getOptions, getProperties } from './settings';

import { GlobalContext } from '../../store/provider';

const GeoMarkerList = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { map, api, points, apiName } = state;

  const setNewCoordinates = info => {
    dispatch({
      type: actions.CHANGE_POINT_INFO,
      info,
    });
  };
  api.Marker.clean(map);
  useEffect(() => {
    // api.Marker.clean(map);
    const lastIndex = points.length;
    points.forEach((point, i) => {
      const info = { index: i + 1, lastIndex };
      const properties = getProperties(apiName, point, info);
      const options = getOptions(apiName, info);
      const newMarker = api.Marker.createMarker(map, options, properties, point.coordinates);
      api.Marker.addOnDragEndEvent(newMarker, point.id, setNewCoordinates);
      api.Marker.addMarkerToMap(map, newMarker);
      console.log('marker added');
    });
  }, [points, map]);

  return null;
};

export default GeoMarkerList;
