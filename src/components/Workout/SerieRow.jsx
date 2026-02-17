import React from "react";
import { Stack, Typography, Box, TextField, IconButton } from "@mui/material";
import {
  Delete as DeleteIcon,
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
} from "@mui/icons-material";
import useSerieRow from "hooks/useSerieRow";
import {
  getExerciseTypeReapetsOrTime,
  getExerciseTypeWeightOrDistance,
} from "../../utils/exerciseUtils";

export default function SerieRow({
  initialSerie,
  index,
  exerciseId,
  onRemoveSerie,
  exerciseType,
}) {
  const { serie, updateSerieDebounced, adJustSerie } =
    useSerieRow(initialSerie);

  return (
    <Box
      spacing={2}
      sx={{
        p: 1,
        backgroundColor: "white",
        borderRadius: "6px",
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "row",

        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          Seria {index + 1}
        </Typography>
        <IconButton
          color="error"
          size="small"
          onClick={() => onRemoveSerie(exerciseId, serie.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">
            {getExerciseTypeReapetsOrTime(exerciseType)}
          </Typography>
          <IconButton
            size="small"
            onClick={() => adJustSerie("repeats", -1)}
            sx={{ p: "4px" }}
          >
            <RemoveCircleIcon fontSize="small" />
          </IconButton>
          <TextField
            type="number"
            value={serie.repeats}
            onChange={e => {
              updateSerieDebounced("repeats", parseInt(e.target.value) || 0);
              console.log("zmiana powtorzen");
            }}
            sx={{
              width: "70px",
              "& input": { textAlign: "center", p: "4px" },
            }}
            size="small"
          />
          <IconButton
            size="small"
            onClick={() => adJustSerie("repeats", 1)}
            sx={{ p: "4px" }}
          >
            <AddCircleIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">
            {getExerciseTypeWeightOrDistance(exerciseType)}
          </Typography>

          <TextField
            value={serie.weight}
            onChange={e => {
              updateSerieDebounced("weight", parseFloat(e.target.value) || 0);
              console.log(
                "SerieRow onChange",
                exerciseId,
                serie.id,
                e.target.value,
              );
            }}
            sx={{
              width: "70px",
              "& input": { textAlign: "center", p: "4px" },
            }}
            step="0.5"
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
}
