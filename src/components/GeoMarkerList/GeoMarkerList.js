import { useContext, useEffect, useState } from 'react';
import actions from '../../store/actions';
import { getOptions, getProperties } from './settings';

import { GlobalContext } from '../../store/provider';

const findMarker = (markers, id) => {
  return markers.find(marker => marker.id === id);
};

const GeoMarkerList = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { map, api, points, apiName } = state;
  const [markers, setMarkers] = useState([]);

  const setNewCoordinates = info => {
    dispatch({
      type: actions.CHANGE_POINT_INFO,
      info,
    });
  };

  const createMarker = (point, options, properties) => {
    const { coordinates, id } = point;
    const marker = api.Marker.createMarker(map, options, properties, coordinates);
    api.Marker.addOnDragEndEvent(marker, id, setNewCoordinates);
    api.Marker.addMarkerToMap(map, marker);
    const newMarkerInfo = {
      id,
      marker,
    };
    setMarkers([...markers, newMarkerInfo]);
  };

  useEffect(() => {
    const newMarkers = markers.filter(currentMarker => {
      const { marker, id } = currentMarker;
      if (!findMarker(points, id)) {
        api.Marker.deleteMarker(map, marker);
        return false;
      }
      return true;
    });
    setMarkers(newMarkers);
  }, [points]);

  useEffect(() => {
    const lastIndex = points.length;
    points.forEach((point, i) => {
      const { id } = point;
      const info = { index: i + 1, lastIndex };
      const properties = getProperties(apiName, point, info);
      const options = getOptions(apiName, info);
      const existedMarker = findMarker(markers, id);
      if (existedMarker) {
        api.Marker.changeMarker(existedMarker.marker, options, properties);
      } else {
        createMarker(point, options, properties);
      }
    });
  }, [points, map]);

  return null;
};

export default GeoMarkerList;
