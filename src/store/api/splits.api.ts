import type { AddSplitData, Split } from '@/typings/splits';
import { baseApi } from './base-api';

export const splitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSplit: builder.mutation<Split, AddSplitData>({
      query: (splitInfo: AddSplitData) => ({
        body: splitInfo,
        url: '/splits',
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateSplitMutation } = splitsApi;
