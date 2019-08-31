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

  const getAddressFromCoordinate = e => {
    if (e.keyCode === 13) {
      const coordinates = map.getCenter();
      ymap.geocode(coordinates).then(res => {
        const firstGeoObject = res.geoObjects.get(0);
        const info = {
          address: firstGeoObject.getAddressLine(),
          id: uuid(),
          name: pointName,
          coordinates: coordinates
        };
        dispatchPoints({ type: "ADD_POINT", info });
        setPointName("");
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
        onKeyUp={getAddressFromCoordinate}
      />
    </div>
  );
};

export default PointInput;
