import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import PointItem from '../PointItem';
import './SortableContainer.css';

const SortableListContainer = ({ items, className }) => {
  const sortableItems = items.map((value, index) => (
    <PointItem key={value.id} index={index} sortIndex={index} value={value} />
  ));
  return <ul className={className}>{sortableItems}</ul>;
};

SortableListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string.isRequired,
};

export default SortableContainer(SortableListContainer);
