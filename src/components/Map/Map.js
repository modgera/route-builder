import React, { useContext, useEffect } from 'react';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

import style from './Map.css';

const Map = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const containerId = 'map-container';

  const setMapToState = map => {
    dispatch({ type: actions.SET_MAP, info: { map } });
  };

  useEffect(() => {
    if (state.api) {
      state.api.Map.createMap(containerId, setMapToState);
    }
  }, [state.api]);

  return <div id={containerId} className={style.mapContainer} />;
};

export default Map;
