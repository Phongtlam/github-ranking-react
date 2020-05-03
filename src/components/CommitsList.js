import React from 'react';

import dataAdapter from '../utils/commitDataAdapter.js';

const CommitsList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        const { author, commit } = dataAdapter(item);
        return (
          <li key={commit.sha}>
            <div>
              <div>Author Info:</div>
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
              <span>{author.email}</span>
            </div>
            <div>
              <div>Commit Info:</div>
              <span>{commit.message}</span>
              <a
                href={commit.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {commit.commitUrl}
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommitsList;
