import React, { useContext } from 'react';
import { GlobalContext } from '../../store/provider';
import actionTypes from '../../store/actions';

import './CleanPoints.css';

const CleanPoints = () => {
  const { dispatch } = useContext(GlobalContext);
  const cleanPoints = () => {
    dispatch({ type: actionTypes.DELETE_POINTS });
  };
  return (
    <button type="button" onClick={cleanPoints} className="clear-points">
      Clean all
    </button>
  );
};

export default CleanPoints;
