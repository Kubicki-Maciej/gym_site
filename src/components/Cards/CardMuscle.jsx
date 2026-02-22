import { Card, Typography, Chip, Box, LinearProgress } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export default function CardMuscle({ muscle, maxValue = 30 }) {
  const getColor = value => {
    if (value <= 5) return "primary";
    if (value <= 15) return "success";
    if (value <= 25) return "warning";
    return "error";
  };

  const progress = Math.min((muscle.usage_count / maxValue) * 100, 100);
  const color = getColor(muscle.usage_count);

  return (
    <Card
      sx={{
        p: 1.5,
        width: "100%",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
          borderColor: `${color}.main`,
        },
      }}
    >
      {/* Nagłówek */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {muscle.name}
        </Typography>
        <Chip
          label={muscle.usage_count}
          color={color}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        />
      </Box>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        color={color}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "grey.200",
        }}
      />
    </Card>
  );
}
