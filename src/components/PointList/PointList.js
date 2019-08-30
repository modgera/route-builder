import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./PointList.css";

import { PointsContext } from "../../contexts/Points/PointProvider";

const PointList = () => {
  const { points } = useContext(PointsContext);
  const onPointClick = () => {};
  return (
    <ul>
      {points.map((point, i) => (
        <li data-index={i} onClick={onPointClick} key={point.id}>
          {point.name}
        </li>
      ))}
    </ul>
  );
};

export default PointList;

PointList.propTypes = {
  points: PropTypes.PropTypes.arrayOf(PropTypes.object)
};
