import React, { useState } from "react";
import GetTraining from "./GetTraining";
import ExerciseList from "../Exercise/ExerciseList";
import ExerciseMuscleCounter from "../Exercise/ExerciseMuscleCounter";

export default function SingleTraining({ onTrainingChange, userSelected }) {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [exercises, setExercises] = useState([]);

  // Gdy wybierzesz trening, ustaw ćwiczenia z tego treningu
  const handleTrainingSelect = training => {
    setSelectedTraining(training);
    setExercises(training?.exercise_groups || []);
    onTrainingChange?.({
      training,
      exercises: training?.exercise_groups || [],
    });
  };

  // Dodawanie ćwiczenia
  const handleAddExercise = exercise => {
    setExercises(prev => {
      const newExercises = [...prev, exercise];
      onTrainingChange?.({
        training: selectedTraining,
        exercises: newExercises,
      });
      return newExercises;
    });
  };

  // Usuwanie ćwiczenia
  const handleRemoveExercise = id => {
    setExercises(prev => {
      const newExercises = prev.filter(ex => ex.id !== id);
      onTrainingChange?.({
        training: selectedTraining,
        exercises: newExercises,
      });
      return newExercises;
    });
  };

  return (
    <div>
      <ExerciseMuscleCounter exercises={exercises} />
      <GetTraining onTrainingSelect={handleTrainingSelect} />
      <ExerciseList
        exercises={exercises}
        onAddExercise={handleAddExercise}
        onRemoveExercise={handleRemoveExercise}
        userSelected={userSelected}
      />
    </div>
  );
}
