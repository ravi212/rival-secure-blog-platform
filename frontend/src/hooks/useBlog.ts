import { QUERY_KEYS } from '@/constants/query-keys';
import { blogService } from '@/services/blog.service';
import { useQuery } from '@tanstack/react-query';

export function useBlog(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.detail(id),
    queryFn: () => blogService.getById(id),
    enabled: !!id,
  });
}