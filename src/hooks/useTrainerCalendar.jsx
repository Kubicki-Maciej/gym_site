import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trainingApi } from "../api/trainingApi";

export function useUpcomingTrainerWorkouts(trainerId) {
  return useQuery({
    queryKey: ["upcomingTrainerWorkouts", trainerId],
    queryFn: () => trainingApi.getUpcomingTrainerWorkouts(trainerId),
    enabled: !!trainerId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateMultipleTrainings(trainerId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => trainingApi.createMultipleTrainings(data),
    onSuccess: () => {
      // odświeżenie treningów po mutacji
      queryClient.invalidateQueries(["upcomingTrainerWorkouts", trainerId]);
    },
  });
}
