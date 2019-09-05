import React, { useContext } from "react";
import { YMaps, Map } from "react-yandex-maps";

import "./RouteBuilder.css";

import { mapQuery, pointColors } from "../../config";
import Point from "../Point";
import MapRoute from "../MapRoute";
import PointList from "../PointList";
import PointInput from "../PointInput";
import Loader from "../Loader";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

const RouteBuilder = () => {
  const defaultMapState = {
    center: [55.75, 37.57],
    zoom: 12,
    controls: []
  };
  const mapOptions = {
    suppressMapOpenBlock: true
  };

  const { state, dispatch } = useContext(GlobalContext);

  const { points, map, ymap } = state;

  const configureMap = map => {
    if (map) {
      map.events.add("click", e => {
        map.balloon.close();
      });
    }
    dispatch({ type: actions.SET_MAP, info: { map } });
  };

  const setYMapState = ymap => {
    dispatch({ type: actions.SET_YMAP, info: { ymap } });
  };

  const getPoints = points => {
    if (points) {
      const lastPoint = points.length - 1;
      return points.map((point, i) => (
        <Point {...point} key={point.id} index={i + 1} options={getPointOptions(i, lastPoint)} />
      ));
    }
    return null;
  };

  const getPointOptions = (i, last) => {
    const iconColor = i === last ? pointColors.end : pointColors.regular;
    return { iconColor };
  };

  const mapPoints = getPoints(points);
  const mapRoute = points ? <MapRoute points={points} /> : null;
  const loader = ymap ? null : (
    <div className="route-builder__loader">
      <Loader />
    </div>
  );
  const className = map ? "route-builder" : "route-builder_disable";

  return (
    <React.Fragment>
      {loader}
      <div className={className}>
        <PointInput />
        <YMaps query={mapQuery}>
          <Map
            defaultState={defaultMapState}
            options={mapOptions}
            instanceRef={mapInst => configureMap(mapInst)}
            width="100%"
          >
            {mapPoints}
            {mapRoute}
          </Map>
        </YMaps>
        <PointList />
      </div>
    </React.Fragment>
  );
};

export default RouteBuilder;
