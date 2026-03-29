import React, { useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";

import ExerciseTrainingRow from "./ExerciseTrainingRow";
import ExerciseFilters from "./ExerciseFilters";

// 🔥 helper OUTSIDE
const getMuscleGroups = exercise => {
  if (!exercise?.muscle_group) return ["Inne"];
  return exercise.muscle_group.map(m => m.name);
};

export default function ExerciseTrainingList({
  exercises,
  onAdd,
  search,
  setSearch,
  selectedExercises = [],
  onOpenTraining,
}) {
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  // 🔥 OPTIONS
  const muscleOptions = useMemo(() => {
    const set = new Set();
    exercises.forEach(e => getMuscleGroups(e).forEach(g => set.add(g)));
    return Array.from(set);
  }, [exercises]);

  // 🔥 FILTER
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

  // 🔥 GROUP
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
    <Box sx={{ width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
      {/* SEARCH */}
      <TextField
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Szukaj ćwiczeń..."
        sx={{ mb: 2 }}
      />

      {/* 🔥 FILTER COMPONENT */}
      <ExerciseFilters
        muscleOptions={muscleOptions}
        selectedMuscles={selectedMuscles}
        setSelectedMuscles={setSelectedMuscles}
      />

      {/* ROWS */}
      {Object.entries(grouped).map(([group, list]) => (
        <ExerciseTrainingRow
          key={group}
          title={group}
          list={list}
          onAdd={onAdd}
        />
      ))}

      {/* 🔥 FLOAT BUTTON */}
      <FloatingTrainingButton
        count={selectedExercises.length}
        onClick={onOpenTraining}
      />
    </Box>
  );
}

function FloatingTrainingButton({ count, onClick }) {
  if (count === 0) return null;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        bgcolor: "primary.main",
        color: "white",
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      {count}
    </Box>
  );
}
