import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Placemark } from "react-yandex-maps";

import "./Point.css";

import { PointsContext } from "../../contexts/Points/PointProvider";

const Point = ({ id, coordinates, address, name, ymap, iconColor, index }) => {
  const options = {
    draggable: true,
    preset: "islands#circleIcon",
    balloonMinWidth: 100,
    iconColor: iconColor
  };

  const properties = {
    balloonContentHeader: name,
    balloonContent: address,
    iconContent: index
  };
  const modules = ["geoObject.addon.balloon"];

  const { dispatchPoints } = useContext(PointsContext);
  const onPointDragEnd = event => {
    const newCoordinates = event.originalEvent.target.geometry.getCoordinates();
    ymap.geocode(coordinates).then(res => {
      const firstGeoObject = res.geoObjects.get(0);
      dispatchPoints({
        type: "CHANGE_POINT_INFO",
        info: { id, coordinates: newCoordinates, address: firstGeoObject.getAddressLine() }
      });
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
