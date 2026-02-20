import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useCreateBodyMeasurement } from "hooks/BodyMeasurements/useCreateBodyMeasurement";

export default function BodyMeasurementForm({ onSaved, userId }) {
  const [form, setForm] = useState({
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    biceps: "",
    thigh: "",
    calf: "",
  });

  const { createMeasurement, loading } = useCreateBodyMeasurement(
    (userId = userId),
  );

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const cleanData = Object.fromEntries(
      Object.entries(form).filter(
        ([_, value]) => value !== "" && value !== null,
      ),
    );

    if (Object.keys(cleanData).length === 0) {
      alert("Wpisz przynajmniej jedną wartość!");
      return;
    }

    await createMeasurement(cleanData, userId);

    setForm({
      weight: "",
      chest: "",
      waist: "",
      hips: "",
      biceps: "",
      thigh: "",
      calf: "",
    });

    onSaved?.();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Dodaj pomiar
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.entries(form).map(([key, value]) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, key: { key } }}>
              <TextField
                // InputAdornment={key ? ""}
                fullWidth
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={handleChange}
                type="number"
                // inputProps={{ step: "0.1" }}

                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {key === "weight" ? "kg" : "cm"}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& input[type=number]": {
                    "-moz-appearance": "textfield",
                  },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading} // Warto zablokować przycisk podczas wysyłania
        >
          {loading ? "Zapisywanie..." : "Zapisz pomiar"}
        </Button>
      </Box>
    </Paper>
  );
}
