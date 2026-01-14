import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// import { muscleEngagement } from "./mockData";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export function MuscleEngagementPieChart({ muscleUsage }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Zaangażowanie mięśni – cały trening</h3>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={muscleUsage}
            dataKey="count"
            nameKey="name"
            outerRadius={100}
            label
          >
            {muscleUsage.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
