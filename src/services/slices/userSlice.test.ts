import {
  registerUserQueryThunk,
  loginUserQueryThunk,
  getUserQueryThunk,
  updateUserQueryThunk,
  ordersQueryThunk,
  logoutQueryThunk,
  userNameSelector,
  userOrdersSelector,
  initialState,
  userSlice
} from './userSlice';
import '@testing-library/jest-dom';
import { TOrder } from '@utils-types';

describe('userSlice test', () => {
  const mockOrders: TOrder[] = [
    {
      ingredients: ['bun', 'main', 'bun'],
      _id: '67977623133acd001be4d049',
      status: 'done',
      createdAt: '2025-01-17T13:00:50.883Z',
      updatedAt: '2025-01-17T13:00:51.581Z',
      number: 65814,
      name: 'Флюоресцентный люминесцентный бургер'
    },
    {
      ingredients: ['bun2', 'main2', 'bun2'],
      _id: '6797a1cc133acd001be4d086',
      status: 'done',
      createdAt: '2025-01-27T15:10:04.684Z',
      updatedAt: '2025-01-27T15:10:05.396Z',
      number: 66976,
      name: 'Space флюоресцентный метеоритный бургер'
    }
  ];

  test('registration test', () => {
    const state = {
      ...initialState,
      userData: { email: 'juliia.ten@gmail.com', name: 'Yuliya' }
    };

    const action = {
      type: registerUserQueryThunk.fulfilled.type,
      payload: { user: { email: 'juliia.ten@gmail.com', name: 'Yuliya' } }
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('registration pending test', () => {
    const state = {
      ...initialState,
      loading: true
    };

    const newState = userSlice.reducer(state, {
      type: registerUserQueryThunk.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  test('registration rejection test', () => {
    const state = { ...initialState, error: 'registerUserQueryThunk error' };

    const action = {
      type: registerUserQueryThunk.rejected.type,
      error: new Error('registerUserQueryThunk error')
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('login test', () => {
    const state = {
      ...initialState,
      userData: { email: 'juliia.ten@gmail.com', name: 'Yuliya' }
    };

    const action = {
      type: loginUserQueryThunk.fulfilled.type,
      payload: { user: { email: 'juliia.ten@gmail.com', name: 'Yuliya' } }
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('login pending test', () => {
    const state = { ...initialState, loading: true };

    const newState = userSlice.reducer(state, {
      type: loginUserQueryThunk.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  test('login rejection test', () => {
    const state = { ...initialState, error: 'loginUserQueryThunk error' };

    const action = {
      type: loginUserQueryThunk.rejected.type,
      error: new Error('loginUserQueryThunk error')
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('authorization test', () => {
    const state = {
      ...initialState,
      userData: { email: 'juliia.ten@gmail.com', name: 'Yuliya' }
    };

    const action = {
      type: getUserQueryThunk.fulfilled.type,
      payload: { user: { email: 'juliia.ten@gmail.com', name: 'Yuliya' } }
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('authorization pending test', () => {
    const state = { ...initialState, loading: true };

    const newState = userSlice.reducer(state, {
      type: getUserQueryThunk.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  test('authorization rejection test', () => {
    const state = { ...initialState, error: 'getUserQueryThunk error' };

    const action = {
      type: getUserQueryThunk.rejected.type,
      error: new Error('getUserQueryThunk error')
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('user data update test', () => {
    const state = {
      ...initialState,
      userData: { email: 'juliia.ten@gmail.com', name: 'Yuliya' }
    };

    const action = {
      type: updateUserQueryThunk.fulfilled.type,
      payload: { user: { email: 'juliia.ten@gmail.com', name: 'Yuliya' } }
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('user data pending test', () => {
    const state = { ...initialState, loading: true };

    const newState = userSlice.reducer(state, {
      type: updateUserQueryThunk.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  test('user data rejection test', () => {
    const state = { ...initialState, error: 'updateUserQueryThunk error' };

    const action = {
      type: updateUserQueryThunk.rejected.type,
      error: new Error('updateUserQueryThunk error')
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('orders history test', () => {
    const state = { ...initialState, orders: mockOrders };

    const action = {
      type: ordersQueryThunk.fulfilled.type,
      payload: mockOrders
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('orders history pending test',
    () => {
      const state = { ...initialState, loading: true };

      const newState = userSlice.reducer(state, {
        type: ordersQueryThunk.pending.type,
        payload: null
      });

      expect(state.loading).toEqual(newState.loading);
      expect(state).toEqual(newState);
    });

  test('orders history rejection test', () => {
    const state = { ...initialState, error: 'ordersQueryThunk error' };

    const action = {
      type: ordersQueryThunk.rejected.type,
      error: new Error('ordersQueryThunk error')
    };

    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  test('logout test', () => {
    const newState = userSlice.reducer(initialState, {
      type: logoutQueryThunk.fulfilled.type
    });

    expect(newState.error).toBe(null);
    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual([]);
    expect(newState.userData.email).toBe('');
    expect(newState.userData.name).toBe('');
  });
});
