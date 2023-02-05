import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../Context/auth';
import useLocalStorage from '../../helpers/useLocalStorage';
import defaultAvatar from '../../assets/user_default.png';

const SocialLogin = ({ children }) => {
  const location = useLocation();
  const { setUser } = useAuth();

  useEffect(() => {
    if (location.search !== '' && location.search.includes('token')) {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');
      const id = searchParams.get('id');
      const name = searchParams.get('name');
      const avatar =
        searchParams.get('avatar') === 'undefined'
          ? defaultAvatar
          : searchParams.get('avatar');
      const coin = searchParams.get('coin');
      setUser({
        id,
        name,
        avatar,
        coin,
      });
      useLocalStorage.setUser(JSON.stringify({ id, name, avatar, coin }));
      useLocalStorage.setToken(token);
    }
  }, [location, setUser]);

  return children;
};

export default SocialLogin;
