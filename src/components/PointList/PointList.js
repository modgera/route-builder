import React, { useContext, useState, useEffect } from 'react';
import SortableListContainer from '../SortableContainer';
import './PointList.css';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

const PointList = () => {
  const [isTouch, setIsTouch] = useState(false);
  const findTouch = () => {
    setIsTouch(true);
    window.removeEventListener('touchstart', findTouch, false);
  };
  useEffect(() => {
    window.addEventListener('touchstart', findTouch, false);
    return () => window.removeEventListener('touchstart', findTouch, false);
  }, []);

  const {
    state: { points },
    dispatch,
  } = useContext(GlobalContext);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch({ type: actions.CHANGE_POINT_ORDER, info: { oldIndex, newIndex } });
  };
  const scrollParams = isTouch ? { pressDelay: 250 } : { distance: 1 };

  return (
    <SortableListContainer
      items={points}
      helperClass="point-dragging"
      {...scrollParams}
      onSortEnd={onSortEnd}
      className="point-list"
    />
  );
};

export default PointList;
