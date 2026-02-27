export const QUERY_KEYS = {
  blogs: {
    all: ['blogs'] as const,
    detail: (id: string) => ['blogs', id] as const,
  },
  comments: {
    byBlog: (blogId: string) =>
      ['comments', blogId] as const,
  },
};