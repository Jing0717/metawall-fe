import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = user || {};
    if (!id) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return user?.id && children;
};

export default RequireAuth;
