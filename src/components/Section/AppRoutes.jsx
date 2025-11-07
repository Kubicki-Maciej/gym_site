import React, { useContext } from "react";
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
import UserAddTraning from "../../Screens/Training/Froms/UserAddTraning.jsx";
import CreateWorkout from "../Trening/CreateWorkout.jsx";
import TrainerCalendar from "../Calendar/TrainerCalendar.jsx";
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
        <Route path="login/*" element={<LoginPage />}></Route>
        <Route path="register/*" element={<RegisterPage />}></Route>
        <Route path="logout/*" element={<LoginPage />}></Route>
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
        {/* Tiles training */}
        <Route path="training/*" element={<TrainingScreen />}></Route>
        <Route path="test/" element={<TrainerCalendar />}></Route>
      </Routes>
    </div>
  );
}
export default Section;

// {
//   "type": "jednorazowe",
//   "date": "2025-11-20T23:00:00.000Z",
//   "time": "12:00",
//   "duration": "60"
// }

// {
//   "type": "cykliczne",
//   "  ": [
//     {
//       "date": "2025-11-10T00:00:00.000Z",
//       "duration": "60"
//     },
//     {
//       "date": "2025-11-11T01:00:00.000Z",
//       "duration": "60"
//     },
//     {
//       "date": "2025-11-12T02:00:00.000Z",
//       "duration": "60"
//     }
//   ]
// }
