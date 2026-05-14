import React from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({ setPickerOpen, buttonSize = 56 }) {
  return (
    <Box sx={{ display: "flex", justifySelf: "center" }}>
      <Fab
        color="success"
        onClick={setPickerOpen}
        sx={{ width: buttonSize, height: buttonSize }}
      >
        <AddIcon sx={{ fontSize: buttonSize * 0.6 }} />
      </Fab>
    </Box>
  );
}
