import { apiClient } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
export interface FeedBlog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: string;
  author: {
    id: string;
    email: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
}

export interface PaginatedFeed {
  data: FeedBlog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const feedService = {
  getFeed: (page = 1, limit = 10) =>
    apiClient.get<PaginatedFeed>(
      `${ENDPOINTS.PUBLIC.FEED}?page=${page}&limit=${limit}`
    ),
};