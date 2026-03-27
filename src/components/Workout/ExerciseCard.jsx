import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Fab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { keyframes } from "@mui/system";

import SeriesEditor from "./SeriesEditor";
import RecentExercise from "../RecentExercise/RecentExercise";

const slideDown = keyframes`
  from { opacity: 0; max-height: 0; margin-top: 0; }
  to { opacity: 1; max-height: 1000px; margin-top: 8px; }
`;

const slideUp = keyframes`
  from { opacity: 1; max-height: 1000px; margin-top: 8; }
  to { opacity: 0; max-height: 0; margin-top: 0; }
`;

export default function ExerciseCard({
  exercise,
  mode = "edit",
  trainingObject,
  onSerieChange,
  onAdjustSerie,
  onAddSerie,
  onRemoveSerie,
  onDeleteExercise,
  onSerieUpdate,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const isReadonly = mode === "readonly";

  const safeExercise = useMemo(() => {
    return {
      userExerciseId: exercise?.userExerciseId ?? exercise?.id,
      exerciseId: exercise?.exerciseId ?? exercise?.exercise,
      name: exercise?.name ?? "Brak nazwy",
      exerciseSeries:
        exercise?.exerciseSeries ?? exercise?.exercises_series ?? [],
    };
  }, [exercise]);

  const handleToggleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Card elevation={1}>
      <CardContent sx={{ pb: 1 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h7" sx={{ fontWeight: 600 }}>
            {safeExercise.name}
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

        {/* CONTENT */}
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
              {safeExercise.exerciseSeries.length > 0 ? (
                <SeriesEditor
                  exercise={safeExercise}
                  readOnly={isReadonly} // 🔥 dodaj w SeriesEditor
                  onSerieChange={onSerieChange}
                  onAdjustSerie={onAdjustSerie}
                  onRemoveSerie={onRemoveSerie}
                  onSerieUpdate={onSerieUpdate}
                />
              ) : (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Brak serii
                </Typography>
              )}
            </>
          )}
        </Box>
      </CardContent>

      {/* ACTIONS */}
      {!isReadonly && (
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
            onClick={() => onDeleteExercise?.(safeExercise.userExerciseId)}
            title="Usuń ćwiczenie"
          >
            <DeleteIcon />
          </IconButton>

          <RecentExercise
            exerciseId={safeExercise.exerciseId}
            trainingObject={trainingObject}
          />

          <Fab
            size="small"
            color="success"
            aria-label="add"
            onClick={() => onAddSerie?.(safeExercise.userExerciseId)}
            sx={{
              "&:hover": {
                transform: "scale(1.15)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
          >
            <AddIcon />
          </Fab>
        </CardActions>
      )}
    </Card>
  );
}
