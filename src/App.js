import React from 'react';
import logo from './logo.svg';
import './App.css';

import List from './components/List';
import RadioGroup from './components/RadioGroup.js';
import fetch from './utils/fetch.js';
import { get } from './enums/fetch.js';
import radioEnums from './enums/radioGroup.js';
import Button from "./components/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: 'microsoft',
      totalReposPage: 1,
      currentReposPage: 1,
      totalCommitsPage: 1,
      repositories: [],
      radioGroup: [radioEnums.FORKS, radioEnums.STARS],
      currentRadioSelected: radioEnums.FORKS
    }

    this.onRadioClick = this.onRadioClick.bind(this);
    this.getRepoCommits = this.getRepoCommits.bind(this);
  }

  componentDidMount() {
    this.getOrgRepos();
  }

  getOrgRepos() {
    const { organization, currentReposPage } = this.state;
    fetch.get({
      type: get.ALL_REPOS,
      query: {
        orgName: organization,
        page: currentReposPage
      }
    })
      .then(({ data, totalPage } = {}) => {
        if (Array.isArray(data)) {
          data.sort((a, b) => b.forks_count - a.forks_count);
          this.setState({
            repositories: data,
            currentRadioSelected: radioEnums.FORKS,
            totalRepoPage: totalPage
          });
        }
      })
  }

  onRadioClick(ev) {
    const { repositories, currentRadioSelected } = this.state;
    const changeValue = ev && ev.target && ev.target.value;
    if (changeValue) {
      let newRepositories = repositories;
      if (changeValue !== currentRadioSelected) {
        newRepositories = repositories.sort((a, b) => b[changeValue] - a[changeValue]);
      }
      this.setState({
        currentRadioSelected: changeValue,
        repositories: newRepositories
      });
    }
  }

  getRepoCommits(repoName) {
    fetch.get({
      type: get.VIEW_COMMITS,
      query: {
        orgName: this.state.organization,
        repoName
      }
    })
      .then(response => {
        console.log('what is repo click response', response)
      })
  }

  _renderLoadMoreRepos() {
    const { totalRepoPage, currentReposPage } = this.state;
    return totalRepoPage > currentReposPage && (
      <Button>
        Load More &#8250;
      </Button>
    );
  }

  render() {
    const { repositories, radioGroup, currentRadioSelected } = this.state;
    return (
      <div className="App">
        {/*<header className="App-header">*/}
        {/*</header>*/}
        <RadioGroup
          radioGroup={radioGroup}
          onChangeHandler={this.onRadioClick}
          currentRadioSelected={currentRadioSelected}
        />
        <List items={repositories} onRepoClick={this.getRepoCommits} />
        {this._renderLoadMoreRepos()}
      </div>
    );
  }
}

export default App;
