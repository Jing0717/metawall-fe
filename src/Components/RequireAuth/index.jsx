import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return user?.id && children;
};

export default RequireAuth;
