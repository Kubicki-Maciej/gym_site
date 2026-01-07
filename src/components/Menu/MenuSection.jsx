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
import StudentCreateTraining from "../Student/StudentCreateTraining";

import MenuRoutes from "../../router/MenuRoutes";

export default function MenuSection({ sideBarName }) {
  return <MenuRoutes sideBarName={sideBarName} />;
}
