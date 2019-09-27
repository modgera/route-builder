import React, { useContext, useEffect, Fragment } from 'react';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import CenterMarker from '../CenterMarker';
import GeoMarkerList from '../GeoMarkerList';
import MapRoute from '../MapRoute';

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
    if (state.api && !state.map) {
      state.api.Map.createMap(containerId, setMapToState);
    }
  }, [state.api]);

  const content = state.map ? (
    <Fragment>
      <CenterMarker />
      <GeoMarkerList />
      <MapRoute />
    </Fragment>
  ) : null;
  return (
    <div id={containerId} className="map-container">
      {content}
    </div>
  );
};

export default Map;
