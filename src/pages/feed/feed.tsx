import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersInfoSelector,
  ordersQueryThunk
} from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders } = useSelector(getOrdersInfoSelector);
  useEffect(() => {
    dispatch(ordersQueryThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(ordersQueryThunk())}
    />
  );
};
