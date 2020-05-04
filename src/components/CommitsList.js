import React from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames'
import dataAdapter from '../utils/commitDataAdapter.js';
import Button from "./Button";

const commitsHeaders = [
  'Author',
  'Sha',
  'Verified',
  'Commit Date'
]

const CommitsList = ({ items, className }) => {
  return (
    <ul className={classNames(className, 'commitsList-container')}>
      <header className="commitsList-header">
        {commitsHeaders.map(label => <span className="list-content" key={label}>{label}</span>)}
      </header>
      <div className="list-body">
        {items.map((item) => {
          const { author, commit } = dataAdapter(item);
          console.log(commit.verified)
          return (
            <li className="list-li commitList-li" key={commit.sha}>
              <div className="list-content">
                {author.profileUrl ? (
                  <a
                    href={author.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author.name}
                  </a>
                ) : (
                  <span>{author.name}</span>
                )}
              </div>
              <div className="list-content">
                <Button title={commit.sha} className="sha-link">
                  <a
                    href={commit.commitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <i className="fa fa-github" aria-hidden="true"/> {commit.sha && commit.sha.substring(0, 7)}
                  </a>
                </Button>
              </div>
              <span className="list-content">
                {commit.verified && <i className="fa fa-check green-check" aria-hidden="true" />}
              </span>
              <span className="list-content">
                <i className="fa fa-calendar" aria-hidden="true" />{' '}
                {commit.date}
              </span>
            </li>
          );
        })}

      </div>
    </ul>
  );
};

CommitsList.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string
}

CommitsList.defaultProps = {
  items: [],
  className: ''
}

export default CommitsList;
