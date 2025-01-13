import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  ingredients: TIngredient[];
  error: string | null;
};
const initialState: TIngredientState = {
  ingredients: [],
  error: null
};

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    starterBunSelector: (state) =>
      state.ingredients.find((ingr) => ingr.type === 'bun') ?? null,
    ingredientsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        getIngredientsThunk.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
        }
      )
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
      });
  }
});

export const ingredientReducer = ingredientSlice.reducer;

export const { ingredientsSelector, starterBunSelector } =
  ingredientSlice.selectors;

export const getIngredientsThunk = createAsyncThunk<TIngredient[]>(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);
