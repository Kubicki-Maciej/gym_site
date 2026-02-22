import React from "react";
import {
  Typography,
  Box,
  TextField,
  IconButton,
  Checkbox,
  Tooltip,
} from "@mui/material";
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

// pojedyńcza seria
export default function SerieRow({
  initialSerie,
  index,
  exerciseId,
  onRemoveSerie,
  exerciseType,
}) {
  const { serie, updateSerieDebounced, adJustSerie } =
    useSerieRow(initialSerie);

  console.log(initialSerie);

  return (
    <Box
      component="ExerciseBox"
      spacing={2}
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        paddingTop: 0.5,
        paddingBottom: 0.5,
        backgroundColor: serie.warm_up ? "#fff3e0" : "white",
        borderRadius: "6px",
        border: serie.warm_up ? "1px solid #ffb74d" : "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        component="SerieDeleteBox"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {serie.warm_up ? "Rozgrzewka" : `Seria ${index + 1}`}
          </Typography>
          <Tooltip title="Seria rozgrzewkowa" placement="top">
            <Checkbox
              checked={serie.warm_up || false}
              onChange={e => {
                updateSerieDebounced("warm_up", e.target.checked);
              }}
              size="small"
              sx={{
                p: "2px",
                ml: 0.5,
                color: "#ff9800",
                "&.Mui-checked": {
                  color: "#ff9800",
                },
              }}
            />
          </Tooltip>
        </Box>
        <IconButton
          color="error"
          size="small"
          onClick={() => onRemoveSerie(exerciseId, serie.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        component="InputFieldsBox"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          component="RepBox"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "6px",
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
          component="WeightBox"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "6px",
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
