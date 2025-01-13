import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrdersState = {
  orders: TOrder[];
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  error: null
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    userOrderSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(
        getUserOrdersThunk.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.error = null;
          if (action.payload) {
            state.orders = action.payload;
          }
        }
      )
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
  }
});

export const userOrdersReducer = userOrdersSlice.reducer;
export const { userOrderSelector } = userOrdersSlice.selectors;
export const getUserOrdersThunk = createAsyncThunk<TOrder[]>(
  'userOrders/getUserOrders',
  async () => await getOrdersApi()
);
