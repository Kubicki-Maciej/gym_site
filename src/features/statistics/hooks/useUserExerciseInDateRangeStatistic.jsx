import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "../api/statisticApi";

export default function useUserExerciseInDateRangeStatistic({
  exerciseId,
  userId,
  startDate,
  endDate,
  enabled = true,
}) {
  const shouldFetch =
    enabled && !!exerciseId && !!userId && !!startDate && !!endDate;
  console.log("userId w hooku", userId);
  console.log("=== HOOK DEBUG ===");
  console.log("exerciseId:", exerciseId);
  console.log("userId:", userId);
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);
  console.log("enabled (przekazane):", enabled);
  console.log("shouldFetch (finalne):", shouldFetch);
  console.log("==================");

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
        endDate,
      ),
    enabled: !!exerciseId && !!userId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
  });
}
