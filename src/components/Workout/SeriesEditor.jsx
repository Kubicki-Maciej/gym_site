import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import SerieRow from "./SerieRow";

export default function SeriesEditor({
  exercise,
  onSerieChange,
  onAdjustSerie,
  readOnly,
  onRemoveSerie,
  onSerieUpdate,
}) {
  if (readOnly) {
    return (
      <>
        {exercise.exerciseSeries.map((serie, index) => (
          <Box
            key={serie.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 1fr",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              border: serie.warm_up ? "solid 1px #ffc400" : "",
              // bgcolor: serie.warm_up ? "warning.light" : "grey.100",
              mb: 1,
            }}
          >
            {/* numer */}
            <Typography fontWeight={700}>{index + 1}</Typography>

            {/* powtórzenia */}
            <Typography>{serie.repeats} reps</Typography>

            {/* ciężar */}
            <Typography textAlign="right" fontWeight={600}>
              {serie.weight} kg
            </Typography>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Box
      sx={{
        // p: 1,
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
