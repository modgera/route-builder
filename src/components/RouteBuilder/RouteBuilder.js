import React, { Fragment, useContext, useState } from 'react';
import Loader from '../Loader';
import Map from '../Map';
import ControlPanel from '../ControlPanel';
import { GlobalContext } from '../../store/provider';
import ModeSwitcher from '../ModeSwitcher';
import './RouteBuilder.css';

const getContentClasses = mode => {
  switch (mode) {
    case 1:
      return {
        mapClass: '',
        listClass: 'hidden',
      };
    case 2:
      return {
        mapClass: 'hidden',
        listClass: '',
      };
    default:
      return {
        mapClass: '',
        listClass: '',
      };
  }
};

const RouteBuilder = () => {
  const { state } = useContext(GlobalContext);
  const { map, loading } = state;
  const { innerWidth } = window;
  const initState = innerWidth <= 800 ? 1 : 0;
  const [currentMode, setCurrentMode] = useState(initState);
  const loader = loading ? <Loader /> : null;
  const containerClass = loading ? 'route-builder_disabled' : 'route-builder';
  const { mapClass, listClass } = getContentClasses(currentMode);

  const modeSwitcher =
    currentMode !== 0 && map ? <ModeSwitcher setCurrentMode={setCurrentMode} currentMode={currentMode} /> : null;
  return (
    <Fragment>
      {loader}
      <div className={containerClass}>
        <Fragment>
          <ControlPanel listClass={listClass} />
          <Map mapClass={mapClass} />
        </Fragment>
        {modeSwitcher}
      </div>
    </Fragment>
  );
};

export default RouteBuilder;
