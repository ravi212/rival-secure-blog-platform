import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  login: (data: LoginPayload) =>
    apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.LOGIN,
      data,
      { auth: false }
    ),

  register: (data: RegisterPayload) =>
    apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.REGISTER,
      data,
      { auth: false }
    ),
};