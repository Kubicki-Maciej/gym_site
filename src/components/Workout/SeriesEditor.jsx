import React from "react";
import { Box, Stack } from "@mui/material";
import SerieRow from "./SerieRow";

export default function SeriesEditor({
  exercise,
  onSerieChange,
  onAdjustSerie,

  onRemoveSerie,
  onSerieUpdate,
}) {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={0.5}>
        {exercise.exerciseSeries.map((serie, idx) => (
          <SerieRow
            key={serie.id}
            initialSerie={serie}
            index={idx}
            exerciseId={exercise.userExerciseId}
            onRemoveSerie={onRemoveSerie}
            exerciseType={exercise.exerciseType}
            onSerieUpdate={onSerieUpdate}
          />
        ))}
      </Stack>
    </Box>
  );
}
