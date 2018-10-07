import qs from 'qs';
import 'isomorphic-fetch';

const BASE_URL = `https://api.flatlandchurch.com/v2/`;

const appendQueryStringToUrl = (stringUrl, params) => {
  return stringUrl + '?' + qs.stringify(params, { encode: false });
};

export default {
  post: (endpoint, body) => {
    const url = `${BASE_URL}${endpoint}`;
    return fetch(appendQueryStringToUrl(url, { key: '202f1c42-7054-46ee-8ca2-ddc85f9c789b' }), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      }
    }).then((data) => data.json());
  },
  get: (endpoint, queryParams) => {
    const url = `${BASE_URL}${endpoint}`;
    return fetch(
      appendQueryStringToUrl(
        url,
        Object.assign({}, queryParams, { key: 'pk_e6afff4e5ad186e9ce389cc21c225' }),
      ),
      { method: 'GET' },
    )
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else if (data.status === 404) {
          window.location.href = '/404';
        }
      })
      .then((data) => {
        if (data.message === 'Page does not exist') {
          window.location.href = '/404';
        } else {
          return data;
        }
      })
      .catch(() => window.location.href = '/404');
  },
}