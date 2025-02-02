import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

type IIngridientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: IIngridientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredientsGetAll',
  initialState,
  reducers: {},
  selectors: {
    ingredientSelector: (state) => state.ingredients,
    isLoadingIngredientSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || `[getIngredients] data request error`;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const getIngredientsThunk = createAsyncThunk(
  'getIngredients',
  async () => getIngredientsApi()
);

export const { ingredientSelector, isLoadingIngredientSelector } =
  ingredientSlice.selectors;
