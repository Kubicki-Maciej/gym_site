import { WeightRepsBarChart } from "./WeightRepsBarChart";
import { MuscleEngagementPieChart } from "./MuscleEngagementPieChart";

export function TrainingDashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h2>📈 Analiza treningu</h2>

      <WeightRepsBarChart />
      <MuscleEngagementPieChart />
    </div>
  );
}
