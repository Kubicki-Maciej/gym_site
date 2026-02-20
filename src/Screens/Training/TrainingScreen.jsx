import React from "react";
import MenuCard from "../../components/Cards/MenuCard";
import EditIcon from "@mui/icons-material/Edit";
import { Route, Routes } from "react-router-dom";
import UserAddTraining from "./Forms/UserAddTraining";
import CreateWorkout from "../../components/Trening/CreateWorkout";
import UserProfile from "../../features/users/components/UserProfile";

import { Box } from "@mui/material";
export default function TrainingScreen() {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        sx={{
          padding: 2,
          boxShadow: "2px 0 5px rgba(0,0,0,0.1a)",
        }}
      >
        <MenuCard
          Icon={EditIcon}
          text={"Dodaj użytkownikowi plan treningowy"}
          btnText={"Dodaj plan"}
          colorFullBoolean={true}
          path={"createusertraining"}
        />
        <MenuCard
          Icon={EditIcon}
          text={"Dodaj użytkownikowi trening"}
          btnText={"Dodaj trening"}
          colorFullBoolean={true}
          path={"createworkout"}
        />
        <MenuCard
          Icon={EditIcon}
          text={"Profil użytkownika"}
          btnText={"Przejdz"}
          colorFullBoolean={true}
          path={"userprofile"}
        />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Routes>
          <Route path="createusertraining" element={<UserAddTraining />} />
          <Route path="createworkout" element={<CreateWorkout />} />
          <Route path="userprofile" element={<UserProfile />} />
        </Routes>
      </Box>
    </Box>
  );
}
