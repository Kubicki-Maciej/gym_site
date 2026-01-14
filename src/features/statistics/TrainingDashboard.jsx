import { WeightRepsBarChart } from "./WeightRepsBarChart";
import { MuscleEngagementPieChart } from "./MuscleEngagementPieChart";
import BestProgressExercise from "./BestProgressExercise";

export function TrainingDashboard({ data }) {
  return (
    <>
      <MuscleEngagementPieChart muscleUsage={data.muscle_usage} />
      <BestProgressExercise bestProgressExercise={data.best_progress} />
    </>
  );
}
