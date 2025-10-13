import { localStorageConfig } from '@/typings/local-storage';
import { LanguageKeys } from '@/typings/settings';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface userState {
  token?: string;
  language: LanguageKeys;
}

const initialState: userState = {
  token: localStorage.getItem(localStorageConfig.ACCESS_TOKEN) || undefined,
  language: (localStorage.getItem(localStorageConfig.LANGUAGE) as LanguageKeys) || LanguageKeys.RU,
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
    setLanguage: (state, { payload: { language } }: PayloadAction<{ language: LanguageKeys }>) => {
      state.language = language;
      localStorage.setItem(localStorageConfig.LANGUAGE, language);
    },
  },
});

export const { actions, reducer } = userSlice;
