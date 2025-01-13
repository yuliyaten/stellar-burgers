import {
  checkUserAuthThunk,
  isAuthCheckedSelector,
  userDataSelector
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { Preloader } from '@ui';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={'/'} />;
  }

  return children;
};
