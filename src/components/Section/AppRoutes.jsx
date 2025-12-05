import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../User/context.jsx";

import LoginPage from "../../Screens/Auth/Login/LoginPage.jsx";
import RegisterPage from "../../Screens/Auth/Register/RegisterPage.jsx";
import Article from "./Article.jsx";
import TrainingScreen from "../../Screens/Training/TrainingScreen.jsx";
import TrainerCalendar from "../Calendar/TrainerCalendar.jsx";
import MenuScreen from "../Menu/MenuScreen.jsx";

import StudentProfileScreen from "../../Screens/StudentProfileScreen.jsx";
import WorkoutDetail from "../Workout/WorkoutDetail.jsx";
import ExercisesPage from "../../Screens/ExercisePage.jsx";



import { useState } from 'react';
// import CardContainer from "../Cards/CardContainer"
import CardContainer from "../Cards/CardContainer.jsx";
import CardElement from "../Cards/CardElement";
export default function Section() {
  const { logged } = useUserContext();
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Routes>
        <Route path="" element={<Article />}></Route>
        <Route path="about/*" element={<div>About me</div>}></Route>
        <Route path="login/*" element={<LoginPage />}></Route>
        <Route path="register/*" element={<RegisterPage />}></Route>
        <Route path="logout/*" element={<LoginPage />}></Route>

        <Route path="training/*" element={<TrainingScreen />}></Route>
        <Route path="schedule/" element={<TrainerCalendar />}></Route>
        <Route path="training/details/:id" element={<WorkoutDetail />}></Route>
        <Route
          path="trainingmenu/*"
          element={<MenuScreen sideBarName={"training"} />}
        />
        <Route
          path="clientsmenu/*"
          element={<MenuScreen sideBarName={"clients"} />}
        />
        <Route
          path="student/*"
          element={<MenuScreen sideBarName={"student"} />}
        />
        {/* <exerciseRoute/> */}
       <Route
        path="test/"
        element={<ExercisesPage />}
        />
      </Routes>
    </div>
  );
}

