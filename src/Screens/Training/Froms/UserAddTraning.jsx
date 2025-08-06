import React, { useState } from "react";
import GetUsers from "../../../components/User/Component/GetUsers";
import GetTraining from "../../../components/Trening/GetTraining";
import ExerciseList from "../../../components/Exercise/ExerciseList";
import ExerciseMuscleCounter from "../../../components/Exercise/ExerciseMuscleCounter";
import axios from "axios";
export default function UserAddTraning() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [exercises, setExercises] = useState([]);

  const handleUserSelect = user => {
    setSelectedUser(user);
    console.log("Wybrany użytkownik:", user);
  };
  const handleTrainingSelect = training => {
    setSelectedUser(training);
    setExercises(training.exercise_groups);
    console.log(exercises);
    console.log("Wybrany trening:", training);
  };
  const handleAddExercise = exercise => {
    setExercises(prev => [...prev, exercise]);
  };
  const handleRemoveExercise = id => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };
  return (
    <div>
      <ExerciseMuscleCounter exercises={exercises} />
      <GetUsers onUserSelect={handleUserSelect} />
      <GetTraining onTrainingSelect={handleTrainingSelect} />
      <ExerciseList
        exercises={exercises}
        onAddExercise={handleAddExercise}
        onRemoveExercise={handleRemoveExercise}
      />
      {/* Jednorazowy trening czy cykliczny  */}

      {/* <GetUsers onUserSelect={handleUserSelect} /> */}
      {/* <ExerciseCard text={"przykladowe cwiczenie"} btnText={"przykald"} /> */}
    </div>
  );
}
