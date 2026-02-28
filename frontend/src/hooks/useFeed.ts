import { useQuery } from "@tanstack/react-query";
import { feedService } from "@/services/feed.service";

export const useFeed = (page: number) => {
  return useQuery({
    queryKey: ["feed", page],
    queryFn: () => feedService.getFeed(page, 10),
    // keepPreviousData: true,
  });
};