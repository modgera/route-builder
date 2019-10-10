import React, { Fragment, useContext } from 'react';
import ApiSwitcher from '../ApiSwitcher';
import Loader from '../Loader';
import Map from '../Map';
import PointInput from '../PointInput';
import PointList from '../PointList';

import { GlobalContext } from '../../store/provider';
import './RouteBuilder.css';

const RouteBuilder = () => {
  const { state } = useContext(GlobalContext);
  const loader = state.loading ? <Loader /> : null;
  const containerClass = state.loading ? 'route-builder_disabled' : 'route-builder';
  return (
    <Fragment>
      {loader}
      <div className={containerClass}>
        <ApiSwitcher />
        <PointInput />
        <div className="route-map-container">
          <PointList />
          <Map />
        </div>
      </div>
    </Fragment>
  );
};

export default RouteBuilder;
