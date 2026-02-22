import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "features/statistics/api/statisticApi";

export default function useMuscleUsageInSeries(userId, week, warmUp) {
  return useQuery({
    queryKey: ["user-muscle-usage-series", userId, week, warmUp],
    queryFn: () => statisticApi.getUserMuscleUsageWeek(userId, week, warmUp),
    enabled: !!userId && !!week,
    staleTime: 5 * 60 * 1000,
  });
}
