import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngr: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredientsObject: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredientsObject } };
      }
    },
    removeIngr: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(index, 1);
    },
    moveUpIngr: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = temp;
    },
    moveDownIngr: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const temp = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = temp;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerConstructorSelector: (state: TBurgerConstructorState) => state,
    bunSelector: (state) => state.bun,
    constructorIngredientsSelector: (state) => state.ingredients,
    ingredientsArrSelector: (state) => {
      if (!state.bun) return [];
      const arr: string[] = [];
      state.ingredients.forEach((ingr) => {
        arr.push(ingr._id);
      });
      return [...arr, state.bun?._id, state.bun?._id];
    }
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  addIngr,
  removeIngr,
  moveUpIngr,
  moveDownIngr,
  resetConstructor
} = burgerConstructorSlice.actions;
export const {
  burgerConstructorSelector,
  bunSelector,
  constructorIngredientsSelector,
  ingredientsArrSelector
} = burgerConstructorSlice.selectors;
