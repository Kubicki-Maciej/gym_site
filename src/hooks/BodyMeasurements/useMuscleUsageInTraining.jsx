import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { statisticApi } from "features/statistics/api/statisticApi";

export default function useMuscleUsageInTraining(
  userId,
  trainingId,
  warmUp,
  options = {},
) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: ["user-muscle-usage-training", userId, trainingId, warmUp],
    queryFn: async () => {
      const data = await statisticApi.getUserMuscleUsageInTraining(
        userId,
        trainingId,
        warmUp,
      );
      return (
        data?.filter(item => item.eng_name !== null && item.name !== null) || []
      );
    },
    enabled: !!userId && !!trainingId && enabled,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
