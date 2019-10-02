import React, { useReducer, createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import globalReducer from './reducer';
import actions from './actions';
import { getMapService } from '../services/getMapService';
import getTransformedPoints from '../services/coordinateTransform';
import ErrorHandler from '../components/ErrorHandler';

const GlobalContext = createContext(null);

const Store = ({ children, defaultApiName }) => {
  const initialState = {
    api: null,
    apiName: defaultApiName,
    map: null,
    loading: true,
    points: [],
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const { apiName, points } = state;

  const setMapApi = api => {
    const newPoints = getTransformedPoints(points, apiName, api);
    dispatch({ type: actions.SET_MAP_API, info: { api, apiName, points: newPoints } });
  };

  const throwError = message => {
    setErrorMessage(message);
  };

  useEffect(() => {
    getMapService(apiName, setMapApi, throwError);
  }, [apiName]);

  if (errorMessage) {
    return <ErrorHandler message={errorMessage} />;
  }
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, Store };

Store.propTypes = {
  defaultApiName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Store.defaultProps = {
  defaultApiName: 'Yandex',
};
