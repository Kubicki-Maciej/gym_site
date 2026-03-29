import { Grid, Box } from "@mui/material";
import { useGetAllExercises } from "hooks/Exercises/useGetAllExercises";
import { useTrainingBuilder } from "hooks/Training/useTrainingBuilder";
import ExerciseTrainingList from "features/exercise/ExerciseTrainingList";

import SelectedTraining from "./SelectedTraining";

const TrainingBuilder = () => {
  const { data: exercises = [] } = useGetAllExercises();

  const {
    selectedExercises,
    addExercise,
    removeExercise,
    search,
    setSearch,
    filterExercises,
  } = useTrainingBuilder();

  const filtered = filterExercises(exercises);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* LEFT */}
        <Grid item xs={12} md={8}>
          <ExerciseTrainingList
            exercises={filtered}
            onAdd={addExercise}
            search={search}
            setSearch={setSearch}
            selectedExercises={selectedExercises} // 🔥 TO MUSI BYĆ
          />
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4}>
          <SelectedTraining
            exercises={selectedExercises}
            onRemove={removeExercise}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainingBuilder;
