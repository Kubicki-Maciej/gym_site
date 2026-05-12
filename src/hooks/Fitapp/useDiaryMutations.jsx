import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fitappApi } from "api/fitappApi";
import { queryKeys } from "./queryKeys";

export const useDiaryMutations = () => {
  const queryClient = useQueryClient();

  const updateIngredient = useMutation({
    mutationFn: ({ id, data }) => fitappApi.updateDiaryIngredient(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.diaryEntries });

      const previous = queryClient.getQueryData(queryKeys.diaryEntries);

      queryClient.setQueryData(queryKeys.diaryEntries, old =>
        old.map(entry => ({
          ...entry,
          snapshot: {
            ...entry.snapshot,
            ingredients: entry.snapshot.ingredients.map(ing =>
              ing.id === id ? { ...ing, weight_g: data.weight_g } : ing,
            ),
          },
        })),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKeys.diaryEntries, context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diaryEntries });
    },
  });

  const createIngredient = useMutation({
    mutationFn: fitappApi.createDiaryIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diaryEntries });
    },
  });

  const deleteIngredient = useMutation({
    mutationFn: fitappApi.deleteDiaryIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diaryEntries });
    },
  });

  return { updateIngredient, createIngredient, deleteIngredient };
};
