import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "../api/statisticApi";

export default function useUserExerciseInDateRangeStatistic({
  exerciseId,
  userId,
  startDate,
  endDate,
}) {
  return useQuery({
    queryKey: [
      "user-statistics-exercise-in-date-range",
      exerciseId,
      userId,
      startDate,
      endDate,
    ],
    queryFn: () =>
      statisticApi.getUserExerciseInDateRangeStatistic(
        exerciseId,
        userId,
        startDate,
        endDate
      ),
    enabled: !!exerciseId && !!userId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
  });
}
