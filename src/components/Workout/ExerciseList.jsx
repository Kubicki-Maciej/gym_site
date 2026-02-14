import React from "react";
import { Box, Stack, Typography, Button, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({
  trainingDate,
  exercises,
  onAddExercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
  trainingObject,
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
          Trening ({trainingDate}) {/* add user name  */}
        </Typography>
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
              trainingObject={trainingObject}
            />
          ))}
        </Stack>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}></Typography>
      </Stack>
    </Box>
  );
}
