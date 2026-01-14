import React from "react";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Box,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import { useMediaQuery } from "@mui/system";

export default function WorkoutHeader({
  training,
  isSaving,
  onSave,
  onAddExercise,
  onAddTraining,
  onCancel,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSaveAs = () => {
    ("SaveAs clicked");
  };

  const handleFitness = () => {
    ("Fitness clicked");
  };

  const handleAdd = () => {
    ("Add clicked");
  };

  if (isMobile) {
    return (
      <AppBar
        position="static"
        sx={{
          background: "transparent",
          borderRadius: "6px",
          // boxShadow: "none",
          borderBottom: "0px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton
            size="large"
            edge="start"
            sx={{
              color: "#2196F3", // Niebieski
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
                background: "rgba(33, 150, 243, 0.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
            onClick={onSave}
          >
            <SaveAsIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            sx={{
              color: "#FF9800", // Pomarańczowy
              transition: "all 0.3s ease",
              mr: 1,
              "&:hover": {
                transform: "scale(1.2)",
                background: "rgba(255, 152, 0, 0.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
            onClick={onAddTraining}
          >
            <FitnessCenterIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            sx={{
              color: "#4CAF50",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
                background: "rgba(76, 175, 80, 0.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
            onClick={onAddExercise}
          >
            <AddIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar
        position="static"
        sx={{
          background: "transparent",
          borderRadius: "6px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveAsIcon />}
            onClick={onSave}
            disabled={isSaving}
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{
                color: "#FF9800",
                borderColor: "#FF9800",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 152, 0, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={onAddTraining}
            >
              Dodaj Trening
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={onAddExercise}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Dodaj ćwiczenie
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}
