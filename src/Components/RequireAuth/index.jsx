import React, { useEffect } from 'react';
import { useLocation, Navigate, useNavigate, redirect } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      navigate('/');
    }
  }, [user, navigate]);

  return user?.id ? children : navigate('/login');
};

export default RequireAuth;
