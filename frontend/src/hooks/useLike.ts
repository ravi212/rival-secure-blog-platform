import { QUERY_KEYS } from '@/constants/query-keys';
import { likeService } from '@/services/like.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: string) =>
      likeService.toggle(blogId),

    onMutate: async (blogId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.blogs.all,
      });

      const previous =
        queryClient.getQueryData<any[]>(
          QUERY_KEYS.blogs.all
        );

      queryClient.setQueryData(
        QUERY_KEYS.blogs.all,
        (old: any[] | undefined) =>
          old?.map((blog) =>
            blog.id === blogId
              ? { ...blog, likes: blog.likes + 1 }
              : blog
          )
      );

      return { previous };
    },

    onError: (_err, _blogId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.blogs.all,
          context.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.blogs.all,
      });
    },
  });
}