import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WeekdayInitialsStrip from "./WeekDayInitialsStrip";
import useUserUpcomingTraining from "../hooks/useUserUpcomingTraining";
import { useNavigate } from "react-router-dom";

export default function UserCard({ id, spouse_name, last_name }) {
  const { trainingList, loading, error } = useUserUpcomingTraining(id);
  // (trainingList);
  const navigate = useNavigate();
  const goToNextTraining = () => {
    if (trainingList) {
      navigate(`/training/details/${trainingList[0].id}`);
    }
  };
  if (!id) return;
  if (loading) return <Typography variant="body2">Ładowanie…</Typography>;
  if (error)
    return (
      <Typography variant="body2">Błąd ładowania treningów {error}</Typography>
    );
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        padding: 1,
        zIndex: 100,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
        <Avatar alt="Profile" sx={{ width: 62, height: 62, marginRight: 2 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {spouse_name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <WeekdayInitialsStrip trainingList={trainingList} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          icon={<PersonIcon sx={{ fontSize: 16 }} />}
          label="View Profile"
          variant="outlined"
          color="success"
        />
        <Button
          variant="text"
          sx={{ fontWeight: 600 }}
          onClick={goToNextTraining}
          disabled={!trainingList || trainingList.length === 0}
        >
          Najbliższy trening
        </Button>
      </Box>
    </Card>
  );
}
