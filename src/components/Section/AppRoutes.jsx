import { Route, Routes } from "react-router-dom";

import LoginPage from "../../Screens/Auth/Login/LoginPage.jsx";
import RegisterPage from "../../Screens/Auth/Register/RegisterPage.jsx";

import Article from "./Article.jsx";

import TrainingScreen from "../../Screens/Training/TrainingScreen.jsx";

import TrainerCalendar from "../Calendar/TrainerCalendar.jsx";
import WorkoutDetail from "../Trening/WorkoutDetail.jsx";
import { useUserContext } from "../User/context.jsx";
import MenuScreen from "../Menu/MenuScreen.jsx";

// import Calendar from "../Calendar/Calendar.jsx";

// import Login from "../../Screens/Auth/Login/Login.jsx";
// import Register from "../../Screens/Auth/Register/Register.jsx";
// import CreateWorkout from "../Trening/CreateWorkout.jsx";
function Section() {
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
      </Routes>
    </div>
  );
}
export default Section;
