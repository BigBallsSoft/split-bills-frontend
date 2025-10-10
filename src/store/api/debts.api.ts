import type { Split } from '@/typings/splits';
import { baseApi } from './base-api';

export const debtsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDebts: builder.query<Split[], void>({
      query: () => '/debts/me',
    }),
  }),
});

export const { useGetMyDebtsQuery } = debtsApi;
