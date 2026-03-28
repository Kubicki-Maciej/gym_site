import React from "react";
import { Stack, Alert } from "@mui/material";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({
  exercises = [],
  emptyMessage = "Brak ćwiczeń",
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
  trainingObject,
  onSerieUpdate,
}) {
  if (!exercises.length) {
    return <Alert severity="info">{emptyMessage}</Alert>;
  }

  return (
    <Stack spacing={2}>
      {exercises.map(exercise => (
        <ExerciseCard
          key={exercise.userExerciseId || exercise.id}
          exercise={exercise}
          onSerieChange={onSerieChange}
          onAdjustSerie={onAdjustSerie}
          onAddSerie={onAddSerie}
          onRemoveSerie={onRemoveSerie}
          onDeleteExercise={onDeleteExercise}
          trainingObject={trainingObject}
          onSerieUpdate={onSerieUpdate}
        />
      ))}
    </Stack>
  );
}
