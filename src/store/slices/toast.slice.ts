import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

export interface toastState {
  toastMessage: ReactNode;
  isToastOpen: boolean;
  duration: number;
}

const DefaultDuration = 3000;

const initialState: toastState = {
  toastMessage: '',
  isToastOpen: false,
  duration: DefaultDuration,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      {
        payload: { message, duration = DefaultDuration },
      }: PayloadAction<{ message: ReactNode; duration?: number }>
    ) => {
      state.isToastOpen = true;
      state.toastMessage = message;
      state.duration = duration;
    },
    hideToast: (state) => {
      state.isToastOpen = false;
      state.toastMessage = '';
    },
  },
});

export const { actions, reducer } = toastSlice;
