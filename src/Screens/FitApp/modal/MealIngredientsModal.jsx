import {
  Dialog,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";

import { useMemo, useState, useEffect } from "react";
import { useAddMealToDiary } from "hooks/Fitapp/useDiaryActions";

export default function MealIngredientsModal({ meal, mealType, onClose }) {
  const addMealMutation = useAddMealToDiary();

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (meal?.ingredients?.length) {
      setIngredients(meal.ingredients);
    } else {
      setIngredients([]);
    }
  }, [meal]);

  const totals = useMemo(() => {
    return ingredients.reduce(
      (acc, ing) => {
        const factor = Number(ing.weight_g) / 100;

        acc.kcal += Number(ing.product_details.kcal_per_100g) * factor;

        acc.protein += Number(ing.product_details.protein_per_100g) * factor;

        acc.carbs += Number(ing.product_details.carbs_per_100g) * factor;

        acc.fat += Number(ing.product_details.fat_per_100g) * factor;

        return acc;
      },
      {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    );
  }, [ingredients]);

  if (!meal) return null;

  const handleWeightChange = (id, value) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.product === id
          ? {
              ...ing,
              weight_g: value,
            }
          : ing,
      ),
    );
  };

  const handleAdd = () => {
    addMealMutation.mutate({
      meal_id: meal.id,
      meal_type: mealType,
      date: new Date().toISOString().split("T")[0],

      ingredients: ingredients.map(ing => ({
        product: ing.product,
        weight_g: Number(ing.weight_g),
      })),
    });

    onClose();
  };

  return (
    <Dialog open={!!meal} onClose={onClose} fullWidth maxWidth="sm">
      <Box p={2}>
        <Typography variant="h6">{meal.name}</Typography>

        <Stack spacing={2} mt={2}>
          {ingredients.map(ing => (
            <Box key={ing.product}>
              <Typography fontWeight={600}>{ing.product_name}</Typography>

              <TextField
                fullWidth
                type="number"
                value={ing.weight_g}
                onChange={e => handleWeightChange(ing.product, e.target.value)}
              />
            </Box>
          ))}
        </Stack>

        <Box mt={3}>
          <Typography>kcal: {Math.round(totals.kcal)}</Typography>

          <Typography>Protein: {Math.round(totals.protein)}g</Typography>

          <Typography>Carbs: {Math.round(totals.carbs)}g</Typography>

          <Typography>Fat: {Math.round(totals.fat)}g</Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleAdd}
        >
          + Add
        </Button>
      </Box>
    </Dialog>
  );
}
