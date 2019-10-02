import React from 'react';
import PropTypes from 'prop-types';

import './ErrorHandler.css';

const ErrorHandler = ({ message }) => {
  return <div>{message}</div>;
};

ErrorHandler.propTypes = {
  message: PropTypes.string,
};

ErrorHandler.defaultProps = {
  message: '',
};

export default ErrorHandler;
