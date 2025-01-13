import { TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

type TfeedsState = {
  feeds: TOrdersData;
  error: string | null;
  isFeedsLoading: boolean;
};

const initialState: TfeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null,
  isFeedsLoading: false
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state.feeds,
    ordersSelector: (state) => state.feeds.orders,
    totalSelector: (state) => state.feeds.total,
    totalTodaySelector: (state) => state.feeds.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.error = null;
        state.isFeedsLoading = true;
      })
      .addCase(
        getFeedsThunk.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isFeedsLoading = false;
          state.feeds = action.payload;
        }
      )
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isFeedsLoading = false;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
export const {
  feedsSelector,
  ordersSelector,
  totalSelector,
  totalTodaySelector
} = feedsSlice.selectors;

export const getFeedsThunk = createAsyncThunk<TOrdersData>(
  'orders, getFeeds',
  async () => await getFeedsApi()
);
