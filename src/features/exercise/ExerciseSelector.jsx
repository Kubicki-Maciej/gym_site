import React, { useMemo, useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

export default function ExerciseSelector({
  exercises,
  onSelect,
  muscleDisable,
  sx,
}) {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  // 1. Wyciągamy unikalne mięśnie na podstawie ID
  // Używamy Map, aby kluczem było ID (które jest unikalne), a wartością cały obiekt mięśnia.
  const uniqueMuscles = useMemo(() => {
    const muscleMap = new Map();

    exercises.forEach(ex => {
      ex.muscles.forEach(muscle => {
        // Jeśli nie mamy jeszcze tego ID w mapie, dodajemy je
        if (!muscleMap.has(muscle.id)) {
          muscleMap.set(muscle.id, muscle);
        }
      });
    });

    return Array.from(muscleMap.values());
  }, [exercises]);

  // 2. Filtrowanie ćwiczeń
  const filteredExercises = useMemo(() => {
    if (!selectedMuscle) return exercises;

    return exercises.filter(ex =>
      // Sprawdzamy, czy w tablicy muscles danego ćwiczenia istnieje taki,
      // który ma to samo ID co wybrany mięsień.
      ex.muscles.some(m => m.id === selectedMuscle.id),
    );
  }, [exercises, selectedMuscle]);

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ ...sx }}>
      {/* FILTR PO MIĘŚNIU */}
      {muscleDisable ? (
        ""
      ) : (
        <Autocomplete
          options={uniqueMuscles}
          // Ważne: mówimy co ma być wyświetlone jako tekst (nazwa mięśnia)
          getOptionLabel={option => option.name}
          value={selectedMuscle}
          onChange={(e, value) => setSelectedMuscle(value)}
          // isOptionEqualToValue pomaga MUI zrozumieć, czy wybrany obiekt to ten sam co na liście (po ID)
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => (
            <TextField {...params} label="Filtruj po mięśniu" />
          )}
        />
      )}

      {/* WYBÓR ĆWICZENIA */}
      <Autocomplete
        options={filteredExercises}
        // Tutaj też zabezpieczamy wyświetlanie nazwy
        getOptionLabel={option => option.name || ""}
        onChange={(e, value) => onSelect(value)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={params => (
          <TextField {...params} label="Wybierz ćwiczenie" />
        )}
        // Opcjonalnie: Jeśli lista jest pusta po filtracji
        noOptionsText="Brak ćwiczeń dla wybranego mięśnia"
      />
    </Box>
  );
}
