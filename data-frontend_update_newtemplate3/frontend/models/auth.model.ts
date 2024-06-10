export interface AccountCredentials {
  username: string;
  password: string;
}

export interface TokenDto {
  token: string;
  refreshToken: string;
  userInfo?: UserDto
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  roleId?: string
  phoneNumber?: string
  updatedAt?: string
}

export interface UserSecretTokenDto {
  id: string;
  token: string;
}
