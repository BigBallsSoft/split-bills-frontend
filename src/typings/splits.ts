import type { AddDebtorData, Debtor } from './debtors';
import type { PublicUser } from './user';

export interface AddSplitData {
  name: string;
  description: string;
  debtors: AddDebtorData[];
}

export interface Split extends Omit<AddSplitData, 'debtors'> {
  id: number;
  creationDate: string;
  debtors: Debtor[];
  creatorId: number;
  creator?: PublicUser;
}
