import axiosInstance from "@/lib/api/axios-instance";
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types";

// Mock API – replace with real endpoints
export const projectsApi = {
  getProjects: async (): Promise<Project[]> => {
    const response = await axiosInstance.get<Project[]>("/projects");
    return response.data;
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await axiosInstance.get<Project>(`/projects/${id}`);
    return response.data;
  },

  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await axiosInstance.post<Project>("/projects", data);
    return response.data;
  },

  updateProject: async (
    id: string,
    data: UpdateProjectRequest,
  ): Promise<Project> => {
    const response = await axiosInstance.patch<Project>(
      `/projects/${id}`,
      data,
    );
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${id}`);
  },
};
