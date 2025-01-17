import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { getCookie } from '../../utils/cookie';

type IProtectedProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: IProtectedProps) => {
  const accessToken = getCookie('accessToken');

  if (onlyUnAuth) {
    if (accessToken) {
      return <Navigate replace to={'/'} />;
    } else {
      return <Outlet />;
    }
  }

  if (!onlyUnAuth) {
    if (!accessToken) {
      return <Navigate replace to={'/login'} />;
    } else {
      return <Outlet />;
    }
  }
};
