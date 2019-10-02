import React, { useContext, useEffect, Fragment } from 'react';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import CenterMarker from '../CenterMarker';
import GeoMarkerList from '../GeoMarkerList';
import MapRoute from '../MapRoute';
import { getOptions, CONTAINER_ID } from './settings';

import './Map.css';

const Map = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { api, apiName, map, loading } = state;

  const setMapToState = map => {
    dispatch({
      type: actions.SET_MAP,
      info: { map, loading: false },
    });
  };

  useEffect(() => {
    if (api && !map) {
      const options = getOptions(apiName);
      api.Map.createMap(CONTAINER_ID, setMapToState, options);
    }
  }, [api]);

  const content =
    map && !loading ? (
      <Fragment>
        <CenterMarker />
        <GeoMarkerList />
        <MapRoute />
      </Fragment>
    ) : null;
  return (
    <div id={CONTAINER_ID} className="map-container">
      {content}
    </div>
  );
};

export default Map;
