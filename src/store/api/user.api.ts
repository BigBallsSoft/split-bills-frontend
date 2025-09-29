import { baseApi } from './base-api';
import type { AuthResponse, User, UserLoginData, UserPatchData } from '@/typings/user';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, UserLoginData>({
      query: (userInfo: UserLoginData) => ({
        body: userInfo,
        url: '/users',
        method: 'POST',
      }),
    }),
    me: builder.query<User, void>({
      query: () => '/users/me',
    }),
    patchMe: builder.mutation<User, UserPatchData>({
      query: (userInfo: UserPatchData) => ({
        body: userInfo,
        url: '/users/me',
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery, usePatchMeMutation } = userApi;
