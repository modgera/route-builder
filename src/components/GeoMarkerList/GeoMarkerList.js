import { useContext, useEffect, useState } from 'react';
import actions from '../../store/actions';
import getOptions from './settings';

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

  const createMarker = (point, options) => {
    const { coordinates, id } = point;
    const marker = api.Marker.createMarker(map, options, coordinates);
    api.Marker.addOnDragEndEvent(marker, id, setNewCoordinates);
    const newMarkerInfo = {
      id,
      marker,
    };
    return newMarkerInfo;
  };

  useEffect(() => {
    if (points.length && map && api) {
      const [startPoint] = points;
      const { coordinates } = startPoint;
      api.Map.moveToFirstPoint(map, coordinates);
    }
    return () => {
      setMarkers([]);
    };
  }, [apiName]);

  useEffect(() => {
    const existingMarkers = markers.filter(currentMarker => {
      const { marker, id } = currentMarker;
      if (!findMarker(points, id)) {
        api.Marker.deleteMarker(marker, map);
        return false;
      }
      return true;
    });
    setMarkers(existingMarkers);
  }, [points]);

  useEffect(() => {
    const lastIndex = points.length;
    const newMarkers = [];
    points.forEach((point, i) => {
      const { id } = point;
      const info = { index: i + 1, lastIndex };
      const options = getOptions(apiName, point, info);
      const existedMarker = findMarker(markers, id);
      if (existedMarker) {
        api.Marker.changeMarker(existedMarker.marker, options);
      } else {
        const newMarker = createMarker(point, options);
        newMarkers.push(newMarker);
      }
    });
    if (newMarkers.length) {
      setMarkers([...markers, ...newMarkers]);
    }
  }, [points, map]);

  return null;
};

export default GeoMarkerList;
