import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Grid, Button, Typography, Paper } from "@mui/material";

export default function TrainingSection() {
  return (
    <Box>
      section
      <Routes>
        <Route path="training/createusertraining" />
      </Routes>
    </Box>
  );
}
