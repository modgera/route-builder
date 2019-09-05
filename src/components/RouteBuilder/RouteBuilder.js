import React, { useContext } from "react";
import Map from "../Map";
import Loader from "../Loader";
import { GlobalContext } from "../../store/provider";

const RouteBuilder = () => {
  const { state } = useContext(GlobalContext);
  return <Map />;
};

export default RouteBuilder;
