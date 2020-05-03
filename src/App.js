import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import fetch from './utils/fetch.js';
import { get } from './enums/fetch.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: []
    }
  }

  componentDidMount() {
    fetch.get({
      type: get.ALL_REPOS,
      query: {
        name: 'netflix'
      }
    })
      .then(response => {
        console.log(response)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <List items={this.state.repositories} />
      </div>
    );
  }
}

export default App;
