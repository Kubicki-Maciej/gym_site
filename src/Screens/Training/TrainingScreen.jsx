import React from "react";
import MenuCard from "../../components/Cards/MenuCard";
import EditIcon from "@mui/icons-material/Edit";
import { Route, Routes } from "react-router-dom";
import UserAddTraning from "./Froms/UserAddTraning";
import CreateWorkout from "../../components/Trening/CreateWorkout";

import { Box, Grid, Button, Typography, Paper } from "@mui/material";
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
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Routes>
          <Route path="createusertraining" element={<UserAddTraning />} />
          <Route path="createworkout" element={<CreateWorkout />} />
        </Routes>
      </Box>
    </Box>
  );
}
