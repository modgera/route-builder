import React, { useContext } from 'react';
import { GlobalContext } from '../../store/provider';
import actionTypes from '../../store/actions';

const CleanPoints = () => {
  const { dispatch } = useContext(GlobalContext);
  const cleanPoints = () => {
    dispatch({ type: actionTypes.DELETE_POINTS });
  };
  return (
    <button type="button" onClick={cleanPoints}>
      Очистить
    </button>
  );
};

export default CleanPoints;
