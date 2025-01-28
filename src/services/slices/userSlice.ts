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
  TFeedsResponse,
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

export const ordersQueryThunk = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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

// export const getUserQueryThunk = createAsyncThunk('user/getUser', async () => {
//   // check if accessToken is valid

//   // if no, send refreshToken to update accessToken

//   // do the code

//   console.log('sss');
//   const dataResponce = await getUserApi();
//   console.log('ss', dataResponce);
//   if (!dataResponce.success) {
//     return Promise.reject(dataResponce);
//   }
//   // setCookie('accessToken', dataResponce.accessToken);
//   // localStorage.setItem('refreshToken', dataResponce.refreshToken);
//   return dataResponce;
// });

export const getUserQueryThunk = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      // Step 1: Call the existing getUserApi function
      const dataResponse = await getUserApi();

      // Step 2: Validate the response
      if (!dataResponse.success) {
        throw new Error(dataResponse.message || 'Failed to fetch user data');
      }

      // Step 3: Return the user data
      return dataResponse;
    } catch (error) {
      // Step 4: Handle errors and return a meaningful message
      const errorMessage =
        (error as { message: string }).message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserQueryThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const { userNameSelector, userOrdersSelector } = userSlice.selectors;
