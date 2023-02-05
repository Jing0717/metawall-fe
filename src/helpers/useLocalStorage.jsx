const useLocalStorage = {
  getToken: () => {
    const token = localStorage.getItem('token') || '';

    return token;
  },
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  getUser: () => {
    const user = localStorage.getItem('user') || '';
    return user;
  },
  setUser: (user) => {
    localStorage.setItem('user', user);
  },
  updateUser: (user) => {
    const oldData = localStorage.getItem('user') || '';
    const jsonfyData = JSON.parse(oldData);
    const mergeUserData = { ...jsonfyData, ...user };

    localStorage.setItem('user', JSON.stringify(mergeUserData));
  },
  tokenIsExists: () => {
    const token = localStorage.getItem('token') || '';

    return !!token;
  },
  removeUser: () => {
    localStorage.removeItem('user');
  },
  removeToken: () => {
    localStorage.removeItem('token');
  },
};

export default useLocalStorage;
