import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ResponsiveModal from "components/Core/ResponsiveModal";
import { useProductMutation } from "hooks/Fitapp/useProductMutation";

const initialValues = {
  name: "",
  kcal_per_100g: "",
  protein_per_100g: "",
  carbs_per_100g: "",
  fat_per_100g: "",
};

const numericFields = [
  "kcal_per_100g",
  "protein_per_100g",
  "carbs_per_100g",
  "fat_per_100g",
];

const textFieldSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: 56,
  },
};

export default function CreateProductModal({ open, onClose }) {
  const { createProduct } = useProductMutation();

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (open) {
      setValues(initialValues);
      setTouched({});
      setSubmitError("");
    }
  }, [open]);

  const validate = formValues => {
    const errors = {};

    if (!formValues.name.trim()) {
      errors.name = "Podaj nazwę produktu";
    } else if (formValues.name.trim().length < 2) {
      errors.name = "Nazwa musi mieć min. 2 znaki";
    }

    numericFields.forEach(field => {
      const raw = formValues[field];

      if (raw === "") {
        errors[field] = "To pole jest wymagane";
        return;
      }

      const num = Number(raw);

      if (Number.isNaN(num)) {
        errors[field] = "Podaj poprawną liczbę";
        return;
      }

      if (num < 0) {
        errors[field] = "Wartość nie może być ujemna";
        return;
      }

      if (
        ["protein_per_100g", "carbs_per_100g", "fat_per_100g"].includes(
          field,
        ) &&
        num > 100
      ) {
        errors[field] = "Max 100 g / 100 g";
      }
    });

    const protein = Number(formValues.protein_per_100g || 0);
    const carbs = Number(formValues.carbs_per_100g || 0);
    const fat = Number(formValues.fat_per_100g || 0);

    if (
      formValues.protein_per_100g !== "" &&
      formValues.carbs_per_100g !== "" &&
      formValues.fat_per_100g !== "" &&
      protein + carbs + fat > 100
    ) {
      errors.macros =
        "Suma białka, węgli i tłuszczu nie może przekraczać 100 g";
    }

    return errors;
  };

  const errors = useMemo(() => validate(values), [values]);

  const handleChange = field => e => {
    const value = e.target.value;

    setValues(prev => ({
      ...prev,
      [field]: numericFields.includes(field) ? value.replace(",", ".") : value,
    }));
  };

  const handleBlur = field => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const markAllTouched = () => {
    setTouched({
      name: true,
      kcal_per_100g: true,
      protein_per_100g: true,
      carbs_per_100g: true,
      fat_per_100g: true,
    });
  };

  const handleSubmit = () => {
    markAllTouched();
    setSubmitError("");

    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: values.name.trim(),
      kcal_per_100g: Number(values.kcal_per_100g),
      protein_per_100g: Number(values.protein_per_100g),
      carbs_per_100g: Number(values.carbs_per_100g),
      fat_per_100g: Number(values.fat_per_100g),
      source: "manual",
    };

    createProduct.mutate(payload, {
      onSuccess: () => {
        onClose();
      },
      onError: () => {
        setSubmitError("Nie udało się utworzyć produktu.");
      },
    });
  };

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      title="Stwórz własny składnik"
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 680,
          mx: "auto",
        }}
      >
        <Stack spacing={2.5}>
          <Typography variant="body2" color="text.secondary">
            Uzupełnij wartości odżywcze w przeliczeniu na 100 g produktu.
          </Typography>

          {submitError && <Alert severity="error">{submitError}</Alert>}
          {errors.macros && <Alert severity="warning">{errors.macros}</Alert>}

          <TextField
            fullWidth
            label="Nazwa produktu"
            placeholder="np. Domowe musli"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name ? errors.name : " "}
            FormHelperTextProps={{ sx: { minHeight: 22 } }}
            sx={textFieldSx}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Kalorie"
              placeholder="np. 250"
              value={values.kcal_per_100g}
              onChange={handleChange("kcal_per_100g")}
              onBlur={handleBlur("kcal_per_100g")}
              error={Boolean(touched.kcal_per_100g && errors.kcal_per_100g)}
              helperText={
                touched.kcal_per_100g && errors.kcal_per_100g
                  ? errors.kcal_per_100g
                  : " "
              }
              FormHelperTextProps={{ sx: { minHeight: 22 } }}
              inputProps={{ inputMode: "decimal", min: 0, step: "0.01" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kcal</InputAdornment>
                ),
              }}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              label="Białko"
              placeholder="np. 12.5"
              value={values.protein_per_100g}
              onChange={handleChange("protein_per_100g")}
              onBlur={handleBlur("protein_per_100g")}
              error={Boolean(
                touched.protein_per_100g && errors.protein_per_100g,
              )}
              helperText={
                touched.protein_per_100g && errors.protein_per_100g
                  ? errors.protein_per_100g
                  : " "
              }
              FormHelperTextProps={{ sx: { minHeight: 22 } }}
              inputProps={{ inputMode: "decimal", min: 0, step: "0.01" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              label="Węglowodany"
              placeholder="np. 35"
              value={values.carbs_per_100g}
              onChange={handleChange("carbs_per_100g")}
              onBlur={handleBlur("carbs_per_100g")}
              error={Boolean(touched.carbs_per_100g && errors.carbs_per_100g)}
              helperText={
                touched.carbs_per_100g && errors.carbs_per_100g
                  ? errors.carbs_per_100g
                  : " "
              }
              FormHelperTextProps={{ sx: { minHeight: 22 } }}
              inputProps={{ inputMode: "decimal", min: 0, step: "0.01" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              label="Tłuszcz"
              placeholder="np. 8.2"
              value={values.fat_per_100g}
              onChange={handleChange("fat_per_100g")}
              onBlur={handleBlur("fat_per_100g")}
              error={Boolean(touched.fat_per_100g && errors.fat_per_100g)}
              helperText={
                touched.fat_per_100g && errors.fat_per_100g
                  ? errors.fat_per_100g
                  : " "
              }
              FormHelperTextProps={{ sx: { minHeight: 22 } }}
              inputProps={{ inputMode: "decimal", min: 0, step: "0.01" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
              sx={textFieldSx}
            />
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ pt: 1 }}
          >
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Stwórz składnik
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ResponsiveModal>
  );
}
