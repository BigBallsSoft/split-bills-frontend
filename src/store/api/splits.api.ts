import type { AddSplitData, Split, SplitExtended } from '@/typings/splits';
import { baseApi } from './base-api';

export const splitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSplit: builder.mutation<Split, AddSplitData>({
      query: (splitInfo: AddSplitData) => ({
        body: splitInfo,
        url: '/splits',
        method: 'POST',
      }),
      invalidatesTags: ['Splits'],
    }),
    getMySplits: builder.query<Split[], void>({
      query: () => '/splits/me',
      providesTags: ['Splits'],
    }),
    getSplitById: builder.query<SplitExtended, string>({
      query: (id: string) => `/splits/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Split', id }],
    }),
    deleteSplit: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/splits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Splits'],
    }),
    notifyDebtors: builder.mutation<{ message: string }, string>({
      query: (id: string) => ({
        url: `/splits/${id}/notify`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateSplitMutation,
  useGetMySplitsQuery,
  useGetSplitByIdQuery,
  useDeleteSplitMutation,
  useNotifyDebtorsMutation,
} = splitsApi;
