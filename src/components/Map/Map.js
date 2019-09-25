import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import CenterMarker from '../CenterMarker';

import './Map.css';

const Map = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const containerId = 'map-container';

  const setMapToState = map => {
    dispatch({
      type: actions.SET_MAP,
      info: { map, loading: false },
    });
  };

  useEffect(() => {
    console.log(state.map);
    if (state.api && !state.map) {
      state.api.Map.createMap(containerId, setMapToState);
    }
  }, [state.api]);

  return (
    <div id={containerId} className="map-container">
      <CenterMarker />
    </div>
  );
};

export default Map;
