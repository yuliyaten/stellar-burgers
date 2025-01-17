import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  loading: boolean;
  error: string | null;
  userData: TUser;
  orders: TOrder[];
};

export const initialState: TUserState = {
  loading: false,
  error: null,
  userData: {
    name: '',
    email: ''
  },
  orders: []
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  selectors: {
    userNameSelector: (state) => state.userData,
    userOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message as string;
      })
      .addCase(registerUserQueryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      .addCase(loginUserQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUserQueryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      .addCase(getUserQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUserQueryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      .addCase(updateUserQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUserQueryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
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
        state.orders = action.payload;
      })
      .addCase(logoutQueryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutQueryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutQueryThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.userData.email = '';
        state.userData.name = '';
        state.orders = [];
      });
  }
});

export const ordersQueryThunk = createAsyncThunk('user/orders', getOrdersApi);

export const registerUserQueryThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const dataResponce = await registerUserApi(data);
    if (!dataResponce.success) {
      return Promise.reject(dataResponce);
    }
    setCookie('accessToken', dataResponce.accessToken);
    localStorage.setItem('refreshToken', dataResponce.refreshToken);
    return dataResponce;
  }
);

export const loginUserQueryThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const dataResponce = await loginUserApi(data);
    if (!dataResponce.success) {
      return Promise.reject(dataResponce);
    }
    setCookie('accessToken', dataResponce.accessToken);
    localStorage.setItem('refreshToken', dataResponce.refreshToken);
    return dataResponce;
  }
);

export const logoutQueryThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const forgotPasswordQueryThunk = createAsyncThunk(
  'user/fogotPass',
  forgotPasswordApi
);

export const resetPasswordQueryThunk = createAsyncThunk(
  'user/resetPass',
  resetPasswordApi
);

export const getUserQueryThunk = createAsyncThunk('user/getUser', getUserApi);

export const updateUserQueryThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const { userNameSelector, userOrdersSelector } = userSlice.selectors;
