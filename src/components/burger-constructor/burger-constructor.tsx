import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  burgerQueryThunk,
  resetOrder,
  constructorSelector,
  orderRequestSelector,
  orderModalDataSelector
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(constructorSelector);
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();

  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const res = [];
    res.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((item) => res.push(item._id));
    res.push(constructorItems.bun._id);

    if (accessToken) dispatch(burgerQueryThunk(res));
    else navigate('/login');
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
