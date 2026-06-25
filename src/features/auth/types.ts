export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
