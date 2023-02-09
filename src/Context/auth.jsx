import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';
import { UserApis } from '../apis/apis';
import defaultAvatar from '../assets/user_default.png';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const login = async (params, successCallback, failedCallback) => {
    const result = await UserApis.login(params);
    if (result.data && result.data.token) {
      const { id, name, avatar, coin } = result.data.user;
      const userAvatar = avatar === '' ? defaultAvatar : avatar;
      useLocalStorage.setUser(
        JSON.stringify({ id, name, avatar: userAvatar, coin })
      );
      useLocalStorage.setToken(result.data.token);
      setUser({
        id,
        name,
        avatar: userAvatar,
        coin,
      });
      successCallback();
    } else {
      failedCallback(result.message);
    }
  };
  const signup = async (params, successCallback, failedCallback) => {
    const result = await UserApis.register(params);

    if (result && result.data && result.data.token) {
      const { id, name, avatar, coin } = result.data.user;
      const userAvatar = avatar === '' ? defaultAvatar : avatar;
      useLocalStorage.setUser(
        JSON.stringify({ id, name, avatar: userAvatar, coin })
      );
      useLocalStorage.setToken(result.data.token);
      setUser({
        id,
        name,
        avatar: userAvatar,
        coin,
      });
      successCallback();
    } else {
      failedCallback(result.message);
    }
  };

  const logOut = (callback) => {
    useLocalStorage.removeUser();
    useLocalStorage.removeToken();
    setUser(null);
    callback();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logOut, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};
