import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items }) => {
  console.log('what is items', items)
  return (
    <ul>
      {items.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  )
};

List.propTypes = {
  items: PropTypes.array
}

List.defaultProps = {
  items: []
}

export default List;
