import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "../api/statisticApi";

export function useUserStatistics({ userId, year, month }) {
  return useQuery({
    queryKey: ["user-statistics", userId, year, month],
    queryFn: () => statisticApi.getUserStatistic(userId, year, month),
    enabled: !!userId && !!year && !!month,
    staleTime: 5 * 60 * 1000,
  });
}
