import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import ErrorPage from './error-page';
import Register from './Pages/Register';
import Home from './Pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
