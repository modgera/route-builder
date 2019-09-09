import React, { useContext, Fragment } from "react";
import Map from "../Map";
import ApiSwitcher from "../ApiSwitcher";
import Loader from "../Loader";
import { GlobalContext } from "../../store/provider";

const RouteBuilder = () => {
  const { state } = useContext(GlobalContext);
  return (
    <Fragment>
      <ApiSwitcher />
      <Map />;
    </Fragment>
  );
};

export default RouteBuilder;
