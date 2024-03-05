import Cookies from 'js-cookie';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = Cookies.get('token') ? true : false;

  return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;