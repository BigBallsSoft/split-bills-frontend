import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface toastState {
  toastMessage: string;
  isToastOpen: boolean;
}

const initialState: toastState = {
  toastMessage: '',
  isToastOpen: false,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, { payload: { message } }: PayloadAction<{ message: string }>) => {
      state.isToastOpen = true;
      state.toastMessage = message;
    },
    hideToast: (state) => {
      state.isToastOpen = false;
      state.toastMessage = '';
    },
  },
});

export const { actions, reducer } = toastSlice;
