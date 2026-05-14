import { Box, Typography, TextField, Stack, Button } from "@mui/material";

import { useMemo, useState, useEffect } from "react";
import { useAddMealToDiary } from "hooks/Fitapp/useDiaryActions";
import ResponsiveModal from "components/Core/ResponsiveModal";

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

  const handleWeightChange = (productId, value) => {
    setIngredients(prev =>
      prev.map(ing =>
        ing.product.id === productId
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
        product: ing.product.id,
        weight_g: Number(ing.weight_g),
      })),
    });

    onClose();
  };

  return (
    <ResponsiveModal
      open={!!meal}
      onClose={onClose}
      title={meal.name}
      maxWidth="sm"
      renderActions={({ isMobile }) => (
        <Stack direction={isMobile ? "column" : "row"} spacing={2}>
          {!isMobile && (
            <Button variant="outlined" onClick={onClose} fullWidth>
              Cancel
            </Button>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleAdd}
            disabled={!ingredients.length}
          >
            + Add
          </Button>
        </Stack>
      )}
    >
      <Stack spacing={2}>
        {ingredients.map(ing => (
          <Box key={ing.product.id}>
            <Typography fontWeight={600}>{ing.product_name}</Typography>
            <TextField
              fullWidth
              type="number"
              value={ing.weight_g}
              onChange={e => handleWeightChange(ing.product.id, e.target.value)}
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
    </ResponsiveModal>
  );
}
