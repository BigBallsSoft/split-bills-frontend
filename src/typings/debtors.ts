export interface AddDebtorData {
  name: string;
  amount: number;
}

export interface Debtor extends AddDebtorData {
  id: number;
  userId?: number;
  payDate?: Date;
}
