import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import CenterMarker from '../CenterMarker';
import GeoMarkerList from '../GeoMarkerList';
import MapRoute from '../MapRoute';
import { getOptions, CONTAINER_ID } from './settings';

import './Map.css';

const Map = ({ mapClass }) => {
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
      const useMap = async () => {
        const newMap = await api.Map.createMap(CONTAINER_ID, options);
        setMapToState(newMap);
      };
      useMap();
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

  const mapMod = mapClass ? `map-container_${mapClass}` : '';
  return (
    <div id={CONTAINER_ID} className={`map-container ${mapMod}`}>
      {content}
    </div>
  );
};

Map.propTypes = {
  mapClass: PropTypes.string,
};

Map.defaultProps = {
  mapClass: '',
};

export default Map;
