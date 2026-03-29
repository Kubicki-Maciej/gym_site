import { Grid } from "@mui/material";
import ExerciseCard from "./ExerciseCard";

const ExerciseGrid = ({ exercises, onAdd }) => {
  return (
    <Grid container spacing={2}>
      {exercises.map(ex => (
        <Grid item xs={12} sm={6} md={4} key={ex.id}>
          <ExerciseCard exercise={ex} onAdd={onAdd} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ExerciseGrid;
