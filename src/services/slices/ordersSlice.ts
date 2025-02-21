import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type IOrdersState = {
  orderData: TOrder | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: IOrdersState = {
  orderData: null,
  orders: [],
  loading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const ordersSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  selectors: {
    getOrdersInfoSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordersQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(ordersQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      .addCase(ordersQueryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(orderInfoThunk.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
      });
  }
});

export const ordersQueryThunk = createAsyncThunk('feeds/api', async () => {
  const response = await getFeedsApi();
  // Fetching the data
  if (!response.success) {
    // If the response indicates failure
    return Promise.reject(response);
  }

  return {
    orders: response.orders,
    total: response.total,
    totalToday: response.totalToday
  };
});

export const orderInfoThunk = createAsyncThunk(
  'order/info',
  async (number: number) => await getOrderByNumberApi(number)
);

export const getOrdersInfoSelector = (state: RootState) => state.orderSlice;
