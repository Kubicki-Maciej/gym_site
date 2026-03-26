import React from "react";
import { Box, Stack, Typography, Alert } from "@mui/material";

import ExerciseCard from "./ExerciseCard";
import { formatDate } from "utils/scheduleUtils";

export default function ExerciseList({
  userName,
  trainingDate,
  exercises,
  onAddExercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
  trainingObject,
  onSerieUpdate,
}) {
  return (
    <Box>
      <Stack direction="column" alignItems="left" sx={{ mb: 2 }}>
        <Typography variant="p" sx={{ fontWeight: 400 }}>
          Trening: {formatDate(trainingDate)}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Użytkownik: {userName}
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
              onSerieUpdate={onSerieUpdate}
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
