import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../components/User/context";

import { ProtectedRoute, ProtectedTrainingRoute } from "./ProtectedRoute";

import LoginPage from "../Screens/Auth/Login/LoginPage";
import RegisterPage from "../Screens/Auth/Register/RegisterPage";

import TrainerCalendar from "Screens/Calendar/TrainerCalendar";

import WorkoutDetail from "../components/Workout/WorkoutDetail";
import { TrainerStudentPage } from "../Screens/Trainer/TrainerStudentPage";
import ClientTrainingScreen from "../Screens/Client/ClientTrainingScreen";
import BodyStatsPage from "Screens/Student/BodyStatsPage";
import AboutUsArticle from "components/Section/AboutUsArticle";
import MenuLayout from "../components/Layout/MenuLayout";
import TestArticle from "components/Section/TestArticle";

import UserSettingsScreen from "Screens/Settings/UserSettingsScreen";
import FitAppScreen from "Screens/FitApp/FitAppScreen";

export default function AppRoutes() {
  const { logged } = useUserContext();
  const Forbidden = () => <h1>403 – Brak uprawnień</h1>;

  return (
    <Routes>
      <Route path="" element={<TestArticle />}></Route>
      <Route path="about/*" element={<AboutUsArticle />}></Route>
      <Route path="login/*" element={<LoginPage />}></Route>
      <Route path="register/*" element={<RegisterPage />}></Route>
      <Route path="logout/*" element={<LoginPage />}></Route>

      <Route path="/403" element={<Forbidden />} />
      <Route
        path="schedule/"
        element={
          <ProtectedRoute requireTrainer>
            <TrainerCalendar />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="training/details/:id"
        element={
          <ProtectedTrainingRoute requireTrainer>
            <WorkoutDetail />
          </ProtectedTrainingRoute>
        }
      ></Route>
      <Route
        path="trainingmenu/*"
        element={
          <ProtectedRoute requireTrainer>
            <MenuLayout sideBarName={"training"} />
          </ProtectedRoute>
        }
      />
      <Route
        path="clientsmenu/*"
        element={
          <ProtectedRoute requireTrainer>
            <TrainerStudentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="student/*"
        element={
          <ProtectedRoute requireTrainer>
            <MenuLayout sideBarName={"student"} />
          </ProtectedRoute>
        }
      />
      <Route
        path="student-training-menu/*"
        element={<MenuLayout sideBarName={"student-training"} />}
      />

      <Route path="settings" element={<UserSettingsScreen />} />

      <Route path="fitapp" element={<FitAppScreen />} />
      <Route path="student-measurements" element={<BodyStatsPage />} />
    </Routes>
  );
}
