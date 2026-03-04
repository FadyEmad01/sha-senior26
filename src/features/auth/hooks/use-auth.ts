"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "../api/auth-api";
import type { LoginRequest, RegisterRequest } from "../types";

const AUTH_QUERY_KEY = ["auth", "me"] as const;

export function useAuth() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.accessToken);
      queryClient.setQueryData(AUTH_QUERY_KEY, response.user);
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.accessToken);
      queryClient.setQueryData(AUTH_QUERY_KEY, response.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("access_token");
      queryClient.clear();
      router.push("/login");
      toast.success("Logged out");
    },
  });
}
