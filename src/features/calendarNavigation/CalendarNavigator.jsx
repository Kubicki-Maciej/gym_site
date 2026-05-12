import React from "react";
import CalendarButton from "features/statistics/Buttons/CalendarButton";

import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export default function CalendarNavigator({ prev, next, year, month }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      <CalendarButton onClick={prev} icon={<ArrowBackIcon />} />
      {year} {month}
      <CalendarButton onClick={next} icon={<ArrowForwardIcon />} />
    </Box>
  );
}
