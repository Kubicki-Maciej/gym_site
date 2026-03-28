import React from "react";
import { Box, CircularProgress, Alert, Button, Stack } from "@mui/material";

import AddExerciseDialog from "components/Workout/AddExerciseDialog";
import AddTrainingDialog from "components/Workout/AddTrainingDialog";
import WorkoutHeader from "components/Workout/WorkoutHeader";
import useWorkoutDetail from "hooks/useWorkoutDetails";
import ExerciseList from "components/Workout/ExerciseList";

export default function StudentCreateWorkout({ trainingId }) {
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
    // fetchTrainingData,
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
    handleSerieUpdate,
  } = useWorkoutDetail(trainingId);

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
    <>
      <ExerciseList
        trainingDate={training.training_date}
        userName={training.user_name}
        exercises={exercises}
        onSerieChange={handleSerieChange}
        onAdjustSerie={handleAdjustSerie}
        onAddSerie={handleAddSerie}
        onRemoveSerie={handleRemoveSerie}
        onDeleteExercise={handleDeleteExercise}
        trainingObject={training}
        onSerieUpdate={handleSerieUpdate}
      />
      <AddExerciseDialog
        open={isAddExerciseOpen}
        onClose={() => setIsAddExerciseOpen(false)}
        onAdd={handleAddExercise}
        exercisesList={allExercises}
        idUserTraining={trainingId}
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
      />
    </>
  );
}
