import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fitappApi } from "api/fitappApi";
import { queryKeys } from "./queryKeys";

export const useAddMealToDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fitappApi.addMealToDiary,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diaryEntries,
      });
    },
  });
};
