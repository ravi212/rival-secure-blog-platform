export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  BLOG: {
    LIST: "/blogs",
    DETAIL: (id: string) => `/blogs/${id}`,
    CREATE: "/blogs",
    UPDATE: (id: string) => `/blogs/${id}`,
    DELETE: (id: string) => `/blogs/${id}`,
  },

  COMMENT: {
    LIST: (blogId: string) => `/comments/blog/${blogId}`,
    CREATE: "/comments",
    DELETE: (id: string) => `/comments/${id}`,
  },

  LIKE: {
    TOGGLE: (blogId: string) => `/likes/${blogId}`,
  },

  USER: {
    PROFILE: "/users/me",
  },
} as const;

export type Endpoints = typeof ENDPOINTS;
