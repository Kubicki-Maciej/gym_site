import React from "react";
import MenuCard from "../Cards/MenuCard";
import { Routes, Route } from "react-router-dom";

import UserAddTraining from "../../Screens/Training/Forms/UserAddTraining";
import CreateWorkout from "../Trening/CreateWorkout";
import UserProfile from "../../features/users/components/UserProfile";
import { StudentsPage } from "../../features/students/pages/StudentPage";

import EditTrening from "../Trening/EditTrening";
import CreateExercise from "../Exercise/CreateExercise";
import EditExercise from "../Exercise/EditExercise";
import CreateNewTraining from "../Trening/CreateTrening";

// import UserAddTraining from "./Forms/UserAddTraining";
// import CreateWorkout from "../../components/Trening/CreateWorkout";
// import UserProfile from "../../features/users/components/UserProfile";

export default function MenuSection() {
  return (
    <>
      <Routes>
        {/* training */}
        <Route path="training/create" element={<CreateNewTraining />} />
        <Route path="training/edit" element={<EditTrening />} />
        <Route path="exercise/create" element={<CreateExercise />} />
        <Route path="exercise/edit" element={<EditExercise />} />
        {/* my clients */}
        <Route path="plan/create" element={<UserAddTraining />} />
        <Route path="workout/create" element={<CreateWorkout />} />

        <Route path="student" element={<StudentsPage />} />
        <Route path="userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}
