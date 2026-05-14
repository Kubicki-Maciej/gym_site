import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import ResponsiveModal from "components/Core/ResponsiveModal";
import { useProducts } from "hooks/Fitapp/useNutrition";
import { useDiaryMutations } from "hooks/Fitapp/useDiaryMutations";
import CreateProductModal from "./CreateProductModal";

export default function AddDiaryIngredientModal({ open, onClose, snapshotId }) {
  const { data: products = [], isLoading } = useProducts();
  const { createIngredient } = useDiaryMutations();
  const [createProductOpen, setCreateProductOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [weight, setWeight] = useState(100);

  const resetForm = () => {
    setSelectedProduct(null);
    setSearchQuery("");
    setWeight(100);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAdd = () => {
    if (!selectedProduct || weight <= 0) return;

    createIngredient.mutate(
      {
        snapshot: snapshotId.snapshot_id,
        product: selectedProduct.id,
        weight_g: weight,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  return (
    <>
      <ResponsiveModal
        open={open}
        onClose={handleClose}
        title="Dodaj składnik"
        renderActions={({ isMobile }) => (
          <Stack direction={isMobile ? "column" : "row"} spacing={2}>
            {!isMobile && (
              <Button variant="outlined" onClick={handleClose} fullWidth>
                Cancel
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleAdd}
              disabled={!selectedProduct || weight <= 0}
              fullWidth
            >
              Add
            </Button>
          </Stack>
        )}
      >
        <Stack spacing={3}>
          <Autocomplete
            value={selectedProduct}
            onChange={(_, newValue) => setSelectedProduct(newValue)}
            inputValue={searchQuery}
            onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
            options={products}
            getOptionLabel={option => option?.name || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={isLoading}
            filterOptions={(options, { inputValue }) =>
              options.filter(option =>
                option.name.toLowerCase().includes(inputValue.toLowerCase()),
              )
            }
            noOptionsText="No products found"
            renderInput={params => (
              <TextField
                {...params}
                label="Search product"
                placeholder="Start typing..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {selectedProduct && (
            <Box
              sx={{
                p: 2,
                bgcolor: "action.hover",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">
                Selected: {selectedProduct.name}
              </Typography>
            </Box>
          )}

          <TextField
            label="Weight (g)"
            type="number"
            value={weight}
            onChange={e => setWeight(Number(e.target.value))}
            inputProps={{ min: 1 }}
            fullWidth
          />
        </Stack>
        <Button sx={{ mt: 2 }} onClick={() => setCreateProductOpen(true)}>
          Stwórz składnik
        </Button>
      </ResponsiveModal>
      <CreateProductModal
        open={createProductOpen}
        onClose={() => setCreateProductOpen(false)}
      />
    </>
  );
}
