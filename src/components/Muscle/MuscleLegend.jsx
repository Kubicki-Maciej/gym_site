import React from "react";
import { Box, Typography } from "@mui/material";

export default function MuscleLegend() {
  return (
    <Box sx={{ mt: 4, display: "flex", gap: 3, justifyContent: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{ width: 20, height: 20, bgcolor: "#ffcccc", borderRadius: 1 }}
        />
        <Typography variant="body2">Niska aktywność</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{ width: 20, height: 20, bgcolor: "#ff6666", borderRadius: 1 }}
        />
        <Typography variant="body2">Średnia aktywność</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{ width: 20, height: 20, bgcolor: "#ff0000", borderRadius: 1 }}
        />
        <Typography variant="body2">Wysoka aktywność</Typography>
      </Box>
    </Box>
  );
}
