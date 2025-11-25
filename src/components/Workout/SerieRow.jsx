import React from "react";
import { Stack, Typography, Box, TextField, IconButton } from "@mui/material";
import {
  Delete as DeleteIcon,
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
} from "@mui/icons-material";

export default function SerieRow({
  serie,
  index,
  exerciseId,
  onSerieChange,
  onAdjustSerie,
  onRemoveSerie,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        p: 1,
        backgroundColor: "white",
        borderRadius: "6px",
        border: "1px solid #e0e0e0",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 600, minWidth: "60px" }}>
        Seria {index + 1}
      </Typography>

      {/* Powtórzenia */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="caption">Powtórzenia:</Typography>
        <IconButton
          size="small"
          onClick={() => onAdjustSerie(exerciseId, serie.id, "repeats", -1)}
          sx={{ p: "4px" }}
        >
          <RemoveCircleIcon fontSize="small" />
        </IconButton>
        <TextField
          type="number"
          value={serie.repeats}
          onChange={e =>
            onSerieChange(
              exerciseId,
              serie.id,
              "repeats",
              parseInt(e.target.value) || 0
            )
          }
          sx={{
            width: "60px",
            "& input": { textAlign: "center", p: "4px" },
          }}
          size="small"
        />
        <IconButton
          size="small"
          onClick={() => onAdjustSerie(exerciseId, serie.id, "repeats", 1)}
          sx={{ p: "4px" }}
        >
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Waga */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="caption">Waga (kg):</Typography>
        <IconButton
          size="small"
          onClick={() => onAdjustSerie(exerciseId, serie.id, "weight", -0.5)}
          sx={{ p: "4px" }}
        >
          <RemoveCircleIcon fontSize="small" />
        </IconButton>
        <TextField
          type="number"
          value={serie.weight}
          onChange={e =>
            onSerieChange(
              exerciseId,
              serie.id,
              "weight",
              parseFloat(e.target.value) || 0
            )
          }
          sx={{
            width: "70px",
            "& input": { textAlign: "center", p: "4px" },
          }}
          step="0.5"
          size="small"
        />
        <IconButton
          size="small"
          onClick={() => onAdjustSerie(exerciseId, serie.id, "weight", 0.5)}
          sx={{ p: "4px" }}
        >
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Usuń serię */}
      <IconButton
        color="error"
        size="small"
        onClick={() => onRemoveSerie(exerciseId, serie.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
