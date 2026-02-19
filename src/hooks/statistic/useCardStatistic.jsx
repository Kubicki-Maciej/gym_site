import { useQuery } from "@tanstack/react-query";
import { statisticApi } from "features/statistics/api/statisticApi";

export function useUserBodySummary(userId) {
  console.log("KARTA body ", userId);
  return useQuery({
    queryKey: ["user-body-summary", userId],
    queryFn: () => statisticApi.userBodySummary(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserExerciseProgressCard(userId, exerciseId) {
  console.log("KARTA ", userId, exerciseId);
  return useQuery({
    queryKey: ["user-exercise-progress-card", userId, exerciseId],
    queryFn: () => statisticApi.userExercisePorgressCard(userId, exerciseId),
    enabled: !!userId && !!exerciseId,
    staleTime: 5 * 60 * 1000,
  });
}
