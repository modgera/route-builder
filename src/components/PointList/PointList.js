import React, { useContext } from 'react';
import SortableListContainer from '../SortableContainer';
import CleanPoints from '../CleanPoints';
import './PointList.css';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

const PointList = () => {
  const {
    state: { points },
    dispatch,
  } = useContext(GlobalContext);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch({ type: actions.CHANGE_POINT_ORDER, info: { oldIndex, newIndex } });
  };

  return (
    <div className="point-list__container">
      <div className="point-list__header">
        <span>Точки маршрута:</span>
        <CleanPoints />
      </div>
      <SortableListContainer items={points} onSortEnd={onSortEnd} distance={1} className="point-list" />
    </div>
  );
};

export default PointList;
