import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosJwt from '../axios/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export interface Credentials {
  email: string;
  password: string;
  confirm_password?: string;
  username?: string;
}

interface LoginResponse {
  accessToken: string;
}

// Async thunk to login
export const loginThunk = createAsyncThunk<LoginResponse, Credentials>(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const url = '/login';
      const res = await AxiosJwt.post(url, credentials);
      const accessToken = res.data.accessToken;
      await AsyncStorage.setItem('accessToken', accessToken);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to register
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const url = '/register';
      const res = await AxiosJwt.post(url, credentials);
      return res.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

interface IMe {
  id: number;
  username: string;
  email: string;
}

interface IinitialState {
  token: string;
  loggedIn: boolean;
  loading: boolean; // Add loading indicator to state
  error: any; // Add error handling
  me: IMe | null;
}

const initialState: IinitialState = {
  token: '',
  loggedIn: false,
  loading: false,
  error: null,
  me: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    LogOut: (state) => {
      state.token = '';
      state.loggedIn = false;
      AsyncStorage.removeItem('accessToken'); // Clear token from AsyncStorage on logout
    },
    ResetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // auth login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.accessToken;
      // Decode the JWT token to extract user information
      // const decodedToken = jwt.decode(action.payload.accessToken) as {
      //   [key: string]: any;
      // } | null;

      // if (decodedToken) {
      //   // Assuming the decoded token has user information stored in a property called 'user'
      //   state.me = decodedToken.user;
      //   state.loggedIn = true;
      // } else {
      //   // Handle error if decoding fails
      //   // For example, setting state.loggedIn to false or showing an error message
      //   state.loggedIn = false;
      // }
      // state.me = decodedToken;
      state.loggedIn = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      console.log('🚀 ~ builder.addCase ~ state.error:', state.error);
    });

    // auth register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.loggedIn = true;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { LogOut, ResetError } = authSlice.actions;

export default authSlice.reducer;
