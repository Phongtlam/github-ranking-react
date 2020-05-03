import React from 'react';
import './App.css';

import RepositoriesList from './components/RepositoriesList.js';
import RadioGroup from './components/RadioGroup.js';
import fetch from './utils/fetch.js';
import { get } from './enums/fetch.js';
import radioEnums from './enums/radioGroup.js';
import Button from './components/Button';
import CommitsList from './components/CommitsList';

const initialState = {
  organization: 'microsoft',
  totalReposPage: 1,
  currentReposPage: 1,
  totalCommitsPage: 1,
  currentCommitsPage: 1,
  repositories: [],
  commits: [],
  radioGroup: [radioEnums.FORKS, radioEnums.STARS],
  currentRadioSelected: radioEnums.FORKS,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

    this.onRadioClick = this.onRadioClick.bind(this);
    this.getRepoCommits = this.getRepoCommits.bind(this);
  }

  componentDidMount() {
    this.getOrgRepos();
  }

  getOrgRepos() {
    const { organization, currentReposPage } = this.state;
    fetch
      .get({
        type: get.ALL_REPOS,
        query: {
          orgName: organization,
          page: currentReposPage,
        },
      })
      .then(({ data, totalPage } = {}) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => b.forks_count - a.forks_count);
          this.setState({
            ...initialState,
            repositories: data,
            totalRepoPage: totalPage,
          });
        }
      });
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

  getRepoCommits(repoName) {
    fetch
      .get({
        type: get.VIEW_COMMITS,
        query: {
          orgName: this.state.organization,
          repoName,
        },
      })
      .then((response) => {
        console.log('what is repo click response', response);
        const { data } = response;
        this.setState({
          commits: data,
        });
      });
  }

  _renderLoadMoreRepos() {
    const { totalRepoPage, currentReposPage } = this.state;
    return (
      totalRepoPage > currentReposPage && (
        <Button>
          <span>Load More &#8250;</span>
        </Button>
      )
    );
  }

  render() {
    const {
      repositories,
      radioGroup,
      currentRadioSelected,
      currentReposPage,
      totalRepoPage,
      commits,
    } = this.state;
    return (
      <div className="App">
        <RadioGroup
          radioGroup={radioGroup}
          onChangeHandler={this.onRadioClick}
          currentRadioSelected={currentRadioSelected}
        />
        <RepositoriesList
          items={repositories}
          onRepoClick={this.getRepoCommits}
        />
        <span>
          Page {currentReposPage} / {totalRepoPage}
        </span>
        {this._renderLoadMoreRepos()}
        <CommitsList items={commits} />
      </div>
    );
  }
}

export default App;
