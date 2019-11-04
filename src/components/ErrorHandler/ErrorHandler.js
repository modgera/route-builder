import React from 'react';
import PropTypes from 'prop-types';

import './ErrorHandler.css';
import errorImg from './error.svg';

const ErrorHandler = ({ message }) => {
  return (
    <div className="error-handler__container">
      <div className="error-handler__logo">
        <img src={errorImg} alt="Error logo" />
      </div>
      <h2>Ooops! Something goes terribly wrong.</h2>
      <h3>Please try to reload your app.</h3>
      <p className="error-handler__text">{message}</p>
    </div>
  );
};

ErrorHandler.propTypes = {
  message: PropTypes.string,
};

ErrorHandler.defaultProps = {
  message: '',
};

export default ErrorHandler;
