import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Placemark } from "react-yandex-maps";

import "./Point.css";

import { PointsContext } from "../../contexts/Points/PointProvider";

const Point = ({ id, coordinates, address, name }) => {
  const options = {
    draggable: true,
    preset: "islands#circleIcon",
    balloonMinWidth: 100
  };

  const properties = {
    balloonContentHeader: name,
    balloonContent: address
  };
  const modules = ["geoObject.addon.balloon"];

  const { dispatchPoints } = useContext(PointsContext);
  //useCallback ?
  const onPointDragEnd = event => {
    const newCoordinates = event.originalEvent.target.geometry.getCoordinates();
    dispatchPoints({
      type: "CHANGE_POINT_INFO",
      info: { id, coordinates: newCoordinates }
    });
  };

  return (
    <Placemark
      geometry={coordinates}
      options={options}
      properties={properties}
      modules={modules}
      onDragEnd={onPointDragEnd}
    />
  );
};

Point.propTypes = {
  id: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
  address: PropTypes.string,
  name: PropTypes.string
};

export default Point;
