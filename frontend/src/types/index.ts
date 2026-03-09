export type Role = 'USER' | 'ADMIN';

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: Role;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface ContentData {
  message: string;
  access: string;
  secret?: string;
}
