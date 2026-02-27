import { QUERY_KEYS } from '@/constants/query-keys';
import { blogService } from '@/services/blog.service';
import { useQuery } from '@tanstack/react-query';

export function useFeed() {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.all,
    queryFn: blogService.getAll,
    staleTime: 1000 * 60, // 1 min
  });
}