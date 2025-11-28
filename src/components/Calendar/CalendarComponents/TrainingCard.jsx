import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrainingCard({ event, timeText, view }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Użyj window.location.href lub navigate
    window.location.href = `/training/details/${event.id}`;
    // Lub jeśli preferujesz navigate:
    // navigate(`/training/details/${event.id}`);
  };

  // Formatowanie daty
  const getFormattedTime = () => {
    if (timeText) return timeText;
    if (event.start) {
      return new Date(event.start).toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1976d2",
        color: "white",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#1565c0",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
        },
        userSelect: "none",
      }}
    >
      <CardContent sx={{ padding: 1, flex: 1, "&:last-child": { pb: 1 } }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            marginBottom: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {event.title} {getFormattedTime()}
        </Typography>
      </CardContent>
    </Card>
  );
}
