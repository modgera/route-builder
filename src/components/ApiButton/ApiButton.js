import React from 'react';
import PropTypes from 'prop-types';
import './ApiButton.css';

const getButtonParams = (apiName, buttonApiName, onClickHandler) => {
  if (apiName === buttonApiName) {
    return {
      className: 'api-btn_active',
      onClick: null,
      disabled: true,
    };
  }
  return {
    className: 'api-btn',
    onClick: () => onClickHandler(buttonApiName),
    disabled: false,
  };
};

const ApiButton = ({ apiName, buttonApiName, setNewApi, children }) => {
  const params = getButtonParams(apiName, buttonApiName, setNewApi);
  return (
    <button type="button" {...params}>
      {children}
    </button>
  );
};

ApiButton.propTypes = {
  apiName: PropTypes.string.isRequired,
  buttonApiName: PropTypes.string.isRequired,
  setNewApi: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default ApiButton;
