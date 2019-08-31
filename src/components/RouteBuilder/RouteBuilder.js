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
    zoom: 12,
    controls: []
  };
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [yMap, setYMap] = useState(null);
  const { points } = useContext(PointsContext);

  const configureMap = mapInst => {
    setMap(mapInst);
    if (mapInst) {
      mapInst.events.add("click", e => {
        mapInst.balloon.close();
      });
    }
  };
  const setYMapState = ymap => {
    setYMap(ymap);
  };

  const getPoints = points => {
    if (points) {
      const lastPoint = points.length - 1;
      return points.map((point, i) => (
        <Point
          {...point}
          key={point.id}
          index={i + 1}
          ymap={yMap}
          iconColor={i === lastPoint ? "#790707" : "#46dff0"}
        />
      ));
    }
    return null;
  };

  const mapPoints = getPoints(points);
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
            options={{ suppressMapOpenBlock: true }}
            onLoad={ymap => setYMapState(ymap)}
            instanceRef={mapInst => configureMap(mapInst)}
            width="100%"
          >
            {mapPoints}
            {mapRoute}
          </Map>
        </YMaps>
        <PointList points={points} map={map} />
      </div>
    </React.Fragment>
  );
};

export default RouteBuilder;
