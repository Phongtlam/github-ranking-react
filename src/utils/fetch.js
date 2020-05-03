import queryBuilder from './queryParamsBuilder.js';

class Fetch {
  constructor() {
    this.serverUrl = 'http://localhost:3001';
  }

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
      });
  }
}

export default new Fetch();
