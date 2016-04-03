import fetch from 'isomorphic-fetch';

const API_ENDPOINT = 'https://comicvine.gamespot.com/api';
const STATIC_CONTENT_ENDPOINT = 'http://static.comicvine.com';

const log = (...args) => console.info('[ComicVine]', ...args);

export const ERROR = {
  EMPTY_RESULT: 1,
  EMPTY_QUERY: 2
};

const byIssueCount = (a, b) => {
  return b.count_of_issue_appearances - a.count_of_issue_appearances;
};

const hydrateImages = (images = {}) => {
  return Object.entries(images).reduce((state, [key, value]) => {
    return { ...state, [key]: STATIC_CONTENT_ENDPOINT + value };
  }, {});
};

export default class ComicVine {
  constructor({ key }) {
    this.apiKey = key;
  }

  search(options = {}) {
    const params = {
      ...options,
      ...(options.field_list ? { field_list: [ ...options.field_list, 'count_of_issue_appearances' ] } : {})
    };

    return new Promise(
      (resolve, reject) => params.query ? resolve(params) : reject(ERROR.EMPTY_QUERY)
    ).then(
      (params) => this._fetch('/search', params)
    ).then(
      (response) => response.results.length ? response : Promise.reject(ERROR.EMPTY_RESULT)
    ).then(
      (response) => ({
        ...response,
        results: response.results.sort(byIssueCount).map(({ image, ...rest }) => ({
          ...rest,
          ...(image && { image: hydrateImages(image) })
        }))
      })
    );
  }

  _fetch(...options) {
    const request = this._request(...options);

    log(request);

    return fetch(request).then(response => response.json());
  }

  _request(endpoint, options) {
    const params = {
      ...options,
      api_key: this.apiKey,
      format: 'json'
    };

    const querystring = Object.entries(params).map(this._encode).join('&');

    return `${API_ENDPOINT}${endpoint}?${querystring}`;
  }

  _encode([k, v]) {
    const values = Array.isArray(v) ? v : [v];
    return `${k}=${values.map(value => encodeURIComponent(value)).join(',')}`;
  }
};
