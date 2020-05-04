import React from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames.js';

const Button = ({ className, children, onClick, ...extraProps }) => (
  <button
    className={classNames('button', className)}
    {...extraProps}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Button;
