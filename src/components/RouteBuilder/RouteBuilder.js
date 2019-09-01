import React, { useContext, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import "./RouteBuilder.css";

import { mapQuery, pointColors } from "../../config";
import Point from "../Point";
import MapRoute from "../MapRoute";
import PointList from "../PointList";
import PointInput from "../PointInput";
import Loader from "../Loader";

import { GlobalContext } from "../../store/provider";

import markerIcon from "./plus-symbol.svg";

const RouteBuilder = () => {
  const defaultMapState = {
    center: [55.75, 37.57],
    zoom: 12,
    controls: []
  };
  const mapOptions = {
    suppressMapOpenBlock: true
  };

  const { state } = useContext(GlobalContext);

  const { points } = state;

  const [map, setMap] = useState(null);
  const [ymap, setУMap] = useState(null);
  const [centerPoint, setCenterPoint] = useState(null);
  const [load, setLoader] = useState(true);
  const [center, setCenter] = useState(null);

  const configureMap = map => {
    if (map) {
      map.events.add("click", e => {
        map.balloon.close();
      });
      map.events.add("actiontickcomplete", function(e) {
        var current_state = map.action.getCurrentState();
        if (centerPoint) {
          var geoCenter = map.options
            .get("projection")
            .fromGlobalPixels(current_state.globalPixelCenter, current_state.zoom);
          centerPoint.geometry.setCoordinates(geoCenter);
        }
      });
    }
    if (ymap) {
      ymap.geolocation.get().then(function(res) {
        const bounds = res.geoObjects.get(0).properties.get("boundedBy");
        const mapState = ymap.util.bounds.getCenter(bounds);
        if (!center) {
          setCenter(mapState);
          map.setCenter(mapState);
        }
        setLoader(false);
      });
    }
    setMap(map);
  };

  const setYMapState = ymap => {
    setУMap(ymap);
  };

  const setCenterPointState = point => {
    setCenterPoint(point);
  };

  const getPoints = points => {
    if (points) {
      const lastPoint = points.length - 1;
      return points.map((point, i) => (
        <Point
          {...point}
          key={point.id}
          index={i + 1}
          ymap={ymap}
          options={getPointOptions(i, lastPoint)}
        />
      ));
    }
    return null;
  };

  const getPointOptions = (i, last) => {
    const iconColor = i === last ? pointColors.end : pointColors.regular;
    return {
      iconColor: iconColor
    };
  };

  const mapPoints = getPoints(points);
  const mapRoute = points ? <MapRoute points={points} /> : null;
  const loader = load ? (
    <div className="route-builder__loader">
      <Loader />
    </div>
  ) : null;
  const className = load ? "route-builder_disable" : "route-builder";

  const mapCenter = map ? map.getCenter() : [55.75, 37.57];

  // if (ymap) {
  //   ymap.geolocation.get().then(function(res) {
  //     const bounds = res.geoObjects.get(0).properties.get("boundedBy");
  //     const mapState = ymap.util.bounds.getCenter(bounds);
  //     //setCenter(mapState);
  //     map.setCenter(mapState);
  //   });
  // }

  return (
    <React.Fragment>
      {loader}
      <div className={className}>
        <PointInput map={map} ymap={ymap} />
        <YMaps query={mapQuery}>
          <Map
            defaultState={defaultMapState}
            options={mapOptions}
            onLoad={ymap => setYMapState(ymap)}
            instanceRef={mapInst => configureMap(mapInst)}
            width="100%"
          >
            {mapPoints}
            <Placemark
              geometry={mapCenter}
              instanceRef={ref => setCenterPointState(ref)}
              options={{
                iconLayout: "default#image",
                iconImageHref: markerIcon,
                iconImageSize: [20, 20],
                iconImageOffset: [-10, -10],
                zIndex: 999
              }}
            />

            {mapRoute}
          </Map>
        </YMaps>
        <PointList map={map} />
      </div>
    </React.Fragment>
  );
};

export default RouteBuilder;
