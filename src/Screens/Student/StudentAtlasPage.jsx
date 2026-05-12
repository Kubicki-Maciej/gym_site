import React from "react";
import { Box } from "@mui/material";
import { useGetAllExercises } from "hooks/Exercises/useGetAllExercises";
import { useTrainingBuilder } from "hooks/Training/useTrainingBuilder";
import ExerciseTrainingList from "features/exercise/ExerciseTrainingList";

export default function StudentAtlasPage() {
  const { data: exercises = [] } = useGetAllExercises();

  const { selectedExercises, addExercise, removeExercise, search, setSearch } =
    useTrainingBuilder();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
        px: 2,
      }}
    >
      <ExerciseTrainingList
        exercises={exercises}
        onAdd={addExercise}
        onRemove={removeExercise}
        selectedExercises={selectedExercises}
        search={search}
        setSearch={setSearch}
        showOnlyExercises={true}
      />
    </Box>
  );
}
