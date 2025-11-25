import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SerieRow from "./SerieRow";

export default function SeriesEditor({
  exercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
}) {
  return (
    <Box
      sx={{
        mb: 2,
        p: 1.5,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
        Serie treningowe:
      </Typography>
      <Stack spacing={2}>
        {exercise.exerciseSeries.map((serie, idx) => (
          <SerieRow
            key={serie.id}
            serie={serie}
            index={idx}
            exerciseId={exercise.userExerciseId}
            onSerieChange={onSerieChange}
            onAdjustSerie={onAdjustSerie}
            onRemoveSerie={onRemoveSerie}
          />
        ))}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => onAddSerie(exercise.userExerciseId)}
          size="small"
        >
          Dodaj serię
        </Button>
      </Stack>
    </Box>
  );
}
