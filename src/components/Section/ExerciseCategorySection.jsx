import { Typography, Grid, Box } from "@mui/material";
import ExerciseTrainingCard from "components/Cards/ExerciseTrainingCard";

const ExerciseCategorySection = ({ title, exercises, onAdd }) => {
  if (!exercises.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={2}>
        {exercises.map(ex => (
          <Grid item xs={12} sm={6} md={4} key={ex.id}>
            <ExerciseTrainingCard exercise={ex} onAdd={onAdd} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExerciseCategorySection;
