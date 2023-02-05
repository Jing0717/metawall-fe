import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logOut = (callback) => {
    useLocalStorage.removeUser();
    useLocalStorage.removeToken();
    setUser(null);
    callback();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
