import React, { useMemo, useState } from "react";
import { Box, TextField, Paper, Typography } from "@mui/material";

import ExerciseTrainingRow from "./ExerciseTrainingRow";
import ExerciseFilters from "./ExerciseFilters";
import TrainingDialog from "components/Dialog/TrainingDialog";
import FloatingTrainingButton from "components/Layout/Button/FloatingTrainingButton";

const getMuscleGroups = exercise => {
  if (!exercise?.muscle_group) return ["Inne"];
  return exercise.muscle_group.map(m => m.name);
};

export default function ExerciseTrainingList({
  exercises,
  onAdd,
  onRemove,
  selectedExercises,
  search,
  setSearch,
  showOnlyExercises = false,
}) {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const muscleOptions = useMemo(() => {
    const set = new Set();
    exercises.forEach(e => getMuscleGroups(e).forEach(g => set.add(g)));
    return Array.from(set);
  }, [exercises]);

  const filtered = useMemo(() => {
    return exercises.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());

      const notSelected = !selectedExercises.find(s => s.id === e.id);

      const matchMuscle =
        selectedMuscles.length === 0 ||
        getMuscleGroups(e).some(g => selectedMuscles.includes(g));

      return matchSearch && notSelected && matchMuscle;
    });
  }, [exercises, search, selectedExercises, selectedMuscles]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, ex) => {
      getMuscleGroups(ex).forEach(g => {
        if (!acc[g]) acc[g] = [];
        acc[g].push(ex);
      });
      return acc;
    }, {});
  }, [filtered]);

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filtry
        </Typography>

        <TextField
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Szukaj ćwiczeń..."
          sx={{ mb: 2 }}
        />

        <ExerciseFilters
          muscleOptions={muscleOptions}
          selectedMuscles={selectedMuscles}
          setSelectedMuscles={setSelectedMuscles}
        />
      </Paper>

      {Object.entries(grouped).map(([group, list]) => (
        <ExerciseTrainingRow
          key={group}
          title={group}
          list={list}
          onAdd={onAdd}
        />
      ))}
      {showOnlyExercises ? (
        ""
      ) : (
        <>
          {" "}
          <FloatingTrainingButton
            count={selectedExercises.length}
            onClick={() => setOpenDialog(true)}
          />
          <TrainingDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            exercises={exercises}
            selectedExercises={selectedExercises}
            onRemove={onRemove}
          />
        </>
      )}
    </Box>
  );
}

//
