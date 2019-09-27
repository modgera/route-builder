import React, { useReducer, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import globalReducer from './reducer';
import actions from './actions';
import { getMapService } from '../services/getMapService';

const GlobalContext = createContext(null);

const Store = ({ children, apiName }) => {
  const initialState = {
    api: null,
    apiName,
    map: null,
    loading: true,
    points: [],
  };
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setMapApi = api => {
    dispatch({ type: actions.SET_MAP_API, info: { api, apiName } });
  };

  useEffect(() => {
    getMapService(state.apiName, setMapApi);
  }, [state.apiName]);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, Store };

Store.propTypes = {
  apiName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Store.defaultProps = {
  apiName: 'Yandex',
};
