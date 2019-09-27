import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/provider';
import { getOptions, getProperties } from './settings';

const CenterMarker = () => {
  const {
    state: { apiName, map, api },
  } = useContext(GlobalContext);
  useEffect(() => {
    if (map) {
      const options = getOptions(apiName);
      const params = getProperties(apiName);
      api.Marker.addCenterMarkerToMap(map, options, params);
    }
  });
  return null;
};

export default CenterMarker;
