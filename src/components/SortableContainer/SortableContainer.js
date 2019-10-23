import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import PointItem from '../PointItem';

const SortableListContainer = ({ items, className }) => {
  const [oldItems, setOldItems] = useState([]);

  const newElements = items.filter(item => !oldItems.includes(item.id)).map(item => item.id);

  useEffect(() => {
    setTimeout(() => {
      const newItemsId = items.map(item => item.id);
      setOldItems(newItemsId);
    }, 200);
  }, [items]);

  const sortableItems = items.map((value, index) => {
    const animationClass = newElements.includes(value.id) ? 'item_new' : '';
    return <PointItem index={index} key={value.id} sortIndex={index} value={value} animationClass={animationClass} />;
  });
  return <ul className={className}>{sortableItems}</ul>;
};

SortableListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string.isRequired,
};
export default SortableContainer(SortableListContainer);
