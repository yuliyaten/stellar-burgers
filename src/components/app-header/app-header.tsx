import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { userNameSelector } from '@slices';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(userNameSelector);
  return <AppHeaderUI userName={userName} />;
};
