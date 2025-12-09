import {
  Box,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";

export default function TrainingListItem({ training }) {
  const navigate = useNavigate();

  // ✅ Formatuj datę
  const trainingDate = new Date(training.training_date).toLocaleDateString(
    "pl-PL"
  );

  // ✅ Wyciągnij godzinę z training_date (Po "T")
  const trainingTime = training.training_date.split("T")[1].slice(0, 5); // HH:MM

  // ✅ Liczba ćwiczeń
  const exercisesCount = training.user_exercises?.length || 0;

  // ✅ Nawigacja do treningu
  const handleNavigate = () => {
    navigate(`/training/details/${training.id}`);
  };

  return (
    <ListItem
      sx={{
        mb: 1,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:hover": { backgroundColor: "#f5f5f5" },
      }}
    >
      <ListItemText
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

      {/* ✅ PRAWA STRONA - IKONA HANTLE */}
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
      >
        <FitnessCenterIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </ListItem>
  );
}
