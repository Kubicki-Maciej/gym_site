import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import UserAddTraining from "../Screens/Training/Forms/UserAddTraining";
import CreateWorkout from "../components/Trening/CreateWorkout";
import UserProfile from "../features/users/components/UserProfile";
import { StudentsPage } from "../Screens/Student/StudentPage";
import EditTrening from "../components/Trening/EditTrening";
import CreateExercise from "../components/Exercise/CreateExercise";
import CreateNewTraining from "../components/Trening/CreateTrening";
import StudentProfileScreen from "../Screens/Student/StudentProfileScreen";
import StudentTrainingsScreen from "../components/Student/StudentTrainingsScreen";
import StudentNextTraining from "../components/Student/StudentNextTraining";
import StudentCreateTraining from "../components/Student/StudentCreateTraining";
import StudentProgressScreen from "../Screens/Statistic/StudentProgressScreen";

export default function MenuRoutes({ sideBarName }) {
  return (
    <>
      <Routes>
        {/* training */}

        <Route
          path="training/create"
          element={
            <ProtectedRoute requireTrainer>
              <CreateNewTraining />
            </ProtectedRoute>
          }
        />
        <Route
          path="training/edit"
          element={
            <ProtectedRoute requireTrainer>
              <EditTrening />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise/create"
          element={
            <ProtectedRoute requireTrainer>
              <CreateExercise />
            </ProtectedRoute>
          }
        />

        {/* my clients */}
        <Route
          path="plan/create"
          element={
            <ProtectedRoute requireTrainer>
              <UserAddTraining />
            </ProtectedRoute>
          }
        />
        <Route
          path="workout/create"
          element={
            <ProtectedRoute requireTrainer>
              <CreateWorkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="students"
          element={
            <ProtectedRoute requireTrainer>
              <StudentsPage />
            </ProtectedRoute>
          }
        />

        {sideBarName === "clients" && (
          <Route
            path=""
            element={
              <ProtectedRoute requireTrainer>
                <StudentsPage />
              </ProtectedRoute>
            }
          />
        )}
        <Route
          path="userprofile"
          element={
            <ProtectedRoute requireTrainer>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="create"
          element={
            <ProtectedRoute requireTrainer>
              <StudentCreateTraining />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute requireTrainer>
              <StudentProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="nextworkout"
          element={
            <ProtectedRoute requireTrainer>
              <StudentNextTraining />
            </ProtectedRoute>
          }
        />
        <Route
          path="meetings"
          element={
            <ProtectedRoute requireTrainer>
              <StudentTrainingsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="statistics"
          element={
            <ProtectedRoute requireTrainer>
              <StudentProgressScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
