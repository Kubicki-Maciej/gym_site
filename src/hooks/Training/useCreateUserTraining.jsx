import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trainingApi } from "api/trainingApi";

export function useCreateUserTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => trainingApi.createUserTraining(data),
    onSuccess: () => {
      // Invalidacja queries związanych z treningami użytkownika
      queryClient.invalidateQueries({
        predicate: query => {
          const key = query.queryKey[0];
          return key === "userTrainingsInDateRange" || key === "userTrainings";
        },
      });
    },
  });
}
