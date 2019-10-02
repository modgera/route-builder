import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/provider';
import getOptions from './settings';

const CenterMarker = () => {
  const {
    state: { apiName, map, api },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (map) {
      const options = getOptions(apiName);
      api.Marker.addCenterMarkerToMap(map, options);
    }
  }, [map]);

  return null;
};

export default CenterMarker;
