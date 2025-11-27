import React from "react";

export default function ButtonMobileTraining({ icon, handleClick }) {
  return (
    <IconButton
      color="inherit"
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.2)",
          background: "rgba(255,255,255,0.2)",
        },
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
      onClick={() => console.log("Clicked")}
    >
      <AddIcon />
    </IconButton>
  );
}
