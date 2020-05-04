import React from 'react';
import PropTypes from 'prop-types';

import radioEnums from '../enums/radioGroup.js';

const nameMap = {
  [radioEnums.FORKS]: 'Forks',
  [radioEnums.STARS]: 'Stars',
  [radioEnums.UPDATED_AT]: 'Updated At'
};

const RadioGroup = ({ radioGroup, onChangeHandler, currentRadioSelected }) => {
  return (
    <form>
      {radioGroup.map((name, idx) => (
        <div className="radio" key={`${name}-${idx}`}>
          <label>
            <input
              type="radio"
              value={name}
              checked={name === currentRadioSelected}
              onChange={onChangeHandler}
            />
            {nameMap[name]}
          </label>
        </div>
      ))}
    </form>
  );
};

RadioGroup.propTypes = {
  radioGroup: PropTypes.arrayOf(
    PropTypes.oneOf([radioEnums.FORKS, radioEnums.STARS, radioEnums.UPDATED_AT])
  ),
  onChangeHandler: PropTypes.func,
  currentRadioSelected: PropTypes.oneOf([radioEnums.FORKS, radioEnums.STARS, radioEnums.UPDATED_AT]),
};

RadioGroup.defaultProps = {
  radioGroup: [],
  onChangeHandler: () => {},
  currentRadioSelected: [],
};

export default RadioGroup;
