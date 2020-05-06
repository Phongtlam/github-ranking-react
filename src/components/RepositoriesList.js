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

  /**
   * on row click callback to open row data
   * @param rowId {number} - repo id
   * @private
   */
  _onRowClick(rowId) {
    this.setState({ currentRowSelected: rowId });
  }

  _renderCurrentRowData(item) {
    return (
      <div className="list-content-row-data">
        <div className="list-content-row-data-child">
          <span className="list-content-row-data-child-span">
            <b>Full Name:</b> {item.full_name}
          </span>
          <span className="list-content-row-data-child-span">
            <b>License:</b> {item.license}
          </span>
          <span className="list-content-row-data-child-span">
            <b>Created:</b> {item.created_at_readable}
          </span>
          <span className="list-content-row-data-child-span">
            <b>Updated:</b> {item.updated_at_readable}
          </span>
        </div>
        <div className="list-content-row-data-child">
          <span>
            <b>Language:</b> {item.language}
          </span>
          <span>
            <b>Open Issues:</b> {item.open_issues_count}
          </span>
        </div>
        <div className="list-content-row-data-child repositories-list-content-row-data-child-description">
          <b>Description:</b> {item.description}
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
      className,
      organization,
      reposSortedDesc,
      sortedBy,
      onTableHeaderClick,
      currentReposPage,
      totalReposPage,
      onPaginationClick,
    } = this.props;
    return (
      <ul className={classNames(className, 'repositories-list-container')}>
        <header className="repositories-list repositories-list-header">
          {headers.map((label) => {
            return (
              <Button
                key={label}
                className={classNames(
                  'list-content repositories-list-content-button',
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
        <div className="list-body">
          {items.map((item, idx) => (
            <li
              onClick={() => {
                onRepoClick(orgName, item.name, {
                  full_name: item.full_name,
                  html_url: item.html_url,
                });
                this._onRowClick(item.id);
              }}
              className={classNames('list-li', {
                active: currentRowSelected === item.id,
              })}
              key={item.id}
            >
              <span className="list-content">
                <span className="list-content-counter">{idx + 1}.</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.html_url}
                >
                  {item.name}
                </a>
              </span>
              <span className="list-content">
                <i className="fa fa-code-fork" /> {item.forks_count}
              </span>
              <span className="list-content">
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
        <footer className="repositories-list list-footer">
          <div className="list-footer-pagination">
            {currentReposPage > 1 ? (
              <Button
                className="list-footer-pagination-button"
                onClick={() =>
                  onPaginationClick(organization, currentReposPage - 1)
                }
              >
                <span>
                  <i className="fa fa-chevron-left" /> Last
                </span>
              </Button>
            ) : (
              <div className="list-footer-pagination-button" />
            )}
            <span className="list-footer-pagination-page">
              Page {currentReposPage} / {totalReposPage}
            </span>
            {totalReposPage > currentReposPage ? (
              <Button
                className="list-footer-pagination-button"
                onClick={() =>
                  onPaginationClick(organization, currentReposPage + 1)
                }
              >
                <span>
                  Next <i className="fa fa-chevron-right" />
                </span>
              </Button>
            ) : (
              <div className="list-footer-pagination-button" />
            )}
          </div>
          <spa className="list-footer-pagination-page organization-name">
            <b>ORG: {organization.toUpperCase()}</b>
          </spa>
          <span className="list-footer-pagination-page">
            <b>{items.length}</b> Repositories per Page (Scroll to see more)
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
  className: PropTypes.string,
  reposSortedDesc: PropTypes.bool,
  sortedBy: PropTypes.oneOf([
    radioEnums.FORKS,
    radioEnums.STARS,
    radioEnums.UPDATED_AT,
    radioEnums.NAME,
  ]),
  onTableHeaderClick: PropTypes.func,
  currentReposPage: PropTypes.number,
  totalReposPage: PropTypes.number,
};

RepositoriesList.defaultProps = {
  items: [],
  onRepoClick: () => {},
  onPaginationClick: () => {},
  organization: '',
  className: '',
  reposSortedDesc: true,
  sortBy: radioEnums.UPDATED_AT,
  onTableHeaderClick: () => {},
  currentReposPage: 1,
  totalReposPage: 1,
};

export default RepositoriesList;
