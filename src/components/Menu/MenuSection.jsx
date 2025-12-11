import { Routes, Route } from "react-router-dom";

import UserAddTraining from "../../Screens/Training/Forms/UserAddTraining";
import CreateWorkout from "../Trening/CreateWorkout";
import UserProfile from "../../features/users/components/UserProfile";
import { StudentsPage } from "../../features/students/pages/StudentPage";

import EditTrening from "../Trening/EditTrening";
import CreateExercise from "../Exercise/CreateExercise";
import CreateNewTraining from "../Trening/CreateTrening";

import StudentProfileScreen from "../../Screens/StudentProfileScreen";
import StudentNextTraining from "../Student/StudentNextTraining";
import StudentTrainingsScreen from "../Student/StudentTrainingsScreen";

export default function MenuSection({ sideBarName }) {
  return (
    <>
      <Routes>
        {/* training */}
        <Route path="training/create" element={<CreateNewTraining />} />
        <Route path="training/edit" element={<EditTrening />} />
        <Route path="exercise/create" element={<CreateExercise />} />

        {/* my clients */}
        <Route path="plan/create" element={<UserAddTraining />} />
        <Route path="workout/create" element={<CreateWorkout />} />
        <Route path="students" element={<StudentsPage />} />

        {sideBarName === "clients" && (
          <Route path="" element={<StudentsPage />} />
        )}
        <Route path="userprofile" element={<UserProfile />} />

        <Route path="profile" element={<StudentProfileScreen />} />
        <Route path="nextworkout" element={<StudentNextTraining />} />
        <Route path="meetings" element={<StudentTrainingsScreen />} />
      </Routes>
    </>
  );
}
