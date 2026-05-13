import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fitappApi } from "api/fitappApi";
import { queryKeys } from "./queryKeys";

export const useDiaryMutations = () => {
  const queryClient = useQueryClient();

  const updateDiaryIngredient = useMutation({
    mutationFn: ({ id, payload }) =>
      fitappApi.updateDiaryIngredient(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diaryEntries,
      });
    },
  });

  const createIngredient = useMutation({
    mutationFn: payload => fitappApi.createDiaryIngredient(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diaryEntries,
      });
    },
  });

  const deleteIngredient = useMutation({
    mutationFn: id => fitappApi.deleteDiaryIngredient(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diaryEntries,
      });
    },
  });

  const addMealToDiary = useMutation({
    mutationFn: payload => fitappApi.addMealToDiary(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.diaryEntries,
      });
    },
  });

  return {
    updateDiaryIngredient,
    createIngredient,
    deleteIngredient,
    addMealToDiary,
  };
};
