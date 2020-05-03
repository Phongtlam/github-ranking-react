import queryBuilder from './queryParamsBuilder.js';

class Fetch {
  constructor() {
    this.serverUrl = "http://localhost:3001";
  }

  get({ type, query = {} }, extras = {}) {
    return fetch(`${this.serverUrl}/get/${type}/?${queryBuilder(query)}`, extras)
      .then(res => res.json())
      .catch(error => {
        // error logging
      })
  }
}

export default new Fetch();
