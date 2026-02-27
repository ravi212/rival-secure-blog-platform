import { ENDPOINTS } from "@/constants/endpoints";
import { apiClient } from "@/lib/api";

export interface LikeResponse {
  liked: boolean;
  likesCount: number;
}

export const likeService = {
  toggle: (blogId: string) =>
    apiClient.post<LikeResponse>(
      ENDPOINTS.LIKE.TOGGLE(blogId)
    ),
};