import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/lib/api";

export interface Comment {
  id: string;
  blogId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface CreateCommentPayload {
  blogId: string;
  content: string;
}

export const commentService = {
  getByBlog: (blogId: string) =>
    apiClient.get<Comment[]>(
      ENDPOINTS.COMMENT.LIST(blogId)
    ),

  create: (data: CreateCommentPayload) =>
    apiClient.post<Comment>(
      ENDPOINTS.COMMENT.CREATE,
      data
    ),

  delete: (id: string) =>
    apiClient.delete<void>(
      ENDPOINTS.COMMENT.DELETE(id)
    ),
};