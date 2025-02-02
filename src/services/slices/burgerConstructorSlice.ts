import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
// import {TNewOrderResponse}

type IConstructorState = {
  orderRequest: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  error: string | null;
};

export const initialState: IConstructorState = {
  orderRequest: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null,
  error: null
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  selectors: {
    constructorSelector: (state) => state.constructorItems,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData
  },
  reducers: {
    addIngr: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngr: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    moveUpIngr: (state, actyon: PayloadAction<number>) => {
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(
        actyon.payload,
        0,
        ...ingredients.splice(actyon.payload - 1, 1)
      );
      state.constructorItems.ingredients = ingredients;
    },

    moveDownIngr: (state, actyon: PayloadAction<number>) => {
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(
        actyon.payload,
        0,
        ...ingredients.splice(actyon.payload + 1, 1)
      );
      state.constructorItems.ingredients = ingredients;
    },

    resetOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(burgerQueryThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })

      .addCase(burgerQueryThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || `error`;
      })

      .addCase(burgerQueryThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      });
  }
});

export const burgerQueryThunk = createAsyncThunk(
  'order/burger',
  orderBurgerApi
);

export const {
  constructorSelector,
  orderRequestSelector,
  orderModalDataSelector
} = constructorSlice.selectors;
export const { addIngr, removeIngr, moveUpIngr, moveDownIngr, resetOrder } =
  constructorSlice.actions;
