import React, { useMemo, useState } from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";

export default function ExerciseSelector({ exercises, onSelect }) {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const allMuscles = Array.from(new Set(exercises.flatMap(ex => ex.muscles)));

  const filteredExercises = useMemo(() => {
    if (!selectedMuscle) return exercises;

    return exercises.filter(ex => ex.muscles.includes(selectedMuscle));
  }, [exercises, selectedMuscle]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* FILTR PO MIĘŚNIU */}
      <Autocomplete
        options={Array.from(new Set(exercises.flatMap(e => e.muscles)))}
        value={selectedMuscle}
        onChange={(e, value) => setSelectedMuscle(value)}
        renderInput={params => (
          <TextField {...params} label="Filtruj po mięśniu" />
        )}
      />

      {/* WYBÓR ĆWICZENIA */}
      <Autocomplete
        options={filteredExercises}
        getOptionLabel={option => option.exercise_name || option.name}
        onChange={(e, value) => onSelect(value)}
        renderInput={params => (
          <TextField {...params} label="Wybierz ćwiczenie" />
        )}
      />
    </Box>
  );
}
