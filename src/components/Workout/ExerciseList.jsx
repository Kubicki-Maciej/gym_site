import React from "react";
import { Box, Stack, Typography, Button, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({
  exercises,
  onAddExercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
}) {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Ćwiczenia ({exercises.length})
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={onAddExercise}
        >
          Dodaj ćwiczenie
        </Button>
      </Stack>

      {exercises.length === 0 ? (
        <Alert severity="info">Brak ćwiczeń w tym treningu</Alert>
      ) : (
        <Stack spacing={2}>
          {exercises.map(exercise => (
            <ExerciseCard
              key={exercise.userExerciseId}
              exercise={exercise}
              onSerieChange={onSerieChange}
              onAdjustSerie={onAdjustSerie}
              onAddSerie={onAddSerie}
              onRemoveSerie={onRemoveSerie}
              onDeleteExercise={onDeleteExercise}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
