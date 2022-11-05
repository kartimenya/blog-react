import { IAuthResponse, ILogin, IRegist, IUser } from '../../models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params: ILogin) => {
  const { data } = await axios.post<IAuthResponse>('/auth/login', params);

  return data;
});

export const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async (params: IRegist) => {
    const { data } = await axios.post<IAuthResponse>('/auth/registration', params);

    return data;
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get<IUser>('/auth/me');

  console.log(data, 'data');

  return data;
});

interface AuthState {
  data: IAuthResponse | null;
  statuse: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  data: null,
  statuse: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.data = null;
      state.statuse = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.statuse = 'pending';
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
      state.statuse = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchRegistration.rejected, (state) => {
      state.statuse = 'failed';
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.statuse = 'pending';
    });
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
      state.statuse = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.statuse = 'failed';
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.statuse = 'pending';
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.data = { token: '', user: action.payload };
      state.statuse = 'succeeded';
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.statuse = 'failed';
    });
  },
});

export default authSlice.reducer;

export const { logOut } = authSlice.actions;
