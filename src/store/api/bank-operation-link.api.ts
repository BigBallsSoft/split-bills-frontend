import type { BankOperationLink } from '@/typings/bank-operation-link';
import { baseApi } from './base-api';

export const bankOperationLinkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBankOperationLinks: builder.query<BankOperationLink[], void>({
      query: () => '/bank-operation-links',
    }),
  }),
});

export const { useGetBankOperationLinksQuery } = bankOperationLinkApi;
