import React from "react";
import { Paper } from "@mui/material";

export default function CardStatisticElement({ children }) {
  return (
    <Paper
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {children}
    </Paper>
  );
}
