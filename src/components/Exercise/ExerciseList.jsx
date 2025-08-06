import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExerciseCard from "../Cards/ExerciseCard";
import AddExerciseCard from "../Cards/AddExerciseCard";
export default function ExerciseList({
  exercises,
  onAddExercise,
  onRemoveExercise,
}) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {exercises.map(exercise => (
        <ExerciseCard
          key={exercise.id}
          name={exercise.name}
          onRemove={() => onRemoveExercise(exercise.id)}
        />
      ))}
      <AddExerciseCard onAdd={onAddExercise} excludedExercises={exercises} />
    </Box>
  );
}
