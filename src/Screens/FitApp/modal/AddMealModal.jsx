import { Dialog, Box, Button } from "@mui/material";
import { useMeals } from "hooks/Fitapp/useNutrition";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "api/client";
import { queryKeys } from "hooks/Fitapp/queryKeys";

export default function AddMealModal({ open, onClose, mealType }) {
  const { data: meals } = useMeals();
  const queryClient = useQueryClient();

  const addMeal = useMutation({
    mutationFn: meal_id =>
      api.post("api/nutrition/diary/add_meal/", {
        meal_id,
        meal_type: mealType,
        date: new Date(),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diaryEntries });
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={2}>
        {meals?.map(meal => (
          <Button
            key={meal.id}
            onClick={() => {
              addMeal.mutate(meal.id);
              onClose();
            }}
          >
            {meal.name}
          </Button>
        ))}
      </Box>
    </Dialog>
  );
}
