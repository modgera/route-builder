import React, { useContext } from "react";
import { Polyline } from "react-yandex-maps";

import { PointsContext } from "../../contexts/Points/PointProvider";

const getRouteCoordinates = points => {
  return points.map(elem => elem.coordinates);
};

const MapRoute = () => {
  const { points } = useContext(PointsContext);
  return (
    <Polyline
      geometry={getRouteCoordinates(points)}
      options={{
        strokeColor: "#000",
        strokeWidth: 4,
        strokeOpacity: 0.5
      }}
    />
  );
};

export default MapRoute;
