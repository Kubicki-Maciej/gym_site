import React from "react";
import { Paper, Stack, Typography, Button, Chip, Box } from "@mui/material";

export default function TrainingCard({ event, timeText }) {
  const userId = event.extendedProps?.user_i;
  const duration = event.extendedProps?.duration;
  const trainingId = event.extendedProps?.training_id;

  function handleGoToTraining() {
    const publicId =
      event.extendedProps?.public_id ??
      event.extendedProps?.publicId ??
      event.extendedProps?.public ??
      event._def?.publicId ??
      event.id ??
      trainingId;

    if (!publicId) {
      console.warn("Brak publicId dla tego wydarzenia");
      return;
    }

    // prefer a navigation handler passed via event.extendedProps
    const go = event.extendedProps?.goToTraining;
    if (go && typeof go === "function") {
      go(publicId);
      return;
    }

    // fallback to simple redirect
    if (typeof window !== "undefined") {
      window.location.href = `/training/details/${publicId}`;
    }
  }
  return (
    <Box elevation={1} sx={{ p: 1, display: "flex", alignItems: "center" }}>
      <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* <Typography variant="caption" color="text.secondary"> */}
          {timeText}
          {/* </Typography> */}
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {event.title}
          </Typography>
        </Box>
        <Button size="small" color="white" onClick={handleGoToTraining}>
          Przejdź
        </Button>
      </Stack>
    </Box>
  );
}
