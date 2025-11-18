import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../Screens/Auth/Login/Login.jsx";
import LoginPage from "../../Screens/Auth/Login/LoginPage.jsx";
import RegisterPage from "../../Screens/Auth/Register/RegisterPage.jsx";
import Register from "../../Screens/Auth/Register/Register.jsx";
import Article from "./Article.jsx";
import Calendar from "../Calendar/Calendar.jsx";

import ExerciseMenuList from "../../Screens/ExerciseMenuTiles.jsx";
import CreateNewTraining from "../Trening/CreateTrening.jsx";
import CreateExercise from "../Exercise/CreateExercise.jsx";
import EditTrening from "../Trening/EditTrening.jsx";
import EditExercise from "../Exercise/EditExercise.jsx";
import TrainingScreen from "../../Screens/Training/TrainingScreen.jsx";
import CreateWorkout from "../Trening/CreateWorkout.jsx";
import TrainerCalendar from "../Calendar/TrainerCalendar.jsx";
import WorkoutDetail from "../Trening/WorkoutDetail.jsx";
import { useUserContext } from "../User/context.jsx";

function Section() {
  const { logged } = useUserContext();
  return (
    <div
      style={{
        paddingTop: "2rem",
        position: "relative",
      }}
    >
      <Routes>
        <Route path="" element={<Article />}></Route>
        <Route path="about/*" element={<div>About me</div>}></Route>
        <Route path="login/*" element={<LoginPage />}></Route>
        <Route path="register/*" element={<RegisterPage />}></Route>
        <Route path="logout/*" element={<LoginPage />}></Route>
        <Route
          path="menu/create/trening/*"
          element={<CreateNewTraining />}
        ></Route>
        <Route
          path="menu/create/exercise/*"
          element={<CreateExercise />}
        ></Route>
        <Route path="menu/*" element={<ExerciseMenuList />}></Route>
        <Route path="menu/edit/trening" element={<EditTrening />}></Route>
        <Route path="menu/edit/exercise" element={<EditExercise />}></Route>

        <Route path="training/*" element={<TrainingScreen />}></Route>
        <Route path="schedule/" element={<TrainerCalendar />}></Route>
        <Route path="training/details/:id" element={<WorkoutDetail />}></Route>
      </Routes>
    </div>
  );
}
export default Section;
