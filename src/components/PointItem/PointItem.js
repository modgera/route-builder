import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import DeletePointButton from '../DeletePointButton';

const PointItem = ({ sortIndex, value }) => {
  const {
    state: { map },
    dispatch,
  } = useContext(GlobalContext);

  const { id, name, coordinates } = value;

  const moveToPoint = () => {
    map.panTo(coordinates);
  };

  const onKeyUpHandler = e => {
    if (e.keyCode === 13) {
      moveToPoint();
    }
  };

  const deletePointHandler = () => {
    dispatch({ type: actions.DELETE_POINT, info: { id } });
  };

  const markerTitle = `${sortIndex + 1} - ${name}`;
  return (
    <li>
      <div role="button" tabIndex="0" data-index={sortIndex} onClick={moveToPoint} onKeyUp={onKeyUpHandler}>
        {markerTitle}
      </div>
      <DeletePointButton deletePointHandler={deletePointHandler} />
    </li>
  );
};

PointItem.propTypes = {
  sortIndex: PropTypes.number.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default SortableElement(PointItem);