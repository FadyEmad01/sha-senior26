export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: Project["status"];
}
