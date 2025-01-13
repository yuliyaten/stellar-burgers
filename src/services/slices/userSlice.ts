import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TIdentificationResponse = {
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    userDataSelector: (state) => state.user,
    userNameSelector: (state) => state.user?.name,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserThunk.pending ||
          loginUserThunk.pending ||
          logoutUserThunk.pending ||
          updateUserApiThunk.pending,
        (state) => {
          state.error = null;
        }
      )
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.user = action.payload.user;
        }
      )
      .addCase(
        updateUserApiThunk.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          state.user = action.payload.user;
        }
      )
      .addCase(
        loginUserThunk.fulfilled || registerUserThunk.fulfilled,
        (state, action: PayloadAction<TIdentificationResponse>) => {
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          setCookie('accessToken', action.payload.accessToken);
          state.user = action.payload.user;
        }
      )
      .addCase(logoutUserThunk.fulfilled, (state) => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.user = null;
      })
      .addCase(
        getUserThunk.rejected ||
          loginUserThunk.rejected ||
          logoutUserThunk.rejected ||
          registerUserThunk.rejected ||
          updateUserApiThunk.rejected,
        (state, action) => {
          state.error = action.error.message ?? null;
        }
      );
  }
});

export const userReducer = userSlice.reducer;

export const { authChecked } = userSlice.actions;
export const { userDataSelector, isAuthCheckedSelector, userNameSelector } =
  userSlice.selectors;

export const getUserThunk = createAsyncThunk<{ user: TUser }>(
  'user/getUser',
  async () => await getUserApi()
);

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUserThunk()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const updateUserApiThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async () => await logoutApi()
);
