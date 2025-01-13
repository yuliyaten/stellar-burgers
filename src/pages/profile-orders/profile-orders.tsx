import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredientsThunk,
  getUserOrdersThunk,
  ordersSelector
} from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);

  /** TODO: взять переменную из стора */

  useEffect(() => {
    dispatch(getUserOrdersThunk());
    dispatch(getIngredientsThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
