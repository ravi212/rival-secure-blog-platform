import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Blog, blogService, CreateBlogPayload } from "@/services/blog.service";
import { QUERY_KEYS } from "@/constants/query-keys";

// QUERIES        

export const useBlogs = () => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.all,
    queryFn: blogService.getAll,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.detail(id),
    queryFn: () => blogService.getById(id),
    enabled: !!id,
  });
};

export const useMyBlogs = (page: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.myBlogs(page),
    queryFn: () => blogService.getMyBlogs(page, 10),
    // keepPreviousData: true,
  });
};

//  MUTATIONS        

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogPayload) =>
      blogService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.blogs.all, QUERY_KEYS.blogs.myBlogs],
      });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateBlogPayload;
    }) => blogService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.blogs.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.blogs.all, QUERY_KEYS.blogs.myBlogs],
      });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      blogService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.blogs.all, QUERY_KEYS.blogs.myBlogs],
      });
    },
  });
};

export const useBlogBySlug = (slug: string | undefined) => {
  return useQuery<Blog, Error>({
    queryKey: ["blog", slug],
    queryFn: () => {
      if (!slug) throw new Error("Slug is required");
      return blogService.getBySlug(slug);
    },
    enabled: !!slug,
  });
};