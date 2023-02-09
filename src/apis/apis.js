import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import instance from './axios';
import useLocalStorage from '../helpers/useLocalStorage';

const getAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const responseBody = (response) => response.data;
const errorBody = (error) => error.response.data;
const request = {
  get: (url, headers = {}) =>
    instance
      .get(url, { ...headers })
      .then(responseBody)
      .catch(errorBody),
  post: (url, body, headers = {}) =>
    instance.post(url, body, headers).then(responseBody).catch(errorBody),
  patch: (url, body, headers = {}) =>
    instance.patch(url, body, headers).then(responseBody).catch(errorBody),
  put: (url, body, headers = {}) =>
    instance.put(url, body, headers).then(responseBody).catch(errorBody),
  delete: (url, body, headers = {}) =>
    instance
      .delete(url, { data: body, ...headers })
      .then(responseBody)
      .catch(errorBody),
};

const UserApis = {
  login: (params) => request.post('/users/login', params),
  register: (params) => request.post('/users/create', params),
};

const PostApis = {};

export { UserApis, PostApis };
