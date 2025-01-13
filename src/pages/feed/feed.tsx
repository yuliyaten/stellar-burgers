import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk, getIngredientsThunk, ordersSelector } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);

  /** TODO: взять переменную из стора */
  useEffect(() => {
    dispatch(getFeedsThunk());
    dispatch(getIngredientsThunk());
  }, []);

  function handleGetFeeds() {
    dispatch(getFeedsThunk());
  }

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
