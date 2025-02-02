import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutQueryThunk } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(navigate);

  const handleLogout = () => {
    dispatch(logoutQueryThunk()).then(() => navigate('/'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
