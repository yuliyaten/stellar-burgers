import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerConstructorSelector,
  checkUserAuthThunk,
  orderBurgerThunk,
  orderModalDataSelector,
  orderRequestSelector,
  resetOrderModalData,
  userDataSelector,
  ingredientsArrSelector
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userDataSelector);
  const ingrArr = useSelector(ingredientsArrSelector);
  const orderRequest = useSelector(orderRequestSelector);
  const constructorItems = useSelector(burgerConstructorSelector);
  const orderModalData = useSelector(orderModalDataSelector);

  useEffect(() => {
    dispatch(checkUserAuthThunk()), [dispatch];
  });

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  if (user) {
    dispatch(orderBurgerThunk(ingrArr));
  } else {
    navigate('/login');
  }
  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
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
