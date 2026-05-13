import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

import { useProducts } from "hooks/Fitapp/useNutrition";
import { useDiaryMutations } from "hooks/Fitapp/useDiaryMutations";

import { useState } from "react";

export default function AddDiaryIngredientModal({ open, onClose, snapshotId }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: products = [], isLoading } = useProducts();
  const { createIngredient } = useDiaryMutations();

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
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: isMobile
          ? {
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              m: 0,
              borderRadius: 0,
            }
          : {
              width: "100%",
              borderRadius: 2,
            },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: isMobile ? "100dvh" : "auto",
        }}
      >
        {isMobile ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton onClick={handleClose}>
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h6">Add Ingredient</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              pb: 0,
            }}
          >
            <Typography variant="h6">Add Ingredient</Typography>

            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: isMobile ? 2 : 3,
            pt: 2,
          }}
        >
          <Stack spacing={3}>
            <Autocomplete
              value={selectedProduct}
              onChange={(_, newValue) => setSelectedProduct(newValue)}
              inputValue={searchQuery}
              onInputChange={(_, newInputValue) =>
                setSearchQuery(newInputValue)
              }
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
        </Box>

        <Box
          sx={{
            p: isMobile ? 2 : 3,
            pt: isMobile ? 1.5 : 0,
            borderTop: isMobile ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
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
        </Box>
      </Box>
    </Dialog>
  );
}
