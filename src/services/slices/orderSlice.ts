import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrderModalData } from '@utils-types';
import {
  TOrderResponse,
  TNewOrderResponse,
  getOrderByNumberApi,
  orderBurgerApi
} from '@api';
import { resetConstructor } from '@slices';

type TOrderState = {
  orderInfo: TOrder | null;
  orderModalData: TOrderModalData | null;
  orderRequest: boolean;
  isFeedsLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderInfo: null,
  orderModalData: null,
  orderRequest: false,
  isFeedsLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    isFeedsLoading: (state) => state.isFeedsLoading,
    orderInfoSelector: (state) => state.orderInfo
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(
        orderBurgerThunk.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderModalData = action.payload;
          state.orderRequest = false;
        }
      )
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.orderRequest = false;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        getOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.orderInfo = action.payload.orders[0];
        }
      )
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  }
});
export const orderReducer = orderSlice.reducer;

export const { resetOrderModalData } = orderSlice.actions;
export const {
  orderModalDataSelector,
  orderRequestSelector,
  orderInfoSelector,
  isFeedsLoading
} = orderSlice.selectors;

export const orderBurgerThunk = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/orderBurger',
  async (order, thunkAPI) => {
    try {
      const data = await orderBurgerApi(order);
      thunkAPI.dispatch(resetConstructor());
      return data;
    } catch {
      return Promise.reject();
    }
  }
);

export const getOrderByNumberThunk = createAsyncThunk<TOrderResponse, number>(
  'order/getOrderByNumber',
  async (number) => await getOrderByNumberApi(number)
);
