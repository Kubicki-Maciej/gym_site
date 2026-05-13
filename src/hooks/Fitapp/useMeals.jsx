import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fitappApi } from "api/fitappApi";

import { queryKeys } from "./queryKeys";

export const useCreateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fitappApi.createMeal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.meals,
      });
    },
  });
};
