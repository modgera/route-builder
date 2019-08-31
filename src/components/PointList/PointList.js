import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import "./PointList.css";

import { PointsContext } from "../../contexts/Points/PointProvider";

const PointList = ({ map }) => {
  const { points, dispatchPoints } = useContext(PointsContext);

  const createPointClickHandler = key => {
    return () => {
      console.log("here");
      const coordinates = points.filter(point => (point.id === key ? true : false))[0].coordinates;
      map.panTo(coordinates);
    };
  };

  const createDeletePointHandler = id => {
    return () => {
      dispatchPoints({ type: "DELETE_POINT", info: { id } });
    };
  };

  const SortableItem = SortableElement(({ value, sortIndex }) => (
    <li data-index={sortIndex}>
      {sortIndex + 1} - {value.name}
      <button onClick={createDeletePointHandler(value.id)}>X</button>
      <button onClick={createPointClickHandler(value.id)}>Go to</button>
    </li>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={value.id} index={index} sortIndex={index} value={value} />
        ))}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatchPoints({ type: "CHANGE_POINT_ORDER", info: { oldIndex, newIndex } });
  };

  return <SortableList items={points} onSortEnd={onSortEnd} />;
};

export default PointList;

PointList.propTypes = {
  points: PropTypes.PropTypes.arrayOf(PropTypes.object)
};
