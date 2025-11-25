import React, { useState } from "react";
import { API_URL } from "../../config";
import GetUsers from "../User/Component/GetUsers";

import useUser from "../User/hooks/useUser";

import Searcher from "../Core/Searcher";

import UserList from "../../features/users/components/UserList";

import {
  Delete as DeleteIcon,
  Add as AddIcon,
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
} from "@mui/icons-material";

export default function CreateWorkout() {
  const [user, setUser] = useState(null);
  const [training, setTraining] = useState(null);
  // const { getUpcomingUserWorkouts } = useUserTraining();
  const { error, loading, getTrainerStudents } = useUser();

  const handleUserSelect = async user => {
    console.log(user);
    const workouts = await getTrainerStudents(user.id);
    console.log(workouts);
    setUser(user);
  };

  const handleSelectTraining = data => {
    setTraining(data);
    console.log(data);
  };

  //show exercises from training

  return (
    <div>
      <p>CreateWorkoutForUser</p>

      <UserList />

      <Searcher
        dataOutput={handleSelectTraining}
        labelName="Szukaj treningu"
        apiAdress={`training/all`}
      />

      {user && (
        <div>
          <h3>
            Selected User: {user.spouse_name} {user.last_name}
          </h3>
        </div>
      )}

      <div>getUserTrening</div>
      <div>selectExercises</div>
      <button>createWorkout</button>
    </div>
  );
}
