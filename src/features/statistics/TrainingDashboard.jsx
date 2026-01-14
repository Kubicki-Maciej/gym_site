import { WeightRepsBarChart } from "./WeightRepsBarChart";
import { MuscleEngagementPieChart } from "./MuscleEngagementPieChart";
import BestProgressExercise from "./BestProgressExercise";
import ExerciseSelectStatistic from "./ExerciseSelectStatistic";

export function TrainingDashboard({ data }) {
  if (!data) return "";
  return (
    <>
      <MuscleEngagementPieChart muscleUsage={data.muscle_usage} />
      <BestProgressExercise bestProgressExercise={data.best_progress} />
      {/* </> */}
      <ExerciseSelectStatistic data={data.monthly_exercises_log} />
    </>
  );
}
