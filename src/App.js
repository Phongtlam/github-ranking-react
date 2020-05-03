import React from 'react';
import logo from './logo.svg';
import './App.css';

import List from './components/List';
import RadioGroup from './components/RadioGroup.js';
import fetch from './utils/fetch.js';
import { get } from './enums/fetch.js';
import radioEnums from './enums/radioGroup.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: 'netflix',
      orgPage: 1,
      commitPage: 1,
      repositories: [],
      radioGroup: [radioEnums.FORKS, radioEnums.STARS],
      currentRadioSelected: radioEnums.FORKS
    }

    this.onRadioClick = this.onRadioClick.bind(this);
    this.onRepoClick = this.onRepoClick.bind(this);
  }

  componentDidMount() {
    this.getOrgRepo();
  }

  getOrgRepo() {
    const { organization, orgPage } = this.state;
    fetch.get({
      type: get.ALL_REPOS,
      query: {
        orgName: organization,
        orgPage
      }
    })
      .then(response => {
        if (Array.isArray(response)) {
          response.sort((a, b) => b.forks_count - a.forks_count);
          this.setState({
            repositories: response,
            currentRadioSelected: radioEnums.FORKS
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

  onRepoClick(repoName) {
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
        <List items={repositories} onRepoClick={this.onRepoClick} />
      </div>
    );
  }
}

export default App;
