import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import SeriesEditor from "./SeriesEditor";

export default function ExerciseCard({
  exercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
}) {
  console.log("exercise");
  console.log(exercise);
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {exercise.name}
        </Typography>

        {exercise.exerciseSeries?.length > 0 && (
          <SeriesEditor
            exercise={exercise}
            onSerieChange={onSerieChange}
            onAdjustSerie={onAdjustSerie}
            onAddSerie={onAddSerie}
            onRemoveSerie={onRemoveSerie}
          />
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton
          size="small"
          color="error"
          onClick={() => {
            console.log(" tutaj dzialamy");
            onDeleteExercise(exercise.userExerciseId);
          }}
          title="Usuń ćwiczenie"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
