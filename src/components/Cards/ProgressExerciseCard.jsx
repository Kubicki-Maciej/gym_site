import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
export default function ProgressExerciseCard({ bestProgressExercise }) {
  if (!bestProgressExercise) return null;
  const { exercise, increase_kg, percentage } = bestProgressExercise;

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <TrendingUpIcon color="success" />
          <Typography variant="h6">Najlepszy progres</Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight="bold">
          {exercise}
        </Typography>

        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <Typography variant="h4" color="success.main">
            +{increase_kg} kg
          </Typography>

          <Chip label={`+${percentage}%`} color="success" variant="outlined" />
        </Box>
      </CardContent>
    </Card>
  );
}
