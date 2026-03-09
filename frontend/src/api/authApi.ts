import api from './axiosInstance';
import type { ApiResponse, AuthResponse, ContentData, LoginFormData, RegisterFormData } from '../types';

// Auth
export const registerUser = async (data: Omit<RegisterFormData, 'confirmPassword'>) => {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: LoginFormData) => {
  const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
  return res.data;
};

// Content
export const getPublicContent = async () => {
  const res = await api.get<ApiResponse<ContentData>>('/public');
  return res.data;
};

export const getUserContent = async () => {
  const res = await api.get<ApiResponse<ContentData>>('/user');
  return res.data;
};

export const getAdminContent = async () => {
  const res = await api.get<ApiResponse<ContentData>>('/admin');
  return res.data;
};
