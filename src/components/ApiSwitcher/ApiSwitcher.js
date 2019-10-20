import React, { useContext } from 'react';
import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import ApiButton from '../ApiButton';
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
      <ApiButton setNewApi={setNewApi} apiName={apiName} buttonApiName="Yandex">
        Яндекс Карты
      </ApiButton>
      <ApiButton setNewApi={setNewApi} apiName={apiName} buttonApiName="Google">
        Google Maps
      </ApiButton>
    </div>
  );
};

export default ApiSwitcher;
