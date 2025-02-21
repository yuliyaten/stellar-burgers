import {
  ordersQueryThunk,
  orderInfoThunk,
  initialState,
  ordersSlice
} from './ordersSlice';
import '@testing-library/jest-dom';
import { TFeedsResponse, TOrderResponse } from '@api';

describe('orderSlice test', () => {
  const mockOrderInfo: TFeedsResponse = {
    orders: [
      {
        ingredients: ['bun', 'main', 'bun'],
        _id: '67977623133acd001be4d049',
        status: 'done',
        createdAt: '2025-01-17T13:00:50.883Z',
        updatedAt: '2025-01-17T13:00:51.581Z',
        number: 65814,
        name: 'Флюоресцентный люминесцентный бургер'
      }
    ],
    total: 68447,
    totalToday: 73,
    success: true
  };

  const orderResponse: TOrderResponse = {
    success: true,
    orders: [
      {
        ingredients: ['bun', 'main', 'bun'],
        _id: '67977623133acd001be4d049',
        status: 'done',
        createdAt: '2025-01-17T13:00:50.883Z',
        updatedAt: '2025-01-17T13:00:51.581Z',
        number: 65814,
        name: 'Флюоресцентный люминесцентный бургер'
      }
    ]
  };

  test('pending test', () => {
    const state = { ...initialState, loading: true };
    const newState = ordersSlice.reducer(
      state,
      ordersQueryThunk.pending('unknown')
    );

    expect(state).toEqual(newState);
    expect(newState.loading).toBeTruthy();
  });

  test('rejection test', () => {
    const state = { ...initialState, error: 'ordersQueryThunk error' };
    const newState = ordersSlice.reducer(
      state,
      ordersQueryThunk.rejected(new Error('ordersQueryThunk error'), 'unknown')
    );
    expect(state).toEqual(newState);
  });

  test('fulfilled test', () => {
    const state = {
      ...initialState,
      orders: [
        {
          ingredients: ['bun', 'main', 'bun'],
          _id: '67977623133acd001be4d049',
          status: 'done',
          createdAt: '2025-01-17T13:00:50.883Z',
          updatedAt: '2025-01-17T13:00:51.581Z',
          number: 65814,
          name: 'Флюоресцентный люминесцентный бургер'
        }
      ],
      total: 68447,
      totalToday: 73,
      success: true
    };
    const newState = ordersSlice.reducer(
      state,
      ordersQueryThunk.fulfilled(mockOrderInfo, '')
    );

    expect(state).toEqual(newState);
    expect(newState.orders).toEqual(mockOrderInfo.orders);
    expect(newState.total).toBe(68447);
    expect(newState.totalToday).toBe(73);
  });

  test('fulfilled test get by id', () => {
    const state = { ...initialState, orderData: mockOrderInfo.orders[0] };
    const newState = ordersSlice.reducer(
      state,
      orderInfoThunk.fulfilled(orderResponse, 'unknown', 0)
    );

    expect(state).toEqual(newState);
  });
});
