import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SerieRow from "./SerieRow";

export default function SeriesEditor({
  exercise,
  onSerieChange,
  onAdjustSerie,

  onRemoveSerie,
}) {
  return (
    <Box
      sx={{
        p: 1.5,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={2}>
        {exercise.exerciseSeries.map((serie, idx) => (
          <SerieRow
            key={serie.id}
            initialSerie={serie}
            index={idx}
            exerciseId={exercise.userExerciseId}
            onSerieChange={onSerieChange}
            onAdjustSerie={onAdjustSerie}
            onRemoveSerie={onRemoveSerie}
          />
        ))}
      </Stack>
    </Box>
  );
}
