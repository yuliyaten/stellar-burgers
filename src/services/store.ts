import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  burgerConstructorReducer,
  ingredientReducer,
  userOrdersReducer,
  feedsReducer,
  orderReducer,
  userReducer
} from '@slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientReducer,
    burgerConstructor: burgerConstructorReducer,
    userOrders: userOrdersReducer,
    feeds: feedsReducer,
    order: orderReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
