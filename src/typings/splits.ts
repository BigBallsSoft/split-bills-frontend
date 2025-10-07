import type { AddDebtorData, Debtor } from './debtors';

export interface AddSplitData {
  name: string;
  description: string;
  debtors: AddDebtorData[];
}

export interface Split extends Omit<AddSplitData, 'debtors'> {
  id: number;
  creationDate?: Date;
  debtors: Debtor[];
}
