import {
  Dialog,
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import NutritionBar from "components/Fitapp/NutritionBar";
import { useDiaryMutations } from "hooks/Fitapp/useDiaryMutations";

import ProductPicker from "components/Fitapp/ProductPicker";
import { useProducts } from "hooks/Fitapp/useNutrition";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "utils/debounce";
import AddDiaryIngredientModal from "./AddDiaryIngredientModal";

export default function EditDiaryEntryModal({ entry, onClose }) {
  const { updateDiaryIngredient, deleteIngredient, createIngredient } =
    useDiaryMutations();
  const { data: products } = useProducts();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [localIngredients, setLocalIngredients] = useState([]);

  useEffect(() => {
    if (!entry?.ingredients) return;

    setLocalIngredients(prev => {
      if (prev.length === 0) {
        return entry.ingredients;
      }

      const prevIds = new Set(prev.map(i => i.id));
      const entryIds = new Set(entry.ingredients.map(i => i.id));

      const newIngredients = entry.ingredients.filter(
        i => !prevIds.has(i.id) && !String(i.id).startsWith("temp-"),
      );

      const filtered = prev.filter(i => entryIds.has(i.id));

      return [...filtered, ...newIngredients];
    });
  }, [entry?.ingredients]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((id, weight) => {
        updateDiaryIngredient.mutate({
          id,
          payload: {
            weight_g: weight,
          },
        });
      }, 500),
    [updateDiaryIngredient],
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel?.();
    };
  }, [debouncedUpdate]);

  const totals = useMemo(() => {
    return localIngredients.reduce(
      (acc, ing) => {
        acc.kcal += Number(ing.kcal);
        acc.protein += Number(ing.protein);
        acc.carbs += Number(ing.carbs);
        acc.fat += Number(ing.fat);

        return acc;
      },
      {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    );
  }, [localIngredients]);

  const handleChange = (ingredient, value) => {
    const weight = Number(value);

    if (Number.isNaN(weight)) return;

    const currentWeight = Number(ingredient.weight_g) || 1;

    const kcalPer100 = Number(ingredient.kcal) / (currentWeight / 100);

    const proteinPer100 = Number(ingredient.protein) / (currentWeight / 100);

    const carbsPer100 = Number(ingredient.carbs) / (currentWeight / 100);

    const fatPer100 = Number(ingredient.fat) / (currentWeight / 100);

    const factor = weight / 100;

    setLocalIngredients(prev =>
      prev.map(ing =>
        ing.id === ingredient.id
          ? {
              ...ing,
              weight_g: weight,

              kcal: (kcalPer100 * factor).toFixed(2),

              protein: (proteinPer100 * factor).toFixed(2),

              carbs: (carbsPer100 * factor).toFixed(2),

              fat: (fatPer100 * factor).toFixed(2),
            }
          : ing,
      ),
    );

    debouncedUpdate(ingredient.id, weight);
  };

  const handleDelete = id => {
    // optimistic remove
    setLocalIngredients(prev => prev.filter(i => i.id !== id));

    deleteIngredient.mutate(id);
  };

  const handleAddProduct = product => {
    const newIngredient = {
      id: `temp-${Date.now()}`,

      product: product.id,

      product_name: product.name,

      weight_g: 100,

      kcal: Number(product.kcal_per_100g),

      protein: Number(product.protein_per_100g),

      carbs: Number(product.carbs_per_100g),

      fat: Number(product.fat_per_100g),
    };

    // optimistic update UI
    setLocalIngredients(prev => [...prev, newIngredient]);

    createIngredient.mutate({
      diary_entry: entry.id,
      product: product.id,
      weight_g: 100,
    });
  };

  if (!entry) return null;

  return (
    <Dialog open={!!entry} onClose={onClose} maxWidth="sm" fullWidth>
      <Box p={2}>
        <Typography variant="h6" mb={2}>
          {entry.meal_name}
        </Typography>

        <Stack spacing={1.5}>
          {localIngredients.map(ing => (
            <Box key={ing.id} display="flex" alignItems="center" gap={1}>
              <Box flex={1}>
                <Typography fontWeight={600}>{ing.product_name}</Typography>

                <Typography variant="caption">
                  B: {Math.round(ing.protein)}g | C: {Math.round(ing.carbs)}g |
                  F: {Math.round(ing.fat)}g
                </Typography>
              </Box>

              <TextField
                type="number"
                size="small"
                value={ing.weight_g}
                onChange={e => handleChange(ing, Number(e.target.value))}
                sx={{ width: 90 }}
              />

              <Typography width={80}>
                {Math.round(Number(ing.kcal))} kcal
              </Typography>

              <IconButton onClick={() => handleDelete(ing.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => setPickerOpen(true)}
        >
          + Dodaj produkt
        </Button>
        <Divider sx={{ my: 2 }} />

        <AddDiaryIngredientModal
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          snapshotId={entry}
        />
        <NutritionBar
          kcal={Math.round(totals.kcal)}
          protein={Math.round(totals.protein)}
          carbs={Math.round(totals.carbs)}
          fat={Math.round(totals.fat)}
          variant="mini"
        />
      </Box>
    </Dialog>
  );
}
