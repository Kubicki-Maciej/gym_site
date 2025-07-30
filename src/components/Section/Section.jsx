import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

// import elements
import Login from "../Login/Login";
import Register from "../Register/Register";
import Article from "./Article";
import Calendar from "../Calendar/Calendar";
import ExerciseScreen from "../Exercise/ExerciseMainScreen";
import CreateNewTrening from "../Exercise/CreateNewTrening";
import CreateExercise from "../Exercise/CreateExercise";

import ExerciseMenuList from "../../Screens/ExerciseMenuList.js";
import TrainingForm from "../../Screens/CreateTrening.js";
import CreateNewTraining from "../../Screens/CreateTrening.js";
import CreateExerciseForm from "../../Screens/CreateExerciseForm.js";
import EditTrening from "../Trening/EditTrening.jsx";
import EditExercise from "../Exercise/EditExercise.jsx";
// context
import { UserContext } from "../User/context";

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
        {/* new trening create*/}
        <Route
          path="menu/create/trening/*"
          element={<CreateNewTraining />}
        ></Route>
        {/* new exercise create */}
        <Route
          path="menu/create/exercise/*"
          element={<CreateExerciseForm />}
        ></Route>
        {/* menu */}
        <Route path="menu/*" element={<ExerciseMenuList />}></Route>
        {/* edit trening */}
        <Route path="menu/edit/trening" element={<EditTrening />}></Route>
        {/* edit exercise */}
        <Route path="menu/edit/exercise" element={<EditExercise />}></Route>

        {/* old to delete */}
        <Route path="exercise/*" element={<ExerciseScreen />}></Route>
        <Route
          path="exercise/createnewtrening/*"
          element={<CreateNewTrening />}
        ></Route>
        <Route
          path="exercise/createnewtrening/createexercise/*"
          element={<CreateExercise />}
        ></Route>
        {/*  */}
      </Routes>
    </div>
  );
}

export default Section;
