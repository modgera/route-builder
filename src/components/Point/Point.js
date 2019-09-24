import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Placemark } from "react-yandex-maps";

import "./Point.css";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";
import { pointOptions } from "../../config";

const Point = props => {
  const { id, coordinates, address, name, ymap, index } = props;

  const options = props.options ? Object.assign(props.options, pointOptions) : pointOptions;

  const properties = {
    balloonContentHeader: name,
    balloonContent: address,
    iconContent: index
  };
  const modules = ["geoObject.addon.balloon"];

  const { dispatch } = useContext(GlobalContext);

  const onPointDragEnd = event => {
    const newCoordinates = event.originalEvent.target.geometry.getCoordinates();
    ymap.geocode(coordinates).then(res => {
      const firstGeoObject = res.geoObjects.get(0);
      dispatch({
        type: actions.CHANGE_POINT_INFO,
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
  name: PropTypes.string,
  iconColor: PropTypes.string,
  index: PropTypes.number,
  options: PropTypes.object
};

export default Point;
