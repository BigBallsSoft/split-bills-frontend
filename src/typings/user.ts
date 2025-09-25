export interface UserLoginData {
  avatar?: string;
  username?: string;
  name: string;
  telegramId: number;
}

export interface AuthResponse {
  accessToken: string;
}
