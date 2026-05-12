import React from "react";
import { Box, Chip, Autocomplete, TextField } from "@mui/material";

export default function ExerciseFilters({
  muscleOptions,
  selectedMuscles,
  setSelectedMuscles,
}) {
  return (
    <Box>
      {/* RESET */}
      <Box sx={{ mb: 1 }}>
        <Chip
          label="ALL"
          clickable
          color={selectedMuscles.length === 0 ? "primary" : "default"}
          onClick={() => setSelectedMuscles([])}
        />
      </Box>

      {/* MUSCLE FILTER */}
      <Autocomplete
        multiple
        options={muscleOptions}
        value={selectedMuscles}
        onChange={(e, val) => setSelectedMuscles(val)}
        renderInput={params => (
          <TextField {...params} label="Grupy mięśniowe" />
        )}
      />
    </Box>
  );
}
