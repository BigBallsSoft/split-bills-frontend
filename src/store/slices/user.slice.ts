import { localStorageConfig } from '@/typings/local-storage';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface userState {
  token?: string;
}

const initialState: userState = {
  token: localStorage.getItem(localStorageConfig.ACCESS_TOKEN) || undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(localStorageConfig.ACCESS_TOKEN);
      state.token = undefined;
      window.location.reload();
    },
    login: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
      localStorage.setItem(localStorageConfig.ACCESS_TOKEN, token);
    },
  },
});

export const { actions, reducer } = userSlice;
