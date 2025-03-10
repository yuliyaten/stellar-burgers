import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  userOrdersSelector,
  ordersQueryThunk
} from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(ordersQueryThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
