import React, { useState, useContext } from 'react';
import { v1 as uuid } from 'uuid';
import './PointInput.css';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

const getPointInfo = async (api, map, pointName) => {
  const coordinates = api.Map.getMapCenter(map);
  const address = await api.Utils.getAddress(coordinates);
  return {
    address,
    id: uuid(),
    name: pointName,
    coordinates,
  };
};

const PointInput = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [pointName, setPointName] = useState('');
  const { map, api } = state;

  const onPointNameChange = e => {
    setPointName(e.target.value);
  };

  const addNewPoint = async e => {
    if (e.keyCode === 13 && pointName.length > 0) {
      const info = await getPointInfo(api, map, pointName);
      dispatch({ type: actions.ADD_POINT, info });
      setPointName('');
    }
  };

  return (
    <div className="point-input-container">
      <input
        placeholder="New point name"
        className="point-input"
        value={pointName}
        onChange={onPointNameChange}
        onKeyUp={addNewPoint}
      />
    </div>
  );
};

export default PointInput;
