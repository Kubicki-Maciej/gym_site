import React, { useState } from "react";
import {
  Stack,
  Button,
  Box,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  Paper,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { useMediaQuery } from "@mui/system";
import TrainingHeatMapMuscle from "components/Trening/TrainingHeatMapMuscle";

export default function WorkoutHeader({
  training,
  isSaving,
  onSave,
  onAddExercise,
  onAddTraining,
  onCancel,
}) {
  console.log("training", training);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openBodyDialog, setOpenBodyDialog] = useState(false);

  const handleOpenBodyDialog = () => setOpenBodyDialog(true);
  const handleCloseBodyDialog = () => setOpenBodyDialog(false);

  const BodyDialog = () => (
    <Dialog
      open={openBodyDialog}
      onClose={handleCloseBodyDialog}
      maxWidth={false}
      PaperComponent={Paper}
      PaperProps={{
        elevation: 8,
        sx: {
          width: isMobile ? "90%" : 500,
          maxHeight: "90vh",
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Partie ciała
          </Typography>
          <IconButton onClick={handleCloseBodyDialog} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minHeight: 200 }}>
          <TrainingHeatMapMuscle
            trainingId={training?.id}
            userId={training?.user}
            dataTraining={training}
          />
        </Box>
      </Paper>
    </Dialog>
  );

  if (isMobile) {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            borderRadius: "6px",
            borderBottom: "0px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Toolbar sx={{ minHeight: 64, justifyContent: "space-between" }}>
            <IconButton
              size="large"
              edge="end"
              sx={{
                color: "#0044ff",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                  background: "rgba(76, 175, 80, 0.1)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
              onClick={handleOpenBodyDialog}
            >
              <AccessibilityNewIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              sx={{
                color: "#FF9800",
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

        <BodyDialog />
      </>
    );
  } else {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            borderRadius: "6px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Toolbar sx={{ minHeight: 64, justifyContent: "space-between" }}>
            <IconButton
              size="large"
              edge="end"
              sx={{
                color: "#0044ff",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                  background: "rgba(76, 175, 80, 0.1)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
              onClick={handleOpenBodyDialog}
            >
              <AccessibilityNewIcon sx={{ fontSize: 28 }} />
            </IconButton>
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

        <BodyDialog />
      </>
    );
  }
}
