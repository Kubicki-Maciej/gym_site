import { useState } from "react";

import useUser from "../../hooks/useUser";

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
    const workouts = await getTrainerStudents(user.id);

    setUser(user);
  };

  const handleSelectTraining = data => {
    setTraining(data);
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
