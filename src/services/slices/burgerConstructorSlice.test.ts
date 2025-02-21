import '@testing-library/jest-dom';
import {
  addIngr,
  removeIngr,
  moveUpIngr,
  moveDownIngr,
  constructorSlice,
  burgerQueryThunk,
  resetOrder
} from '../slices/burgerConstructorSlice';
import { initialState } from '../slices/burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TNewOrderResponse } from '@api';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('[constructorSlice] - test', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  const mocConstructorIngredients: TConstructorIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '111'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '222'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      id: '333'
    }
  ];

  const mockOrderBurgerData: TNewOrderResponse = {
    success: true,
    order: {
      ingredients: ['bun', 'main', 'bun'],
      _id: '66e45dba119d45001b506b9f',
      status: 'done',
      createdAt: '2024-09-13T15:43:54.410Z',
      updatedAt: '2024-09-13T15:43:55.227Z',
      number: 52934,
      name: 'Краторный био-марсианский бургер'
    },
    name: 'Краторный  бургер'
  };

  test('addIngr test', () => {
    const state = {
      ...initialState
    };

    const actionAddItem = {
      type: addIngr.type,
      payload: {
        ...mockIngredients[0],
        id: '111'
      }
    };

    const reduser = constructorSlice.reducer(state, actionAddItem);
    const { constructorItems } = reduser;

    expect(reduser).toEqual({
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: []
      }
    });
    expect(constructorItems.bun).toEqual(mocConstructorIngredients[0]);
  });

  test('addIngr main test', () => {
    const state = {
      ...initialState
    };

    const actionAddItem = {
      type: addIngr.type,
      payload: {
        ...mockIngredients[1],
        id: '222'
      }
    };

    const reducer = constructorSlice.reducer(state, actionAddItem);
    const { constructorItems } = reducer;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(1);
  });

  test('addIngr sauce test', () => {
    const state = {
      ...initialState
    };

    const actionAddItem = {
      type: addIngr.type,
      payload: {
        ...mockIngredients[2],
        id: '333'
      }
    };

    const reducer = constructorSlice.reducer(state, actionAddItem);
    const { constructorItems } = reducer;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[2]
    ]);
    expect(constructorItems.ingredients).toHaveLength(1);
  });

  test('removeIngr test', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const action = { type: removeIngr.type, payload: '333' };
    const reduser = constructorSlice.reducer(state, action);
    const { constructorItems } = reduser;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(1);
  });

  test('moveUpIngr test', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const action = { type: moveUpIngr.type, payload: 1 };
    const reduser = constructorSlice.reducer(state, action);
    const { constructorItems } = reduser;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[2],
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(2);
  });

  test('moveDownIngr test', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const action = { type: moveDownIngr.type, payload: 0 };
    const reduser = constructorSlice.reducer(state, action);
    const { constructorItems } = reduser;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[2],
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(2);
  });

  test('burgerQueryThunk test', () => {
    const state = initialState;

    const action = {
      type: burgerQueryThunk.pending.type,
      payload: { orderRequest: true }
    };
    const reduser = constructorSlice.reducer(state, action);
    const { orderRequest, orderModalData } = reduser;

    expect(orderRequest).toBeTruthy();
    expect(orderModalData).toBeNull();
  });

  test('burgerQueryThunk rejection test', async () => {
    const state = {
      ...initialState,
      error: 'Error'
    };

    const newState = constructorSlice.reducer(
      initialState,
      burgerQueryThunk.rejected(new Error('Error'), 'unknown', [])
    );

    expect(state.error).toEqual(newState.error);
  });

  test('burgerQueryThunk fulfilling test', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const newState = constructorSlice.reducer(
      state,
      burgerQueryThunk.fulfilled(mockOrderBurgerData, 'unknown', [])
    );
    const { orderModalData, orderRequest, constructorItems } = newState;

    expect(orderModalData).toEqual(mockOrderBurgerData.order);
    expect(orderRequest).toBe(false);
    expect(constructorItems).toEqual(initialState.constructorItems);
  });

  test('order reset test', () => {
    const state = {
      ...initialState,
      orderModalData: mockOrderBurgerData.order,
      orderRequest: true
    };

    const newState = constructorSlice.reducer(state, resetOrder());
    const { orderModalData, orderRequest } = newState;

    expect(orderModalData).toBeNull();
    expect(orderRequest).toBe(false);
  });
});
