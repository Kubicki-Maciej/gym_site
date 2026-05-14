import {
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  Button,
  Divider,
  Tooltip,
  Fab,
} from "@mui/material";
import { OutlinedInput, InputAdornment } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import NutritionBar from "components/Fitapp/NutritionBar";
import { useDiaryMutations } from "hooks/Fitapp/useDiaryMutations";

import MacroInline from "components/Fitapp/MacroInline";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "utils/debounce";
import AddDiaryIngredientModal from "./AddDiaryIngredientModal";
import ResponsiveModal from "components/Core/ResponsiveModal";
import MacroInlineElement from "components/Fitapp/MacroInlineElement";
import AddButton from "components/common/AddButton";
import { Add } from "@mui/icons-material";

export default function EditDiaryEntryModal({ entry, onClose }) {
  const { updateDiaryIngredient, deleteIngredient, deleteDiaryEntry } =
    useDiaryMutations();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [localIngredients, setLocalIngredients] = useState([]);

  useEffect(() => {
    if (!entry?.ingredients) {
      setLocalIngredients([]);
      return;
    }

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

  if (!entry) return null;

  const handleClose = () => {
    setPickerOpen(false);
    onClose();
  };

  const deleteButtonDiaryEntryAction = () => {
    deleteDiaryEntry.mutate(entry.id);
    handleClose();
  };

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
    setLocalIngredients(prev => prev.filter(i => i.id !== id));
    deleteIngredient.mutate(id);
  };

  return (
    <>
      <ResponsiveModal
        open={!!entry}
        onClose={handleClose}
        title={entry.meal_name}
        maxWidth="sm"
      >
        <Stack spacing={1.5}>
          {localIngredients.map(ing => (
            <Box
              key={ing.id}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                display: "grid",
                gridTemplateColumns: "3fr auto 1fr 0.5fr", // Tworzy 3 strefy: lewa, środek dopasowany do przycisku, prawa
                alignItems: "center", // Wyrównuje w pionie
                mt: 3,
                width: "100%",
              }}
            >
              <Box flex={1}>
                <Typography fontWeight={600}>{ing.product_name}</Typography>
                <MacroInline
                  fat={ing.fat}
                  protein={ing.protein}
                  carbs={ing.carbs}
                />
              </Box>
              <OutlinedInput
                size="small"
                value={ing.weight_g}
                onChange={e => {
                  const val = e.target.value;
                  handleChange(ing, val === "" ? 0 : Number(val));
                }}
                endAdornment={<InputAdornment position="end">g</InputAdornment>}
                inputProps={{
                  min: 0,
                  step: 1,
                  inputMode: "numeric",
                }}
                sx={{
                  width: 100,
                  borderRadius: 2,
                  bgcolor: "background.paper",

                  "& input": {
                    textAlign: "right",
                    py: 1,
                    px: 1,
                    fontWeight: 600,
                  },

                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },

                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
              />
              {/* 
              <TextField
                type="number"
                size="small"
                value={ing.weight_g}
                onChange={e => handleChange(ing, Number(e.target.value))}
                sx={{ width: 90 }}
              /> */}

              <MacroInlineElement sx={{ color: "#ff7043" }}>
                <LocalFireDepartmentIcon sx={{ fontSize: 14 }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "inherit" }}
                >
                  Kcal: {Math.round(ing.kcal)}
                </Typography>
              </MacroInlineElement>

              <IconButton onClick={() => handleDelete(ing.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            mt: 3,
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifySelf: "flex-start" }}>
            <Tooltip title="Usuń wpis">
              <IconButton
                color="error"
                onClick={() => deleteButtonDiaryEntryAction()}
                sx={{}}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <AddButton
            setPickerOpen={() => setPickerOpen(true)}
            buttonSize={40}
          />
          <Box />
        </Box>

        <Divider sx={{ my: 2 }} />

        <NutritionBar
          kcal={Math.round(totals.kcal)}
          protein={Math.round(totals.protein)}
          carbs={Math.round(totals.carbs)}
          fat={Math.round(totals.fat)}
          variant="rectangle"
        />
      </ResponsiveModal>

      <AddDiaryIngredientModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        snapshotId={entry}
      />
    </>
  );
}
