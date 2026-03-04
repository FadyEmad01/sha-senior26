import axiosInstance from "@/lib/api/axios-instance";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthUser,
} from "../types";

// Mock API 
export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      data,
    );
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosInstance.post<RegisterResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  getMe: async (): Promise<AuthUser> => {
    const response = await axiosInstance.get<AuthUser>("/auth/me");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
  },
};
