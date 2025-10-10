import type { User } from './user';

export interface AddDebtorData {
  name: string;
  amount: number;
}

export interface Debtor extends AddDebtorData {
  id: number;
  userId?: number;
  user?: User;
  payDate?: Date;
}
