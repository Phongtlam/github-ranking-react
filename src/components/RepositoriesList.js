import React from 'react';
import PropTypes from 'prop-types';

import classNames from '../utils/classNames';
import Button from '../components/Button.js';
import radioEnums from '../enums/radioGroup.js';

const headers = [
  radioEnums.NAME,
  radioEnums.FORKS,
  radioEnums.STARS,
  radioEnums.UPDATED_AT,
];

const nameMap = {
  [radioEnums.FORKS]: 'Forks',
  [radioEnums.STARS]: 'Stars',
  [radioEnums.UPDATED_AT]: 'Updated At',
  [radioEnums.NAME]: 'Name',
};

class RepositoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRowSelected: null,
    };
  }

  _onRowClick(rowId) {
    this.setState({ currentRowSelected: rowId });
  }

  _renderCurrentRowData(item) {
    return (
      <div className="repositories-list-content-row-data">
        <div className="repositories-list-content-row-data-child">
          <span>Full Name: {item.full_name}</span>
          <span>License: {item.license}</span>
          <span>Created: {item.created_at_readable}</span>
          <span>Updated: {item.updated_at_readable}</span>
        </div>
        <div className="repositories-list-content-row-data-child">
          <span>Language: {item.language}</span>
          <span>Open Issues: {item.open_issues_count}</span>
        </div>
        <div className="repositories-list-content-row-data-child repositories-list-content-row-data-child-description">
          Description: {item.description}
        </div>
      </div>
    );
  }

  render() {
    const { currentRowSelected } = this.state;
    const {
      items,
      onRepoClick,
      orgName,
      organization,
      reposSortedDesc,
      sortedBy,
      onTableHeaderClick,
      currentReposPage,
      totalReposPage,
      onPaginationClick,
    } = this.props;
    console.log('what is items', items);
    return (
      <ul>
        <header className="repositories-list repositories-list-header">
          {headers.map((label) => {
            return (
              <Button
                key={label}
                className={classNames(
                  'repositories-list-content repositories-list-content-button',
                  {
                    active: sortedBy === label,
                  }
                )}
                onClick={() => onTableHeaderClick(label)}
              >
                {nameMap[label]}
                {sortedBy === label && !reposSortedDesc && (
                  <i className="fa fa-chevron-up" aria-hidden="true" />
                )}
                {sortedBy === label && reposSortedDesc && (
                  <i className="fa fa-chevron-down" aria-hidden="true" />
                )}
              </Button>
            );
          })}
        </header>
        <div className="repositories-list-body">
          {items.map((item) => (
            <li
              onClick={() => {
                onRepoClick(orgName, item.name);
                this._onRowClick(item.id);
              }}
              className={classNames('repositories-list repositories-list-li')}
              key={item.id}
            >
              <span className="repositories-list-content">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.html_url}
                >
                  {item.name}
                </a>
              </span>
              <span className="repositories-list-content">
                <i className="fa fa-code-fork"> {item.forks_count}</i>
              </span>
              <span className="repositories-list-content">
                &#9733; {item.stargazers_count}
              </span>
              <span>
                <i className="fa fa-calendar" aria-hidden="true" />{' '}
                {item.updated_at_readable}
              </span>
              {currentRowSelected === item.id &&
                this._renderCurrentRowData(item)}
            </li>
          ))}
        </div>
        <footer className="repositories-list repositories-list-footer">
          <div className="repositories-list-footer-pagination">
            {currentReposPage > 1 ? (
              <Button
                className="repositories-list-footer-pagination-button"
                onClick={() =>
                  onPaginationClick(organization, currentReposPage - 1)
                }
              >
                <span>
                  <i className="fa fa-chevron-left" /> Last
                </span>
              </Button>
            ) : (
              <div className="repositories-list-footer-pagination-button" />
            )}
            <span className="repositories-list-footer-pagination-page">
              Page {currentReposPage} / {totalReposPage}
            </span>
            {totalReposPage > currentReposPage ? (
              <Button
                className="repositories-list-footer-pagination-button"
                onClick={() =>
                  onPaginationClick(organization, currentReposPage + 1)
                }
              >
                <span>
                  Next <i className="fa fa-chevron-right" />
                </span>
              </Button>
            ) : (
              <div className="repositories-list-footer-pagination-button" />
            )}
          </div>
          <span className="repositories-list-footer-pagination-page">
            {items.length} Repositories per Page (Scroll to see more)
          </span>
        </footer>
      </ul>
    );
  }
}

RepositoriesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      html_url: PropTypes.string,
      forks_count: PropTypes.number,
      stargazers_count: PropTypes.number,
      updated_at_readable: PropTypes.string,
    })
  ),
  onRepoClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  organization: PropTypes.string,
};

RepositoriesList.defaultProps = {
  items: [],
  onRepoClick: () => {},
  onPaginationClick: () => {},
  organization: '',
};

export default RepositoriesList;
