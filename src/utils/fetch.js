import queryBuilder from './queryParamsBuilder.js';

class Fetch {
  constructor() {
    this.serverUrl = 'http://localhost:3000';
    if (process.env.REACT_APP_ENVIRONMENT === 'production') {
      this.serverUrl = 'https://github-viewer-server.herokuapp.com';
    }
  }

  /**
   * get fetch
   * @param type {string} - fetch for commits or organizations repos... etc
   * @param query {object} - query params, in object form
   * @param options {object} - extra options to pass through query
   * @returns {Promise<any>}
   */
  get({ type, query = {} }, options = {}) {
    options = {
      method: 'GET',
      ...options,
    };
    return fetch(
      `${this.serverUrl}/get/${type}?${queryBuilder(query)}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
        throw new Error(res.status);
      })
      .catch((error) => {
        // error logging
        console.log(error);
      });
  }
}

export default new Fetch();
