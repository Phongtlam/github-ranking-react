import React from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';
import dataAdapter from '../utils/commitDataAdapter.js';
import Button from './Button';

const commitsHeaders = ['Author', 'Commit URL', 'Verified', 'Commit Date'];

class CommitsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRowSelected: null,
    };
  }

  /**
   * on row click call back to open row data
   * @param sha {string} - sha of a specific commit, used as ID
   * @private
   */
  _onRowClick(sha) {
    this.setState({ currentRowSelected: sha });
  }

  _renderCurrentRowData({ author, commit }) {
    return (
      <div className="list-content-row-data list-content-info">
        <div className="list-content-row-data-child">
          <span className="list-content-row-data-child-span">
            <b>Author:</b> {author.name}
          </span>
          <span className="list-content-row-data-child-span">
            <b>Login Id:</b> {author.login}
          </span>
          <span className="list-content-row-data-child-span">
            <b>Profile Url:</b>{' '}
            <a
              href={author.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {author.profileUrl}
            </a>
          </span>
          <span className="list-content-row-data-child-span">
            <b>Date:</b> {commit.date}
          </span>
        </div>
        <div className="list-content-row-data-child">
          <span>
            <b>Parents:</b>
          </span>
          {commit.parents.map((el) => (
            <a
              href={el.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={el.sha}
            >
              {el.sha.substring(0, 7)}
            </a>
          ))}
        </div>
        <div className="list-content-row-data-child repositories-list-content-row-data-child-description">
          <b>Commit Message:</b> {commit.message}
        </div>
      </div>
    );
  }

  render() {
    const { currentRowSelected } = this.state;
    let { items, className, currentCommitRepoSelected, isMobile } = this.props;
    return (
      <ul className={classNames(className, 'commitsList-container')}>
        <header className="commitsList-header">
          {commitsHeaders.map((label) => (
            <span className="list-content" key={label}>
              {label}
            </span>
          ))}
        </header>
        <div className="list-body">
          {items.map((item) => {
            const adaptedData = dataAdapter(item);
            const { author, commit } = adaptedData;
            return (
              <li
                className={classNames('list-li commitList-li', {
                  active: currentRowSelected === commit.sha,
                })}
                key={commit.sha}
                onClick={() => this._onRowClick(commit.sha)}
              >
                <div className="list-content-main">
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
                        <i className="fa fa-github" aria-hidden="true" />{' '}
                        {commit.sha && commit.sha.substring(0, 7)}
                      </a>
                    </Button>
                  </div>
                  <span className={classNames("list-content", { 'text-center': isMobile })}>
                    {commit.verified && (
                      <i className={classNames("fa fa-check green-check")} aria-hidden="true" />
                    )}
                  </span>
                  <span className="list-content">
                    <i className="fa fa-calendar" aria-hidden="true" />{' '}
                    {commit.date}
                  </span>
                </div>
                {currentRowSelected === commit.sha &&
                  this._renderCurrentRowData(adaptedData)}
              </li>
            );
          })}
        </div>
        <footer className="list-footer commitsList-footer">
          <a
            href={currentCommitRepoSelected.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Button className="list-footer-pagination-button list-footer-pagination-button-github-link">
              <i className="fa fa-github" aria-hidden="true" />{' '}
              {currentCommitRepoSelected.full_name}
            </Button>
          </a>
          <span>
            Most recent <b>{items.length}</b> Commits on this Repo (Scroll to
            see more)
          </span>
        </footer>
      </ul>
    );
  }
}

CommitsList.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  currentCommitRepoSelected: PropTypes.object,
  isMobile: PropTypes.bool
};

CommitsList.defaultProps = {
  items: [],
  className: '',
  currentCommitRepoSelected: {},
  isMobile: false
};

export default CommitsList;
