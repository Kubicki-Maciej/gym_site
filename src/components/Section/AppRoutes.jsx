import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../Screens/Auth/Login/Login.jsx";
import Register from "../../Screens/Auth/Register/Register.jsx";
import Article from "./Article.jsx";
import Calendar from "../Calendar/Calendar.jsx";

import ExerciseMenuList from "../../Screens/ExerciseMenuTiles.jsx";
import CreateNewTraining from "../Trening/CreateTrening.jsx";
import CreateExercise from "../Exercise/CreateExercise.jsx";
import EditTrening from "../Trening/EditTrening.jsx";
import EditExercise from "../Exercise/EditExercise.jsx";
import TrainingScreen from "../../Screens/Training/TrainingScreen.jsx";
import UserAddTraning from "../../Screens/Training/Froms/UserAddTraning.jsx";
// context
import { UserContext } from "../User/context.jsx";

function Section() {
  const [userLogged, setUserLogged] = useContext(UserContext);
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Routes>
        <Route path="" element={<Article />}></Route>
        <Route path="about/*" element={<div>About me</div>}></Route>
        <Route path="login/*" element={<Login />}></Route>
        <Route path="login/register/*" element={<Register />}></Route>
        <Route path="logout/*" element={<Login />}></Route>
        {/* Tiles Menu */}
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
        {/* Tiles Menu End*/}
      </Routes>
    </div>
  );
}
export default Section;
