import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorHandler from '../ErrorHandler';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, message: error.message });
  }

  render() {
    const { hasError, message } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorHandler message={message} />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ErrorBoundary;
