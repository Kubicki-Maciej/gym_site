import { useState } from "react";
import {
  Box,
  ListItemButton,
  Typography,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StudentSeriesCard from "./StudentSeriesCard";

export default function StudentExerciseItem({ exercise }) {
  const [expandedSeries, setExpandedSeries] = useState(false);
  console.log("exercise");
  console.log(exercise);
  const seriesCount =
    exercise.exercises_series?.length || exercise.sets?.length || 0;
  const dataSeries = exercise.exercises_series || exercise.sets;
  const handleToggleSeries = () => {
    setExpandedSeries(!expandedSeries);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* ĆWICZENIE - NAGŁÓWEK */}
      <ListItemButton
        onClick={handleToggleSeries}
        sx={{
          p: 0.5,
          border: "1px solid #ddd",
          borderRadius: 1,
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {exercise.date ||
              exercise.name ||
              exercise.exercise_name ||
              "Nieznane ćwiczenie"}
          </Typography>

          {seriesCount > 0 && (
            <Typography variant="caption" color="textSecondary">
              {/* 📋 {seriesCount} seria{seriesCount !== 1 ? "mi" : ""} */}
            </Typography>
          )}
        </Box>

        {seriesCount > 0 && (
          <IconButton size="small" sx={{ ml: 1 }}>
            {expandedSeries ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </ListItemButton>

      {/* ROZWIJANE SERIE */}
      <Collapse in={expandedSeries} timeout="auto" unmountOnExit>
        <Box
          sx={{
            mt: 1,
            ml: 2,
            p: 0.5,
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
          }}
        >
          {seriesCount === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontStyle: "italic" }}
            >
              Brak serii
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {dataSeries.map((series, seriesIndex) => (
                <StudentSeriesCard
                  key={series.id || seriesIndex}
                  series={series}
                  seriesNumber={seriesIndex + 1}
                />
              ))}
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
