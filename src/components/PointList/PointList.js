import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import "./PointList.css";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

const PointList = ({ map }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { points } = state;

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={value.id} index={index} sortIndex={index} value={value} />
        ))}
      </ul>
    );
  });

  const SortableItem = SortableElement(({ value, sortIndex }) => (
    <li data-index={sortIndex} onClick={createPointClickHandler(value.id)}>
      {sortIndex + 1} - {value.name}
      <button onClick={createDeletePointHandler(value.id)}>X</button>
    </li>
  ));

  const createPointClickHandler = key => {
    return () => {
      const coordinates = points.filter(point => (point.id === key ? true : false))[0].coordinates;
      map.panTo(coordinates);
    };
  };

  const createDeletePointHandler = id => {
    return () => {
      dispatch({ type: actions.DELETE_POINT, info: { id } });
    };
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch({ type: actions.CHANGE_POINT_ORDER, info: { oldIndex, newIndex } });
  };

  return <SortableList items={points} onSortEnd={onSortEnd} distance={1} />;
};

export default PointList;

PointList.propTypes = {
  points: PropTypes.PropTypes.arrayOf(PropTypes.object)
};
