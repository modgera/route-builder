import React, { useContext, useRef, useState } from "react";
import { YMaps, Map } from "react-yandex-maps";

import "./RouteBuilder.css";

import { mapQuery } from "../../config";
import Point from "../Point";
import MapRoute from "../MapRoute";
import PointList from "../PointList";
import PointInput from "../PointInput";
import Loader from "../Loader";

import { PointsContext } from "../../contexts/Points/PointProvider";

const RouteBuilder = () => {
  const defaultMapState = {
    center: [55.75, 37.57],
    zoom: 10,
    controls: []
  };
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [yMap, setYMap] = useState(null);
  const { points } = useContext(PointsContext);

  const setMapState = mapInst => {
    setMap(mapInst);
  };
  const setYMapState = ymap => {
    setYMap(ymap);
  };

  const mapPoints = points ? points.map(point => <Point {...point} key={point.id} />) : null;
  const mapRoute = points ? <MapRoute points={points} /> : null;
  const loader = yMap ? null : (
    <div className="route-builder__loader">
      <Loader />
    </div>
  );
  const className = map ? "route-builder" : "route-builder_disable";

  return (
    <React.Fragment>
      {loader}
      <div className={className}>
        <PointInput ymap={yMap} map={map} />
        <YMaps query={mapQuery}>
          <Map
            defaultState={defaultMapState}
            onLoad={ymap => setYMapState(ymap)}
            instanceRef={mapInst => setMapState(mapInst)}
            width="100%"
          >
            {mapPoints}
            {mapRoute}
          </Map>
        </YMaps>
        <PointList points={points} />
      </div>
    </React.Fragment>
  );
};

export default RouteBuilder;
