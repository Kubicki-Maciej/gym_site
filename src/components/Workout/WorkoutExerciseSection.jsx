import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { formatDate } from "utils/scheduleUtils";
import ExerciseList from "./ExerciseList";

export default function WorkoutExerciseSection({
  userName,
  trainingDate,
  exercises,
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
        <Typography sx={{ fontWeight: 400 }}>
          Trening: {formatDate(trainingDate)}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Użytkownik: {userName}
        </Typography>
      </Stack>

      <ExerciseList
        exercises={exercises}
        emptyMessage="Brak ćwiczeń w tym treningu"
        onSerieChange={onSerieChange}
        onAdjustSerie={onAdjustSerie}
        onAddSerie={onAddSerie}
        onRemoveSerie={onRemoveSerie}
        onDeleteExercise={onDeleteExercise}
        trainingObject={trainingObject}
        onSerieUpdate={onSerieUpdate}
      />
    </Box>
  );
}
