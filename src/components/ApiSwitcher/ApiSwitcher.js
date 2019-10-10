import React, { useContext } from 'react';
import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import './ApiSwitcher.css';

const ApiSwitcher = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const { apiName, api, map } = state;

  const setNewApi = newApiName => {
    if (apiName !== newApiName) {
      api.Map.destroy(map);
      dispatch({
        type: actions.CHANGE_API,
        info: { apiName: newApiName, loading: true },
      });
    }
  };

  return (
    <div className="api-switcher">
      <button type="button" onClick={() => setNewApi('Yandex')} className="yandex-api-btn">
        Яндекс Карты
      </button>
      <button type="button" onClick={() => setNewApi('Google')} className="google-api-btn">
        Google Maps
      </button>
    </div>
  );
};

export default ApiSwitcher;
