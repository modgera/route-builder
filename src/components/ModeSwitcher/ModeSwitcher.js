import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked, faListOl } from '@fortawesome/free-solid-svg-icons';
import { GlobalContext } from '../../store/provider';

import './ModeSwitcher.css';

const modeInfo = {
  map: {
    name: 'Показать список',
    icon: faListOl,
    nextMode: 'list',
  },
  list: {
    name: 'Показать карту',
    icon: faMapMarked,
    nextMode: 'map',
  },
};

const ModeSwitcher = ({ currentMode, setCurrentMode }) => {
  const {
    state: { api, map },
  } = useContext(GlobalContext);
  const { name, icon, nextMode } = modeInfo[currentMode];

  const switchModeHandler = () => {
    setCurrentMode(nextMode);
  };

  useEffect(() => {
    if (currentMode === 'map') {
      api.Map.resize(map);
    }
  }, [currentMode]);

  return (
    <button type="button" onClick={switchModeHandler} className="mode-switcher">
      <FontAwesomeIcon icon={icon} />
      <span className="mode-switcher__title">{name}</span>
    </button>
  );
};

ModeSwitcher.propTypes = {
  currentMode: PropTypes.string.isRequired,
  setCurrentMode: PropTypes.func.isRequired,
};

export default ModeSwitcher;
