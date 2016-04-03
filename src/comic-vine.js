import fetch from 'isomorphic-fetch';

const API_ENDPOINT = 'https://comicvine.gamespot.com/api';

export default class ComicVine {
  constructor({ key }) {
    this.apiKey = key;
  }

  search(options = {}) {
    const params = {
      ...options,
      ...(options.field_list ? { field_list: [ ...options.field_list, 'count_of_issue_appearances' ] } : {})
    };

    return this._fetch('/search', params).then(response => {
      return {
        ...response,
        results: response.results.sort((a, b) => b.count_of_issue_appearances - a.count_of_issue_appearances)
      };
    });
  }

  _fetch(...options) {
    return fetch(this._request(...options)).then(response => response.json());
  }

  _request(endpoint, options) {
    const params = {
      ...options,
      api_key: this.apiKey,
      format: 'json'
    };

    const querystring = Object.entries(params).map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(',') : value}`).join('&');

    return `${API_ENDPOINT}${endpoint}?${querystring}`;
  }
};
