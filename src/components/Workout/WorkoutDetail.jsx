import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Alert, Button, Stack } from "@mui/material";
import { StatusAlertService } from "react-status-alert";
import useUserTraining from "../../hooks/useUserTraining";
import useWorkoutDetail from "../../hooks/useWorkoutDetails";

import WorkoutHeader from "./WorkoutHeader";
import ExerciseList from "./ExerciseList";
import AddExerciseDialog from "./AddExerciseDialog";
import AddTrainingDialog from "./AddTrainingDialog";

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getUserDataTraining, getAllExercises, getAllTrainings } =
    useUserTraining();

  const handleGoBack = () => {
    const source = searchParams.get("source");

    if (source === "profileUser") {
      navigate("/student/profile");
    } else {
      navigate(-1);
    }
  };

  const {
    training,
    exercises,
    loading,
    error,
    isSaving,
    allExercises,
    allTrainings,
    isAddExerciseOpen,
    isAddTrainingOpen,
    fetchTrainingData,
    handleSerieChange,
    handleAdjustSerie,
    handleAddSerie,
    handleRemoveSerie,
    handleAddExercise,
    handleAddTraining,
    handleDeleteExercise,
    handleSaveChanges,
    setIsAddExerciseOpen,
    setIsAddTrainingOpen,
  } = useWorkoutDetail(
    id,
    getUserDataTraining,
    getAllExercises,
    getAllTrainings,
  );

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
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleGoBack}>
          back
        </Button>
      </Stack>

      <ExerciseList
        exercises={exercises}
        onAddExercise={() => setIsAddExerciseOpen(true)}
        onSerieChange={handleSerieChange}
        onAdjustSerie={handleAdjustSerie}
        onAddSerie={handleAddSerie}
        onRemoveSerie={handleRemoveSerie}
        onDeleteExercise={handleDeleteExercise}
        trainingObject={training}
      />

      <AddExerciseDialog
        open={isAddExerciseOpen}
        onClose={() => setIsAddExerciseOpen(false)}
        onAdd={handleAddExercise}
        exercisesList={allExercises}
        idUserTraining={id}
        existingExercises={exercises}
      />

      <AddTrainingDialog
        open={isAddTrainingOpen}
        onClose={() => setIsAddTrainingOpen(false)}
        onAdd={handleAddTraining}
        trainingsList={allTrainings}
        existingTraining={training?.id}
      />
      <WorkoutHeader
        training={training}
        isSaving={isSaving}
        onAddTraining={() => setIsAddTrainingOpen(true)}
        onAddExercise={() => setIsAddExerciseOpen(true)}
        onSave={handleSaveChanges}
      />
    </Box>
  );
}
