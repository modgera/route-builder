import React from 'react';
import PropTypes from 'prop-types';
import PointList from '../PointList';
import CleanPoints from '../CleanPoints';
import ApiSwitcher from '../ApiSwitcher';
import PointInput from '../PointInput';
import './ControlPanel.css';

const ControlPanel = ({ listClass }) => {
  const containerMod = listClass ? `control-panel__container_${listClass}` : '';
  const contentMod = listClass ? `control-panel__content_${listClass}` : '';
  return (
    <div className={`control-panel__container ${containerMod}`}>
      <ApiSwitcher />
      <PointInput />
      <div className={`control-panel__content ${contentMod}`}>
        <div className="control-panel__header">
          <span>Route points:</span>
          <CleanPoints />
        </div>
        <PointList />
      </div>
    </div>
  );
};

ControlPanel.propTypes = {
  listClass: PropTypes.string,
};

ControlPanel.defaultProps = {
  listClass: '',
};

export default ControlPanel;
