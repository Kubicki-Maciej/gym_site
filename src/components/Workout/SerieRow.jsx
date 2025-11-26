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
      {/* Powtórzenia */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-between",
          }}
        >
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
              width: "70px",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption">Waga (kg):</Typography>
          {/* <IconButton
            size="small"
            onClick={() => onAdjustSerie(exerciseId, serie.id, "weight", -0.5)}
            sx={{ p: "4px" }}
          >
            <RemoveCircleIcon fontSize="small" />
          </IconButton> */}
          <TextField
            // type="number"
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
          {/* <IconButton
            size="small"
            onClick={() => onAdjustSerie(exerciseId, serie.id, "weight", 0.5)}
            sx={{ p: "4px" }}
          >
            <AddCircleIcon fontSize="small" />
          </IconButton> */}
        </Box>
      </Box>

      {/* Usuń serię */}
    </Box>
  );
}
