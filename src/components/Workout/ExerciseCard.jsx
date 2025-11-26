import React, { useState } from "react";
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
import { flex } from "@mui/system";

export default function ExerciseCard({
  exercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const handleToggleCollapse = () => {
    console.log("zwin");
    setCollapsed(prev => !prev);
  };

  console.log("exercise");
  console.log(exercise);
  return (
    <Card elevation={1}>
      <CardContent>
        {/* header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {exercise.name}
          </Typography>
          <Button onClick={handleToggleCollapse}>hide</Button>
        </Box>
        {collapsed && (
          <>
            {exercise.exerciseSeries?.length > 0 && (
              <SeriesEditor
                exercise={exercise}
                onSerieChange={onSerieChange}
                onAdjustSerie={onAdjustSerie}
                onAddSerie={onAddSerie}
                onRemoveSerie={onRemoveSerie}
              />
            )}
          </>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => onAddSerie(exercise.userExerciseId)}
          size="small"
        >
          Dodaj serię
        </Button>
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
