import React, { Fragment, useContext, useState, useEffect, useCallback } from 'react';
import Loader from '../Loader';
import Map from '../Map';
import ControlPanel from '../ControlPanel';
import { GlobalContext } from '../../store/provider';
import ModeSwitcher from '../ModeSwitcher';
import './RouteBuilder.css';

const getContentClasses = mode => {
  switch (mode) {
    case 'map':
      return {
        mapClass: '',
        listClass: 'hidden',
      };
    case 'list':
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

const mobileModeWidth = 800;

const getNewMode = prevMode => {
  if (window.innerWidth <= mobileModeWidth) {
    if (prevMode === 'normal') {
      return 'map';
    }
    return prevMode;
  }
  return 'normal';
};

const createResizeListener = resizeHandler => {
  window.addEventListener('resize', resizeHandler, false);
  return () => window.removeEventListener('resize', resizeHandler, false);
};

const RouteBuilder = () => {
  const { state } = useContext(GlobalContext);
  const { map, loading } = state;
  const { innerWidth } = window;
  const initState = innerWidth <= mobileModeWidth ? 'map' : 'normal';
  const [currentMode, setCurrentMode] = useState(initState);

  const resizeHandler = useCallback(() => setCurrentMode(getNewMode), []);
  useEffect(() => createResizeListener(resizeHandler), []);

  const loader = loading ? <Loader /> : null;
  const containerClass = loading ? 'route-builder_disabled' : 'route-builder';
  const { mapClass, listClass } = getContentClasses(currentMode);
  const modeSwitcher =
    currentMode !== 'normal' && map ? <ModeSwitcher setCurrentMode={setCurrentMode} currentMode={currentMode} /> : null;
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
