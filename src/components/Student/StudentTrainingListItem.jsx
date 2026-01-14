import { useState } from "react";
import {
  Box,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItemButton,
  Chip,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import StudentExerciseItem from "./StudentExerciseItem";
import ListOfExercise from "../../features/exercise/ListOfExercise";

export default function TrainingListItem({ training }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const trainingDate = new Date(training.training_date).toLocaleDateString(
    "pl-PL"
  );

  const trainingTime = training.training_date.split("T")[1].slice(0, 5);

  const exercisesCount = training.user_exercises?.length || 0;

  const handleNavigate = () => {
    navigate(`/training/details/${training.id}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ListItem
        sx={{
          mb: 1,
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": { backgroundColor: "#f5f5f5" },
          flexWrap: "wrap",
        }}
      >
        <ListItemText
          sx={{ flex: 1 }}
          primary={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Trening
              </Typography>
              <Typography variant="body2" color="textSecondary">
                (ID: {training.id})
              </Typography>
            </Box>
          }
          secondary={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                mt: 1,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                📅 Data: {trainingDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ⏰ Czas: {trainingTime}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                💪 Ćwiczenia: {exercisesCount}
              </Typography>
            </Box>
          }
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          {exercisesCount > 0 && (
            <IconButton
              onClick={handleExpandClick}
              sx={{
                color: "info.main",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
              title={expanded ? "Ukryj ćwiczenia" : "Pokaż ćwiczenia"}
            >
              {expanded ? (
                <ExpandLessIcon sx={{ fontSize: 24 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 24 }} />
              )}
            </IconButton>
          )}

          <IconButton
            onClick={handleNavigate}
            sx={{
              color: "primary.main",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
            title="Szczegóły treningu"
          >
            <FitnessCenterIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
      </ListItem>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            mb: 2,
            ml: 2,
            mr: 2,
            p: 2,
            backgroundColor: "#fafafa",
            borderRadius: 1,
            border: "1px solid #e8e8e8",
          }}
        >
          {exercisesCount === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontStyle: "italic" }}
            >
              📭 Brak ćwiczeń przypisanych do tego treningu
            </Typography>
          ) : (
            <ListOfExercise listOfExercise={training.user_exercises} />
          )}
        </Box>
      </Collapse>
    </>
  );
}
