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

const initialState = {
  organization: '',
  totalReposPage: 1,
  currentReposPage: 1,
  totalCommitsPage: 1,
  currentCommitsPage: 1,
  repositories: [],
  currentCommitsList: [],
  radioGroup: [radioEnums.FORKS, radioEnums.STARS],
  currentRadioSelected: radioEnums.FORKS,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.commits = new LRUCache(10, 900000);
    this.reposPages = new LRUCache(10, 900000);
    this.onRadioClick = this.onRadioClick.bind(this);
    this.getRepoCommits = this.getRepoCommits.bind(this);
  }

  componentDidMount() {
    const { organization, currentReposPage } = this.state;
    this.getOrgRepos(organization || 'netflix', currentReposPage);
  }

  getOrgRepos(orgName, page) {
    const { organization } = this.state;
    const reposPageContent = this.reposPages.get(page);

    if (organization !== orgName || !reposPageContent) {
      fetch
        .get({
          type: get.ALL_REPOS,
          query: {
            orgName,
            page,
            // 'per_page': 100,
            // 'sort': 'updated'
            sort: 'updated'
          },
        })
        .then(response => {
          if (!response) return;
          const { data, totalPage } = response;
          if (Array.isArray(data)) {
            let newState = {};
            if (organization !== orgName) {
              this.commits = new LRUCache(10, 900000);
              this.reposPages = new LRUCache(10, 900000);
              newState = {
                ...initialState,
                totalReposPage: totalPage
              };
            }
            newState = {
              ...newState,
              repositories: data.sort((a, b) => b.forks_count - a.forks_count),
              organization: orgName,
              currentReposPage: page
            };
            this.setState(newState, () => {
              this.reposPages.put(page, data)
            });
          }
        });
    } else {
      this.setState({
        repositories: reposPageContent.sort((a, b) => b.forks_count - a.forks_count),
        currentReposPage: page
      }, () => {
        this.reposPages.put(page, reposPageContent)
      });
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
        currentCommitsList: commitsList
      })
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
          this.setState({
            currentCommitsList: data,
          }, () => {
            this.commits.put(repoName, data)
          });
        });
    }
  }

  _renderLoadMoreRepos() {
    const { totalReposPage, currentReposPage, organization } = this.state;
    return (
      totalReposPage > currentReposPage && (
        <Button onClick={() => this.getOrgRepos(organization, currentReposPage + 1)}>
          <span>Next <i className="fa fa-chevron-right" /></span>
        </Button>
      )
    );
  }

  _renderGoBackPage() {
    const { currentReposPage, organization } = this.state;
    return (
      currentReposPage > 1 && (
        <Button onClick={() => this.getOrgRepos(organization, currentReposPage - 1)}>
          <span><i className="fa fa-chevron-left" /> Last</span>
        </Button>
      )
    )
  }

  render() {
    const {
      repositories,
      radioGroup,
      currentRadioSelected,
      currentReposPage,
      totalReposPage,
      currentCommitsList,
      organization
    } = this.state;
    return (
      <div className="App" id="App">
        <RadioGroup
          radioGroup={radioGroup}
          onChangeHandler={this.onRadioClick}
          currentRadioSelected={currentRadioSelected}
        />
        <RepositoriesList
          items={repositories}
          orgName={organization}
          onRepoClick={this.getRepoCommits}
        />
        {this._renderGoBackPage()}
        <span>
          Page {currentReposPage} / {totalReposPage}
        </span>
        {this._renderLoadMoreRepos()}
        <CommitsList items={currentCommitsList} />
      </div>
    );
  }
}

export default App;
