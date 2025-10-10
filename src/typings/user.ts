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
  cardNumber?: number;
  bankOperationLinkId?: number;
  notifyMessage?: string;
}

export type PublicUser = Pick<User, 'id' | 'avatar' | 'username' | 'name' | 'telegramId'>;

export type UserLoginData = Pick<User, 'avatar' | 'username' | 'name' | 'telegramId'>;

export type UserPatchData = Pick<
  User,
  'cardErip' | 'cardNumber' | 'bankOperationLinkId' | 'notifyMessage'
>;
