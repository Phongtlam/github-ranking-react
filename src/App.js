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

import repositoriesMock from './tests/mocks/repositories.js';

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
            // 'per_page': 100,
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

  getRepoCommits(orgName, repoName) {
    const { organization } = this.state;
    const commitsList = this.commits.get(repoName);
    if (commitsList && orgName === organization) {
      this.setState({
        currentCommitsList: commitsList,
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
            },
            () => {
              this.commits.put(repoName, data);
            }
          );
        });
    }
  }

  onTableHeaderClick(sortBy) {
    const { repositories, currentRadioSelected, reposSortedDesc } = this.state;
    // if (sortBy !== currentRadioSelected) {
    // }
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
      radioGroup,
      currentRadioSelected,
      currentReposPage,
      totalReposPage,
      currentCommitsList,
      organization,
      reposSortedDesc,
    } = this.state;
    return (
      <div className="App" id="App">
        {/*<RadioGroup*/}
        {/*  radioGroup={radioGroup}*/}
        {/*  onChangeHandler={this.onRadioClick}*/}
        {/*  currentRadioSelected={currentRadioSelected}*/}
        {/*/>*/}
        <RepositoriesList
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
        <CommitsList items={currentCommitsList} />
      </div>
    );
  }
}

export default App;
