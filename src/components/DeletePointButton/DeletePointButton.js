import React from 'react';
import PropTypes from 'prop-types';
import './DeletePointButton.css';

const DeletePointButton = ({ deletePointHandler }) => {
  return <button type="button" onClick={deletePointHandler} className="delete-point-btn" />;
};

DeletePointButton.propTypes = {
  deletePointHandler: PropTypes.func.isRequired,
};

export default DeletePointButton;
