import React from 'react';
import './App.css';

import RepositoriesList from './components/RepositoriesList.js';
import RadioGroup from './components/RadioGroup.js';
import fetch from './utils/fetch.js';
import { get } from './enums/fetch.js';
import radioEnums from './enums/radioGroup.js';
import Button from './components/Button';
import CommitsList from './components/CommitsList';
import LRUCache from './utils/dataStructure/LRUCache.js';
import repoDataAdapter from './utils/repoDataAdapter.js';
import sortByUtil from './utils/sortBy.js';
import classNames from './utils/classNames.js';

import repositoriesMock from './tests/mocks/repositories.js';
import commitsMock from './tests/mocks/commits.js';

const initialState = {
  organization: '',
  totalReposPage: 1,
  currentReposPage: 1,
  totalCommitsPage: 1,
  currentCommitsPage: 1,
  reposSortedDesc: true,
  repositories: [],
  // repositories: repositoriesMock.map(el => repoDataAdapter(el)),
  currentCommitsList: [],
  currentCommitRepoSelected: {},
  // currentCommitsList: commitsMock,
  radioGroup: [radioEnums.UPDATED_AT, radioEnums.FORKS, radioEnums.STARS],
  currentRadioSelected: radioEnums.UPDATED_AT,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.commits = new LRUCache(10, 900000);
    this.reposPages = new LRUCache(10, 900000);
    this.onRadioClick = this.onRadioClick.bind(this);
    this.getRepoCommits = this.getRepoCommits.bind(this);
    this.onTableHeaderClick = this.onTableHeaderClick.bind(this);
    this.getOrgRepos = this.getOrgRepos.bind(this);
  }

  componentDidMount() {
    const { organization, currentReposPage } = this.state;
    this.getOrgRepos(organization || 'netflix', currentReposPage);
  }

  /**
   * get organization repos by org name and page number
   * it will try to get from the FE cache first, if does not exist, will send fetch query
   * @param orgName {string}
   * @param page {number}
   */
  getOrgRepos(orgName, page) {
    const { organization, reposSortedDesc } = this.state;
    const reposPageContent = this.reposPages.get(page);

    if (organization !== orgName || !reposPageContent) {
      fetch
        .get({
          type: get.ALL_REPOS,
          query: {
            orgName,
            page,
            sort: 'updated',
          },
        })
        .then((response) => {
          if (!response) return;
          const { data, totalPage } = response;
          if (Array.isArray(data)) {
            const adaptedData = data.map((el) => repoDataAdapter(el));
            let newState = {};
            if (organization !== orgName) {
              this.commits = new LRUCache(10, 900000);
              this.reposPages = new LRUCache(10, 900000);
              newState = {
                ...initialState,
                totalReposPage: totalPage,
              };
            }
            newState = {
              ...newState,
              repositories: sortByUtil(
                adaptedData,
                radioEnums.UPDATED_AT,
                reposSortedDesc
              ),
              organization: orgName,
              currentReposPage: page,
            };
            this.setState(newState, () => {
              this.reposPages.put(page, adaptedData);
            });
          }
        });
    } else {
      this.setState(
        {
          repositories: sortByUtil(
            reposPageContent,
            radioEnums.UPDATED_AT,
            reposSortedDesc
          ),
          currentReposPage: page,
        },
        () => {
          this.reposPages.put(page, reposPageContent);
        }
      );
    }
  }

  /**
   * deprecated code used for radio buttons
   * @param ev {Event} - on radio click event call back, check event value
   */
  onRadioClick(ev) {
    const { repositories, currentRadioSelected } = this.state;
    const changeValue = ev && ev.target && ev.target.value;
    if (changeValue) {
      let newRepositories = repositories;
      if (changeValue !== currentRadioSelected) {
        newRepositories = repositories.sort(
          (a, b) => b[changeValue] - a[changeValue]
        );
      }
      this.setState({
        currentRadioSelected: changeValue,
        repositories: newRepositories,
      });
    }
  }

  /**
   * get repo commits by organization name, repo name and repoData
   * @param orgName {string}
   * @param repoName {string}
   * @param repoData {object}
   */
  getRepoCommits(orgName, repoName, repoData) {
    const { organization } = this.state;
    const commitsList = this.commits.get(repoName);
    if (commitsList && orgName === organization) {
      this.setState({
        currentCommitsList: commitsList,
        currentCommitRepoSelected: repoData,
      });
    } else {
      fetch
        .get({
          type: get.VIEW_COMMITS,
          query: {
            orgName: this.state.organization,
            repoName,
          },
        })
        .then((response) => {
          if (!response) return;
          const { data } = response;
          this.setState(
            {
              currentCommitsList: data,
              currentCommitRepoSelected: repoData,
            },
            () => {
              this.commits.put(repoName, data);
            }
          );
        });
    }
  }

  /**
   * table header click to sort repositories
   * can sort by a variety of property
   * double click will cause sorting ascending vs descending
   * @param sortBy {string}
   */
  onTableHeaderClick(sortBy) {
    const { repositories, currentRadioSelected, reposSortedDesc } = this.state;
    this.setState(
      {
        reposSortedDesc:
          sortBy === currentRadioSelected ? !reposSortedDesc : true,
      },
      () => {
        const newRepositories = sortByUtil(
          repositories,
          sortBy,
          this.state.reposSortedDesc
        );
        this.setState({
          currentRadioSelected: sortBy,
          repositories: newRepositories,
        });
      }
    );
  }

  render() {
    const {
      repositories,
      currentRadioSelected,
      currentReposPage,
      totalReposPage,
      currentCommitsList,
      organization,
      reposSortedDesc,
      currentCommitRepoSelected,
    } = this.state;
    return (
      <div className="App" id="App">
        <RepositoriesList
          className={classNames({
            'App-table': !currentCommitsList.length,
            'App-table-collapse': currentCommitsList.length,
          })}
          sortedBy={currentRadioSelected}
          reposSortedDesc={reposSortedDesc}
          items={repositories}
          onTableHeaderClick={this.onTableHeaderClick}
          orgName={organization}
          onRepoClick={this.getRepoCommits}
          currentReposPage={currentReposPage}
          totalReposPage={totalReposPage}
          onPaginationClick={this.getOrgRepos}
          organization={organization}
        />
        <div
          className={classNames('App-table-collapse', {
            hidden: !currentCommitsList.length,
          })}
        >
          {currentCommitsList.length ? (
            <Button
              onClick={() => {
                this.setState({
                  currentCommitsList: [],
                });
              }}
              className="close-commits-list"
            >
              <i className="fa fa-times" aria-hidden="true" />
            </Button>
          ) : null}
          <CommitsList
            className="commitsList-table"
            currentCommitRepoSelected={currentCommitRepoSelected}
            items={currentCommitsList}
          />
        </div>
      </div>
    );
  }
}

export default App;
