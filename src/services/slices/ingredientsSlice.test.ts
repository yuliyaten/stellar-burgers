import '@testing-library/jest-dom';
import {
  getIngredientsThunk,
  ingredientSelector,
  isLoadingIngredientSelector,
  ingredientSlice,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice test', () => {
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
    }
  ];

  test('pending test', () => {
    const state = { ...initialState, loading: true };
    const newState = ingredientSlice.reducer(state, {
      type: getIngredientsThunk.pending.type
    });
    expect(state).toEqual(newState);
    expect(newState.loading).toBeTruthy();
  });

  test('rejection test', () => {
    const state = { ...initialState, error: 'getIngredientsThunk error' };
    const newState = ingredientSlice.reducer(
      state,
      getIngredientsThunk.rejected(
        new Error('getIngredientsThunk error'),
        'unknown'
      )
    );

    expect(state).toEqual(newState);
  });

  test('fulfilled test', () => {
    const state = { ...initialState, ingredients: mockIngredients };
    const newState = ingredientSlice.reducer(
      state,
      getIngredientsThunk.fulfilled(mockIngredients, 'fulfilled')
    );

    expect(state).toEqual(newState);
  });
});
