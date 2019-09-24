import React, { useContext } from "react";
import { Polyline } from "react-yandex-maps";

import { GlobalContext } from "../../store/provider";

import { polylineOptions } from "../../config";

const getRouteCoordinates = points => {
  return points.map(elem => elem.coordinates);
};

const MapRoute = props => {
  const { state } = useContext(GlobalContext);
  const options = props.options ? Object.assign(polylineOptions, props.options) : polylineOptions;
  return <Polyline geometry={getRouteCoordinates(state.points)} options={options} />;
};

export default MapRoute;
