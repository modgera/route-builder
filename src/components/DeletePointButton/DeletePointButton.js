import React from 'react';
import PropTypes from 'prop-types';

const DeletePointButton = ({ deletePointHandler }) => {
  return (
    <button type="button" onClick={deletePointHandler}>
      X
    </button>
  );
};

DeletePointButton.propTypes = {
  deletePointHandler: PropTypes.func.isRequired,
};

export default DeletePointButton;
