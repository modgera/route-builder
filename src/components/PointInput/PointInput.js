import React, { useState, useContext } from "react";
import { v1 as uuid } from "uuid";
import "./PointInput.css";

import { PointsContext } from "../../contexts/Points/PointProvider";

const PointInput = ({ map, ymap }) => {
  const { dispatchPoints } = useContext(PointsContext);
  const [pointName, setPointName] = useState("");
  const onPointNameChange = e => {
    setPointName(e.target.value);
  };
  const getAddressFromCoordinate = async coordinates => {
    const coordinatesGeoInfo = await ymap.geocode(coordinates);
    //const geoInfo = Promise.all(coordinatesGeoInfo);
    return coordinatesGeoInfo;
  };

  const onPointKeyUp = e => {
    if (e.keyCode === 13) {
      const coordinates = map.getCenter();
      const address = ymap.geocode(coordinates).then(res => {
        const firstGeoObject = res.geoObjects.get(0);
        const info = {
          address: firstGeoObject.getAddressLine(),
          id: uuid(),
          name: pointName,
          coordinates: coordinates
        };
        dispatchPoints({ type: "ADD_POINT", info });
        // firstGeoObject.getLocalities().length
        //     ? firstGeoObject.getAddressLine()
        //     : firstGeoObject.getAdministrativeAreas()
      });
    }
  };
  return (
    <div>
      <input
        placeholder="Новая точка маршрута"
        className="point-input"
        value={pointName}
        onChange={onPointNameChange}
        onKeyUp={onPointKeyUp}
      />
    </div>
  );
};

export default PointInput;
