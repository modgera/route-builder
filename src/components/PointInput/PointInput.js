import React, { useState, useContext } from "react";
import { v1 as uuid } from "uuid";
import "./PointInput.css";

import { GlobalContext } from "../../store/provider";
import actions from "../../store/actions";

const PointInput = ({ map, ymap }) => {
  const { dispatch } = useContext(GlobalContext);
  const [pointName, setPointName] = useState("");

  const onPointNameChange = e => {
    setPointName(e.target.value);
  };

  const getAddressFromCoordinate = e => {
    if (e.keyCode === 13 && pointName.length > 0) {
      const coordinates = map.getCenter();
      ymap.geocode(coordinates).then(res => {
        const firstGeoObject = res.geoObjects.get(0);
        const info = {
          address: firstGeoObject.getAddressLine(),
          id: uuid(),
          name: pointName,
          coordinates: coordinates
        };
        dispatch({ type: actions.ADD_POINT, info });
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
