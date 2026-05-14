import {
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

import ResponsiveModal from "components/Core/ResponsiveModal";
import ProductPicker from "components/Fitapp/ProductPicker";
import NutritionBar from "components/Fitapp/NutritionBar";

import CreateProductModal from "./CreateProductModal";

import { useProducts } from "hooks/Fitapp/useNutrition";
import { useCreateMeal } from "hooks/Fitapp/useMeals";

export default function MealCreatorModal({ open, onClose }) {
  const { data: products } = useProducts();
  const createMeal = useCreateMeal();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [createProductOpen, setCreateProductOpen] = useState(false);

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
      { kcal: 0, protein: 0, carbs: 0, fat: 0 },
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
      prev.map((ing, i) => (i === index ? { ...ing, weight_g: value } : ing)),
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
      <ResponsiveModal
        open={open}
        onClose={onClose}
        title="Stwórz posiłek"
        renderActions={({ isMobile }) => (
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            {!isMobile && (
              <Button variant="outlined" onClick={onClose} fullWidth>
                Anuluj
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!name || ingredients.length === 0}
              fullWidth
            >
              Zapisz posiłek
            </Button>
          </Stack>
        )}
      >
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
          sx={{ mt: 2, mb: 2 }}
          onClick={() => setPickerOpen(true)}
        >
          Dodaj składnik
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
          onClick={() => setCreateProductOpen(true)}
        >
          Stwórz składnik
        </Button>

        <NutritionBar
          kcal={Math.round(totals.kcal)}
          protein={Math.round(totals.protein)}
          fat={Math.round(totals.fat)}
          carbs={Math.round(totals.carbs)}
          variant="rectangle"
        />
      </ResponsiveModal>

      <ProductPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        products={products || []}
        onSelect={handleAddProduct}
      />
      <CreateProductModal
        open={createProductOpen}
        onClose={() => setCreateProductOpen(false)}
      />
    </>
  );
}
