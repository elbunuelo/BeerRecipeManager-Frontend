import axios from 'axios';
import constants from './constants';
import * as Storage from './utils/storage';

const session_keys = ['access-token', 'client', 'uid', 'expiry'];

const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line
      config.headers = {
        ...config.headers,
        'token-type': 'Bearer',
        ...Storage.get(session_keys),
      };

      return config;
    },
    error =>
      // Do something with request error
      Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => {
      if (response.headers['access-token']) {
        Storage.put({
            'access-token': response.headers['access-token'],
            client: response.headers.client,
            expiry: response.headers.expiry,
            uid: response.headers.uid
        }, true);
      }

      return response;
    },
    error =>
      // Do something with response error
      Promise.reject(error),
  );
};


const execute = (method, url, data, params) => {
    return axios({
        baseURL: constants.backendUrl,
        url,
        method,
        data,
        params,
    });
};


const api = {
    get: (url, params) => {
        return execute('get', url, null, params);
    },
    post: (url, data) => {
        return execute('post', url, data);
    },
    delete: (url) => {
        return execute('delete', url);
    },
    put: (url, data) => {
        return execute('put', url, data);
    },
    clearSession: () => {
        Storage.clear(session_keys);
    },
    getSession: () => {
        return Storage.get(session_keys);
    }
};

setupInterceptors();
export default api;
