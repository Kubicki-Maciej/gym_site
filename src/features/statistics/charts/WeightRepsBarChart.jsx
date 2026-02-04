import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export function WeightRepsBarChart({data}) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Bench Press – progres ciężaru i powtórzeń</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="weight" name="Ciężar (kg)" />
          <Bar dataKey="reps" name="Powtórzenia" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
