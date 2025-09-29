import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './slices/user.slice';
import { reducer as toastReducer } from './slices/toast.slice';
import { baseApi } from './api/base-api';

const reducers = combineReducers({
  user: userReducer,
  toast: toastReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootStateStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
