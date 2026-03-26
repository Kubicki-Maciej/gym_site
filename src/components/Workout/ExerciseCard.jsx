import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import SeriesEditor from "./SeriesEditor";
import { Fab } from "@mui/material";
import { keyframes } from "@mui/system";
import RecentExercise from "../RecentExercise/RecentExercise";

const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
    margin-top: 16px;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    max-height: 1000px;
    margin-top: 16px;
  }
  to {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
  }
`;

export default function ExerciseCard({
  exercise,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
  trainingObject,
  onSerieUpdate,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Card elevation={1}>
      <CardContent sx={{ pb: 1 }}>
        {/* header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h7" sx={{ fontWeight: 600 }}>
            {exercise.name}
          </Typography>
          <IconButton
            size="medium"
            onClick={handleToggleCollapse}
            title={collapsed ? "Rozwiń" : "Zwiń"}
            sx={{
              transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            animation: !collapsed
              ? `${slideDown} 0.4s ease-in-out`
              : `${slideUp} 0.4s ease-in-out`,
            overflow: "hidden",
          }}
        >
          {!collapsed && (
            <>
              {exercise.exerciseSeries?.length > 0 && (
                <SeriesEditor
                  exercise={exercise}
                  onSerieChange={onSerieChange}
                  onAdjustSerie={onAdjustSerie}
                  onRemoveSerie={onRemoveSerie}
                  onSerieUpdate={onSerieUpdate}
                />
              )}
            </>
          )}
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          pt: 0,
          px: 2,
        }}
      >
        <IconButton
          size="small"
          color="error"
          onClick={() => {
            onDeleteExercise(exercise.userExerciseId);
          }}
          title="Usuń ćwiczenie"
        >
          <DeleteIcon />
        </IconButton>
        <RecentExercise
          exerciseId={exercise.exerciseId}
          trainingObject={trainingObject}
        />
        <Fab
          size="small"
          color="success"
          aria-label="add"
          sx={{
            "&:hover": {
              transform: "scale(1.15)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          onClick={() => onAddSerie(exercise.userExerciseId)}
        >
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}
