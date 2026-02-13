import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../components/User/context";

import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../Screens/Auth/Login/LoginPage";
import RegisterPage from "../Screens/Auth/Register/RegisterPage";
import Article from "../components/Section/Article";
import TrainingScreen from "../Screens/Training/TrainingScreen";
import TrainerCalendar from "../components/Calendar/TrainerCalendar";
import MenuScreen from "../components/Menu/MenuScreen";
import WorkoutDetail from "../components/Workout/WorkoutDetail";
import { StudentsPage } from "../Screens/Student/StudentPage";
import ClientTrainingScreen from "../Screens/Client/ClientTrainingScreen";

import MenuLayout from "../components/Layout/MenuLayout";

export default function AppRoutes() {
  const { logged } = useUserContext();
  const Forbidden = () => <h1>403 – Brak uprawnień</h1>;

  return (
    <Routes>
      <Route path="" element={<Article />}></Route>
      <Route path="about/*" element={<div>About me</div>}></Route>
      <Route path="login/*" element={<LoginPage />}></Route>
      <Route path="register/*" element={<RegisterPage />}></Route>
      <Route path="logout/*" element={<LoginPage />}></Route>

      <Route path="/403" element={<Forbidden />} />
      <Route
        path="training/*"
        element={
          <ProtectedRoute requireTrainer>
            <TrainingScreen />
          </ProtectedRoute>
        }
      ></Route>
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
          <ProtectedRoute requireTrainer>
            <WorkoutDetail />
          </ProtectedRoute>
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
            <StudentsPage />
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

      <Route path="clienttraining/" element={<ClientTrainingScreen />} />
    </Routes>
  );
}
