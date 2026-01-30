import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "../../statistics/api/statisticApi";

export default function useGetUserAllExerciseName({ userId }) {
  return useQuery({
    queryKey: ["user-all-exercise-name", userId],
    queryFn: () => statisticApi.getUserAllExerciseName(userId),
    enabled: !!userId,
    staleTime: 20 * 60 * 1000,
  });
}
