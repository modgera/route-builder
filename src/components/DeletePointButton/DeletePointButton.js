import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './DeletePointButton.css';

const DeletePointButton = ({ deletePointHandler }) => {
  return (
    <button type="button" onClick={deletePointHandler} className="delete-point-btn">
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

DeletePointButton.propTypes = {
  deletePointHandler: PropTypes.func.isRequired,
};

export default DeletePointButton;
