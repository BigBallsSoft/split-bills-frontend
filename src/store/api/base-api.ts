import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type { AuthResponse } from '@/typings/user';
import { userSlice } from '../slices/user.slice';
import { config } from '@/helpers/config';
import { localStorageConfig } from '@/typings/local-storage';

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (localStorage.getItem(localStorageConfig.ACCESS_TOKEN))
      headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem(localStorageConfig.ACCESS_TOKEN)}`
      );
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);

    if (refreshResult.data) {
      localStorage.setItem(
        localStorageConfig.ACCESS_TOKEN,
        (refreshResult.data as AuthResponse).accessToken
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userSlice.actions.logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
});
