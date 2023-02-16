import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import ErrorPage from './error-page';
import Register from './Pages/Register';
import Home from './Pages/Home';
import { AuthProvider } from './Context/auth';
import SocialLogin from './Components/SocialLogin';
import RequireAuth from './Components/RequireAuth';
import Profile from './Pages/Profile';
import CreatePost from './Pages/CreatePost';
import Likes from './Pages/Likes';
import SinglePost from './Pages/SinglePost';
import User from './Pages/User';
import Follow from './Pages/Follow';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SocialLogin>
        <RequireAuth>
          <Home />
        </RequireAuth>
      </SocialLogin>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile',
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'create',
    element: (
      <RequireAuth>
        <CreatePost />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'likes',
    element: (
      <RequireAuth>
        <Likes />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'posts/:id',
    element: (
      <RequireAuth>
        <SinglePost />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'users/:id',
    element: (
      <RequireAuth>
        <User />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'follow',
    element: (
      <RequireAuth>
        <Follow />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
