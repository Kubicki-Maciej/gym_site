import React from "react";
import { Paper } from "@mui/material";

export default function MealCard(props) {
  return (
    <Paper key={props.key} onClick={props.onClick} sx={{ height: "100px" }}>
      {props.name}
    </Paper>
  );
}
