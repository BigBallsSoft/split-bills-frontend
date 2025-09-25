import { baseApi } from './base-api';
import type { AuthResponse, UserLoginData } from '@/typings/user';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, UserLoginData>({
      query: (userInfo: UserLoginData) => ({
        body: userInfo,
        url: `/users/${userInfo.telegramId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
