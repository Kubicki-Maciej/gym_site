import React from "react";
import { Paper, Typography, Stack, Button, Box } from "@mui/material";

export default function WorkoutHeader({
  training,
  isSaving,
  onSave,
  onCancel,
}) {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          {training.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {training.description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Anuluj
        </Button>
      </Stack>
    </Paper>
  );
}
