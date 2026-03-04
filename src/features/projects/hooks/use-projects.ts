"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { projectsApi } from "../api/projects-api";
import type { CreateProjectRequest, UpdateProjectRequest } from "../types";

const PROJECTS_KEY = ["projects"] as const;

export function useProjects() {
  return useQuery({
    queryKey: PROJECTS_KEY,
    queryFn: projectsApi.getProjects,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: [...PROJECTS_KEY, id],
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) =>
      projectsApi.createProject(data),
    onSuccess: () => {
      toast.success("Project created!");
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project");
    },
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectRequest) =>
      projectsApi.updateProject(id, data),
    onSuccess: () => {
      toast.success("Project updated!");
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update project");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectsApi.deleteProject(id),
    onSuccess: () => {
      toast.success("Project deleted!");
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
}
