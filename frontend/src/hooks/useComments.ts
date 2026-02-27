import { useQuery } from '@tanstack/react-query';
import { commentService } from '@/services/comment.service';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useComments(blogId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.comments.byBlog(blogId),
    queryFn: () => commentService.getByBlog(blogId),
    enabled: !!blogId,
  });
}