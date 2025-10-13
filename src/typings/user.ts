import type { BankOperationLink } from './bank-operation-link';

export interface AuthResponse {
  accessToken: string;
}

export interface User {
  id: number;
  avatar?: string;
  username?: string;
  name: string;
  telegramId: number;
  cardErip?: string;
  cardNumber?: string;
  bankOperationLinkId?: number;
  bankOperationLink?: BankOperationLink;
  notifyMessage?: string;
}

export type PublicUser = Pick<User, 'id' | 'avatar' | 'username' | 'name' | 'telegramId'>;

export type CreatorUser = Omit<User, 'notifyMessage'>;

export type UserLoginData = Pick<User, 'avatar' | 'username' | 'name' | 'telegramId'>;

export type UserPatchData = Pick<
  User,
  'cardErip' | 'cardNumber' | 'bankOperationLinkId' | 'notifyMessage'
>;
