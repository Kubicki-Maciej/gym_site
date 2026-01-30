import { WeightRepsBarChart } from "./WeightRepsBarChart";
import { MuscleEngagementPieChart } from "./MuscleEngagementPieChart";
import BestProgressExercise from "./BestProgressExercise";
import ExerciseSelectHistory from "./ExerciseSelectHistory";

export function TrainingDashboard({ data }) {
  if (!data) return "";
  return (
    <>
      <div>Historia</div>
      <MuscleEngagementPieChart muscleUsage={data.muscle_usage} />
      <BestProgressExercise bestProgressExercise={data.best_progress} />
      {/* <ExerciseSelectHistory data={data.monthly_exercises_log} /> */}
    </>
  );
}
