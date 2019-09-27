import React, { useContext } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import './PointList.css';

import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';

const PointList = () => {
  const {
    state: { map, points },
    dispatch,
  } = useContext(GlobalContext);

  const moveToPoint = key => {
    const [point] = points.filter(point => point.id === key);
    map.panTo(point.coordinates);
  };

  const createPointClickHandler = key => {
    return () => moveToPoint(key);
  };

  const createOnKeyUpHandler = key => {
    return e => {
      if (e.keyCode === 13) {
        moveToPoint(key);
      }
    };
  };

  const createDeletePointHandler = id => {
    return () => {
      dispatch({ type: actions.DELETE_POINT, info: { id } });
    };
  };

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={value.id} index={index} sortIndex={index} value={value} />
        ))}
      </ul>
    );
  });

  const SortableItem = SortableElement(({ value, sortIndex }) => {
    const { id, name } = value;
    const markerTitle = `${sortIndex + 1} - ${name}`;
    return (
      <li>
        <div
          role="button"
          tabIndex="0"
          data-index={sortIndex}
          onClick={createPointClickHandler(id)}
          onKeyUp={createOnKeyUpHandler(id)}
        >
          {markerTitle}
        </div>

        <button type="button" onClick={createDeletePointHandler(id)}>
          X
        </button>
      </li>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch({ type: actions.CHANGE_POINT_ORDER, info: { oldIndex, newIndex } });
  };

  return <SortableList items={points} onSortEnd={onSortEnd} distance={1} />;
};

export default PointList;
