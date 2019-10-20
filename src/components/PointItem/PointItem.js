import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import { GlobalContext } from '../../store/provider';
import actions from '../../store/actions';
import DeletePointButton from '../DeletePointButton';
import './PointItem.css';

const PointItem = ({ sortIndex, value }) => {
  const {
    state: { map, api },
    dispatch,
  } = useContext(GlobalContext);

  const { id, name, coordinates } = value;

  const moveToPoint = () => {
    api.Map.panTo(map, coordinates);
  };

  const onKeyUpHandler = e => {
    if (e.keyCode === 13) {
      moveToPoint();
    }
  };

  const deletePointHandler = e => {
    dispatch({ type: actions.DELETE_POINT, info: { id } });
    e.stopPropagation();
  };

  const markerTitle = `${sortIndex + 1} - ${name}`;
  return (
    <li className="point-item" onClick={moveToPoint} onKeyUp={onKeyUpHandler} tabIndex="0">
      <div data-index={sortIndex} className="point-item__title">
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
    coordinates: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.object]),
  }).isRequired,
};

export default SortableElement(PointItem);
