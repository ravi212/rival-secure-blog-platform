import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/lib/api";

export interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
  userId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface CreateBlogPayload {
  title: string;
  content: string;
  isPublished: boolean;
}

export interface PaginatedBlogs {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const blogService = {
  getAll: () => apiClient.get<Blog[]>(ENDPOINTS.BLOG.LIST),

  getById: (id: string) => apiClient.get<Blog>(ENDPOINTS.BLOG.DETAIL(id)),

  create: (data: CreateBlogPayload) =>
    apiClient.post<Blog>(ENDPOINTS.BLOG.CREATE, data),

  update: (id: string, data: CreateBlogPayload) =>
    apiClient.patch<Blog>(ENDPOINTS.BLOG.UPDATE(id), data),

  delete: (id: string) => apiClient.delete<void>(ENDPOINTS.BLOG.DELETE(id)),
  getMyBlogs: (page = 1, limit = 10) =>
    apiClient.get<PaginatedBlogs>(
      `${ENDPOINTS.BLOG.MY}?page=${page}&limit=${limit}`,
    ),

  getBySlug: (slug: string) =>
    apiClient.get<Blog>(ENDPOINTS.PUBLIC.BLOG_BY_SLUG(slug)),
};
