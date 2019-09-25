import React, { useState, useContext } from 'react';
import './MarkerInput.css';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

const MarkerInput = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [pointName, setPointName] = useState('');
  const { map, api } = state;

  const onPointNameChange = e => {
    setPointName(e.target.value);
  };

  const addNewMarkerCallback = info => {
    dispatch({ type: actions.ADD_POINT, info });
    setPointName('');
    console.log(info);
  };
  const addNewMarker = e => {
    if (e.keyCode === 13 && pointName.length > 0) {
      api.Utils.getAddressFromCoordinate(
        pointName,
        map,
        addNewMarkerCallback
      );
    }
  };

  return (
    <div>
      <input
        placeholder="Новая точка маршрута"
        className="point-input"
        value={pointName}
        onChange={onPointNameChange}
        onKeyUp={addNewMarker}
      />
    </div>
  );
};

export default MarkerInput;
