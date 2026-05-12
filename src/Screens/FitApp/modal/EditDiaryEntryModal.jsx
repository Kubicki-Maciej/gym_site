import { Dialog, Box, Typography, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDiaryMutations } from "hooks/Fitapp/useDiaryMutations";
import { debounce } from "utils/debounce";
import { calculateIngredientMacros } from "utils/calcMacros";
import { useMemo, useState, useEffect } from "react";

export default function EditDiaryEntryModal({ entry, onClose }) {
  const { updateIngredient, deleteIngredient } = useDiaryMutations();

  const [localIngredients, setLocalIngredients] = useState([]);

  // 🔥 sync danych gdy zmienia się entry
  useEffect(() => {
    if (entry?.snapshot?.ingredients) {
      setLocalIngredients(entry.snapshot.ingredients);
    }
  }, [entry]);

  // 🔥 debounce zawsze wywołany (bez warunku!)
  const debouncedUpdate = useMemo(
    () =>
      debounce((id, weight) => {
        updateIngredient.mutate({ id, data: { weight_g: weight } });
      }, 500),
    [updateIngredient],
  );

  const handleChange = (ing, weight) => {
    const macros = calculateIngredientMacros(ing.product, weight);

    setLocalIngredients(prev =>
      prev.map(i =>
        i.id === ing.id ? { ...i, weight_g: weight, ...macros } : i,
      ),
    );

    debouncedUpdate(ing.id, weight);
  };

  // ❗ teraz return może być warunkowy
  if (!entry) return null;

  return (
    <Dialog open={!!entry} onClose={onClose}>
      <Box p={2} minWidth={350}>
        <Typography variant="h6">{entry.snapshot.name}</Typography>

        {localIngredients.map(ing => (
          <Box key={ing.id} display="flex" gap={1} alignItems="center">
            <Typography flex={1}>{ing.product_name}</Typography>

            <TextField
              type="number"
              value={ing.weight_g}
              onChange={e => handleChange(ing, Number(e.target.value))}
              size="small"
            />

            <Typography>{Math.round(ing.kcal)} kcal</Typography>

            <IconButton onClick={() => deleteIngredient.mutate(ing.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}
