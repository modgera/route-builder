import React, { useContext } from 'react';
import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

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
    <div>
      <button type="button" onClick={() => setNewApi('Yandex')}>
        Yandex
      </button>
      <button type="button" onClick={() => setNewApi('Google')}>
        Google
      </button>
    </div>
  );
};

export default ApiSwitcher;
