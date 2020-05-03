import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button.js';

const List = ({ items, onRepoClick }) => {
  console.log('what is items', items)
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <Button onClick={() => onRepoClick(item.name)}>
            <span>{item.name}</span>
            <span><i className="fa fa-code-fork">{item.forks_count}</i></span>
            <span>&#9733; {item.stargazers_count}</span>
          </Button>
          <a target="_blank" rel="noopener noreferrer" href={item.html_url}>Visit repo on Github</a>
        </li>
      ))}
    </ul>
  )
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    html_url: PropTypes.string,
    forks_count: PropTypes.number,
    stargazers_count: PropTypes.number
  })),
  onRepoClick: PropTypes.func
}

List.defaultProps = {
  items: [],
  onRepoClick: () => {}
}

export default List;
