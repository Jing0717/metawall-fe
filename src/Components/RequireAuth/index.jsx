import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import useLocalStorage from '../../helpers/useLocalStorage';

const RequireAuth = ({ children }) => {
  const { user, setUser } = useAuth();
  const localUser = useLocalStorage.getUser();

  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (JSON.parse(localUser)) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    const { id } = user || {};
    if (!id) {
      navigate('/login');
    }
  }, [user, navigate]);

  return user?.id && children;
};

export default RequireAuth;
