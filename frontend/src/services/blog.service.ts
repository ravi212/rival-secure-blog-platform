import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/lib/api";

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  likes: number;
  createdAt: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
}

export const blogService = {
  getAll: () =>
    apiClient.get<Blog[]>(ENDPOINTS.BLOG.LIST),

  getById: (id: string) =>
    apiClient.get<Blog>(ENDPOINTS.BLOG.DETAIL(id)),

  create: (data: CreateBlogPayload) =>
    apiClient.post<Blog>(
      ENDPOINTS.BLOG.CREATE,
      data
    ),

  update: (id: string, data: CreateBlogPayload) =>
    apiClient.put<Blog>(
      ENDPOINTS.BLOG.UPDATE(id),
      data
    ),

  delete: (id: string) =>
    apiClient.delete<void>(
      ENDPOINTS.BLOG.DELETE(id)
    ),
};