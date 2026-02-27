import { QUERY_KEYS } from '@/constants/query-keys';
import { commentService } from '@/services/comment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateComment(blogId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.byBlog(blogId),
      });
    },
  });
}