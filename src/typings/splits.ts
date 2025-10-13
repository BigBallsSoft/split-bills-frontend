import type { AddDebtorData, Debtor } from './debtors';
import type { CreatorUser, PublicUser } from './user';

export interface AddSplitData {
  name: string;
  description: string;
  debtors: AddDebtorData[];
}

export interface Split extends Omit<AddSplitData, 'debtors' | 'description'> {
  id: number;
  creationDate: string;
  debtors: Debtor[];
  creatorId: number;
  creator?: PublicUser;
  description?: string;
}

export interface SplitExtended extends Omit<Split, 'creator'> {
  creator: CreatorUser;
}
