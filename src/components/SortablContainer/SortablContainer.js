import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import PointItem from '../PointItem';

const SortablListContainer = ({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <PointItem key={value.id} index={index} sortIndex={index} value={value} />
      ))}
    </ul>
  );
};

SortablListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SortableContainer(SortablListContainer);
