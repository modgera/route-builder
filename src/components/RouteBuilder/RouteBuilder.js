import React, { Fragment, useContext } from 'react';
import ApiSwitcher from '../ApiSwitcher';
import Loader from '../Loader';
import Map from '../Map';
import MarkerInput from '../MarkerInput';
import PointList from '../PointList';
import CleanPoints from '../CleanPoints';

import { GlobalContext } from '../../store/provider';
import './RouteBuilder.css';

const RouteBuilder = () => {
  const { state } = useContext(GlobalContext);
  const loader = state.loading ? <Loader /> : null;
  const containerClass = state.loading ? 'route-builder_disable' : 'route-builder';
  return (
    <Fragment>
      {loader}
      <div className={containerClass}>
        <ApiSwitcher />
        <CleanPoints />
        <MarkerInput />
        <Map />
        <PointList />
      </div>
    </Fragment>
  );
};

export default RouteBuilder;
