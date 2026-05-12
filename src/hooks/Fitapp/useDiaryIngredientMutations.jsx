// hooks/useDiaryIngredientMutations.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fitappApi } from "api/fitappApi";

export const useDiaryIngredientMutations = () => {
  const queryClient = useQueryClient();

  // ✏️ UPDATE (zmiana gramatury)
  const updateIngredient = useMutation({
    mutationFn: ({ id, data }) => fitappApi.updateDiaryIngredient(id, data),

    onSuccess: () => {
      // 🔥 odśwież dane
      queryClient.invalidateQueries({ queryKey: "diaryEntries" });
    },
  });

  // ➕ CREATE
  const createIngredient = useMutation({
    mutationFn: data => fitappApi.createDiaryIngredient(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "diaryEntries" });
    },
  });

  // ❌ DELETE
  const deleteIngredient = useMutation({
    mutationFn: id => fitappApi.deleteDiaryIngredient(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "diaryEntries" });
    },
  });

  return {
    updateIngredient,
    createIngredient,
    deleteIngredient,
  };
};
