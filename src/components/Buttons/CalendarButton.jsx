import React from "react";
import { IconButton, Tooltip } from "@mui/material";

export default function CalendarButton({ icon, onClick, tooltip }) {
  return (
    <Tooltip title={tooltip || ""}>
      <IconButton
        // icon={icon}
        onClick={onClick}
        color="primary"
        size="medium"
        sx={{ border: "1px solid #ccc", margin: 0.5 }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
