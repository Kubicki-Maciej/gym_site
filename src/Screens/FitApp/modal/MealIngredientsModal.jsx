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

export default function MealIngredientsModal({
  meal,
  mealType,
  onClose,
  selectedDay,
}) {
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
        // ing.product jest obiektem
        acc.kcal += Number(ing.product.kcal_per_100g) * factor;
        acc.protein += Number(ing.product.protein_per_100g) * factor;
        acc.carbs += Number(ing.product.carbs_per_100g) * factor;
        acc.fat += Number(ing.product.fat_per_100g) * factor;

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

  // POPRAWKA: Porównujemy po ID, a nie po całym obiekcie
  const handleWeightChange = (productId, value) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.product.id === productId // <-- Zmiana na ing.product.id
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
      date: selectedDay,

      ingredients: ingredients.map(ing => ({
        // POPRAWKA: Backend oczekuje ID produktu (integer), a nie całego obiektu
        product: ing.product.id, // <-- Zmiana na ing.product.id
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
            // POPRAWKA: Używamy unikalnego ID z obiektu jako key
            <Box key={ing.product.id}>
              {" "}
              {/* <-- Zmiana na ing.product.id */}
              <Typography fontWeight={600}>{ing.product_name}</Typography>
              <TextField
                fullWidth
                type="number"
                value={ing.weight_g}
                // POPRAWKA: Przekazujemy ID produktu do uchwytu
                onChange={e =>
                  handleWeightChange(ing.product.id, e.target.value)
                }
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
