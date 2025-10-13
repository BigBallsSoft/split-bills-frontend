import type { Split } from '@/typings/splits';
import { baseApi } from './base-api';
import type { Debtor, PatchDebtorData } from '@/typings/debtors';

export const debtsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDebts: builder.query<Split[], void>({
      query: () => '/debts/me',
      providesTags: ['Debts'],
    }),
    patchDebtor: builder.mutation<Debtor, { debtorId: number; patchData?: PatchDebtorData }>({
      query: ({ debtorId, patchData }) => ({
        url: `/debts/${debtorId}`,
        method: 'PATCH',
        body: patchData,
      }),
      invalidatesTags: ['Debts'],
    }),
    confirmDebtor: builder.mutation<Debtor, number>({
      query: (debtorId: number) => ({
        url: `/debts/${debtorId}/confirm-payment`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetMyDebtsQuery, usePatchDebtorMutation, useConfirmDebtorMutation } = debtsApi;
