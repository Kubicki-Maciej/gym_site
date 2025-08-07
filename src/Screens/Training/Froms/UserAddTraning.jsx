import React, { useState, useEffect } from "react";
import axios from "axios";

import GetUsers from "../../../components/User/Component/GetUsers";
import GetTraining from "../../../components/Trening/GetTraining";
import ExerciseList from "../../../components/Exercise/ExerciseList";
import ExerciseMuscleCounter from "../../../components/Exercise/ExerciseMuscleCounter";
// import EventTypeSelector from "../../../components/Calendar/EventTypeSelector";

export default function UserAddTraning() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [boolUserSelected, setBoolUserSelected] = useState(false);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {}, [boolUserSelected]);

  const handleUserSelect = user => {
    setSelectedUser(user);
    if (user == null) {
      setBoolUserSelected(false);
    } else {
      setBoolUserSelected(true);
    }
    console.log("Wybrany użytkownik:", user);
    console.log(boolUserSelected);
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
        userSelected={boolUserSelected}
      />
      {/* <EventTypeSelector onChange={setEventData} /> */}

      {/* Jednorazowy trening czy cykliczny  */}

      {/* <GetUsers onUserSelect={handleUserSelect} /> */}
      {/* <ExerciseCard text={"przykladowe cwiczenie"} btnText={"przykald"} /> */}

      <pre>{JSON.stringify(eventData, null, 2)}</pre>
    </div>
  );
}
