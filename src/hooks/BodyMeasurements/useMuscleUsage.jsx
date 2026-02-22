import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "features/statistics/api/statisticApi";

export default function useMuscleUsageInSeries(userId, week) {
  return useQuery({
    queryKey: ["user-muscle-usage-series", userId, week],
    queryFn: () => statisticApi.getUserMuscleUsageWeek(userId, week),
    enabled: !!userId && !!week,
    staleTime: 5 * 60 * 1000,
  });
}
