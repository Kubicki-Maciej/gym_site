import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Alert } from "@mui/material";
import { StatusAlertService } from "react-status-alert";
import useUserTraining from "../../hooks/useUserTraining";
import useWorkoutDetail from "./hooks/useWorkoutDetails";

import WorkoutHeader from "./WorkoutHeader";
import ExerciseList from "./ExerciseList";
import AddExerciseDialog from "./AddExerciseDialog";

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserDataTraining, getAllExercises } = useUserTraining();

  const {
    training,
    exercises,
    loading,
    error,
    isSaving,
    allExercises,
    isAddExerciseOpen,
    fetchTrainingData,
    handleSerieChange,
    handleAdjustSerie,
    handleAddSerie,
    handleRemoveSerie,
    handleAddExercise,
    handleDeleteExercise,
    handleSaveChanges,
    setIsAddExerciseOpen,
  } = useWorkoutDetail(id, getUserDataTraining, getAllExercises);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!training)
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Trening nie został znaleziony</Alert>
      </Box>
    );

  return (
    <Box sx={{ p: 2 }}>
      <WorkoutHeader
        training={training}
        isSaving={isSaving}
        onSave={handleSaveChanges}
        onCancel={() => navigate(-1)}
      />

      <ExerciseList
        exercises={exercises}
        onAddExercise={() => setIsAddExerciseOpen(true)}
        onSerieChange={handleSerieChange}
        onAdjustSerie={handleAdjustSerie}
        onAddSerie={handleAddSerie}
        onRemoveSerie={handleRemoveSerie}
        onDeleteExercise={handleDeleteExercise}
      />

      <AddExerciseDialog
        open={isAddExerciseOpen}
        onClose={() => setIsAddExerciseOpen(false)}
        onAdd={handleAddExercise}
        exercisesList={allExercises}
        idUserTraining={id}
        existingExercises={exercises}
      />
    </Box>
  );
}
