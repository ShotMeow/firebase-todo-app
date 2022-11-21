import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/AuthContextProvider';

const PrivateRoute: FC = () => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
