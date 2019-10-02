import React, { useContext } from 'react';
import SortableListContainer from '../SortableContainer';

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

  return <SortableListContainer items={points} onSortEnd={onSortEnd} distance={1} />;
};

export default PointList;
