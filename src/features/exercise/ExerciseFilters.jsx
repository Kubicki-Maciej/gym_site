import React from "react";
import { Box, Chip, Autocomplete, TextField } from "@mui/material";

export default function ExerciseFilters({
  muscleOptions = [],
  selectedMuscles = [],
  setSelectedMuscles,
}) {
  const handleReset = () => {
    setSelectedMuscles([]);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* 🔥 CHIP RESET */}
      <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
        <Chip
          label="ALL"
          clickable
          color={selectedMuscles.length === 0 ? "primary" : "default"}
          onClick={handleReset}
        />
      </Box>

      {/* 🔥 AUTOCOMPLETE */}
      <Autocomplete
        multiple
        options={muscleOptions}
        value={selectedMuscles}
        onChange={(e, value) => setSelectedMuscles(value)}
        renderInput={params => <TextField {...params} label="Mięśnie" />}
      />
    </Box>
  );
}
