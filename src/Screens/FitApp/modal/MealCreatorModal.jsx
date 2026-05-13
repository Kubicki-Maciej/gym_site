import {
  Dialog,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useMemo, useState } from "react";

import ProductPicker from "./ProductPicker";

import { useProducts } from "hooks/Fitapp/useNutrition";
import { useCreateMeal } from "hooks/Fitapp/useMeals";

export default function MealCreatorModal({ open, onClose }) {
  const { data: products } = useProducts();

  const createMeal = useCreateMeal();

  const [name, setName] = useState("");

  const [ingredients, setIngredients] = useState([]);

  const [pickerOpen, setPickerOpen] = useState(false);

  const totals = useMemo(() => {
    return ingredients.reduce(
      (acc, ing) => {
        const factor = Number(ing.weight_g) / 100;

        acc.kcal += Number(ing.kcal_per_100g) * factor;

        acc.protein += Number(ing.protein_per_100g) * factor;

        acc.carbs += Number(ing.carbs_per_100g) * factor;

        acc.fat += Number(ing.fat_per_100g) * factor;

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

  const handleAddProduct = product => {
    setIngredients(prev => [
      ...prev,
      {
        product: product.id,
        product_name: product.name,

        weight_g: 100,

        kcal_per_100g: product.kcal_per_100g,
        protein_per_100g: product.protein_per_100g,
        carbs_per_100g: product.carbs_per_100g,
        fat_per_100g: product.fat_per_100g,
      },
    ]);
  };

  const handleWeightChange = (index, value) => {
    setIngredients(prev =>
      prev.map((ing, i) =>
        i === index
          ? {
              ...ing,
              weight_g: value,
            }
          : ing,
      ),
    );
  };

  const handleDelete = index => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    createMeal.mutate({
      name,
      ingredients: ingredients.map(ing => ({
        product: ing.product,
        weight_g: Number(ing.weight_g),
      })),
    });

    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <Box p={2}>
          <Typography variant="h5" mb={2}>
            Create meal
          </Typography>

          <TextField
            fullWidth
            label="Meal name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Stack spacing={1.5} mt={3}>
            {ingredients.map((ing, index) => {
              const factor = Number(ing.weight_g) / 100;

              const kcal = Number(ing.kcal_per_100g) * factor;

              return (
                <Box
                  key={`${ing.product}-${index}`}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Box flex={1}>
                    <Typography fontWeight={700}>{ing.product_name}</Typography>

                    <Typography variant="caption">
                      {Math.round(kcal)} kcal
                    </Typography>
                  </Box>

                  <TextField
                    size="small"
                    type="number"
                    value={ing.weight_g}
                    onChange={e => handleWeightChange(index, e.target.value)}
                    sx={{ width: 90 }}
                  />

                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() => setPickerOpen(true)}
          >
            Add product
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography>kcal: {Math.round(totals.kcal)}</Typography>

          <Typography>Protein: {Math.round(totals.protein)}g</Typography>

          <Typography>Carbs: {Math.round(totals.carbs)}g</Typography>

          <Typography>Fat: {Math.round(totals.fat)}g</Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save meal
          </Button>
        </Box>
      </Dialog>

      <ProductPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        products={products || []}
        onSelect={handleAddProduct}
      />
    </>
  );
}
