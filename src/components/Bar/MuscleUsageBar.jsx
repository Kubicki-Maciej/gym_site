import { Box, Paper, Typography } from "@mui/material";

const colorsListty = [
  "#90caf9",
  "#90caf9",
  "#1976d2",
  "#1976d2",
  "#0d47a1",
  "#0d47a1",
  "#a5d6a7",
  "#a5d6a7",
  "#a5d6a7",
  "#a5d6a7",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#2e7d32",
  "#1b5e20",
  "#1b5e20",
  "#1b5e20",
  "#1b5e20",
  "#1b5e20",
  "#ffcc80",
  "#ffcc80",
  "#ed6c02",
  "#ed6c02",
  "#ed6c02",
  "#e65100",
  "#e65100",
  "#e60000",
];

const MuscleUsageBar = ({
  label = "Legenda",
  minLabel = "1",
  maxLabel = "30+",
}) => {
  const uniqueColors = [...new Set(colorsListty)];

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "center",
      }}
    >
      {label && (
        <Typography variant="caption" color="text.secondary">
          {label}:
        </Typography>
      )}

      <Typography variant="caption" color="text.secondary">
        {minLabel}
      </Typography>

      <Box
        sx={{
          display: "flex",
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
        }}
      >
        {uniqueColors.map((color, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: color,
              width: 20,
              height: 14,
            }}
          />
        ))}
      </Box>

      <Typography variant="caption" color="text.secondary">
        {maxLabel}
      </Typography>
    </Box>
  );
};

export default MuscleUsageBar;
