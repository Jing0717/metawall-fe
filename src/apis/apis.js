import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import instance from './axios';
import useLocalStorage from '../helpers/useLocalStorage';

const getAuth = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getImgAuth = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
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
  editProfile: (params) =>
    request.patch(
      '/users/profile',
      params,
      getAuth(useLocalStorage.getToken())
    ),
  getLikesList: () =>
    request.get('/users/getLikesList/', getAuth(useLocalStorage.getToken())),
  updatePassword: (params) =>
    request.post(
      '/users/update_password',
      params,
      getAuth(useLocalStorage.getToken())
    ),
  getUserProfiles: (params) =>
    request.get(
      `/users/profile/${params.id}`,
      getAuth(useLocalStorage.getToken())
    ),
  follow: (params) =>
    request.post(
      `/users/${params.id}/follow`,
      {},
      getAuth(useLocalStorage.getToken())
    ),
  unFollow: (params) =>
    request.delete(
      `/users/${params.id}/unfollow`,
      {},
      getAuth(useLocalStorage.getToken())
    ),
};

const PostApis = {
  create: (params) =>
    request.post('/posts/create', params, getAuth(useLocalStorage.getToken())),
  getAll: (params = {}) =>
    request.get(`/posts`, getAuth(useLocalStorage.getToken())),
  getOne: (params) =>
    request.get(`/posts/${params.id}`, getAuth(useLocalStorage.getToken())),
  addLike: (params) =>
    request.post(
      `/posts/${params.postID}/likes`,
      params,
      getAuth(useLocalStorage.getToken())
    ),
  unLike: (params) =>
    request.delete(
      `/posts/${params.postID}/likes`,
      params,
      getAuth(useLocalStorage.getToken())
    ),
};

const CommentApis = {
  create: (params) =>
    request.post(
      `/posts/${params.postID}/comment`,
      { comment: params.comment },
      getAuth(useLocalStorage.getToken())
    ),
};

const upload = (params) =>
  request.post('/upload', params, getImgAuth(useLocalStorage.getToken()));

export { UserApis, PostApis, CommentApis, upload };
