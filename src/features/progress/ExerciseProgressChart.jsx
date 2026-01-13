import {
  ComposedChart,
  Bar,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { exerciseProgress } from "./mockData";
import { groupExercisesByDate } from "./transformData";

const data = groupExercisesByDate(exerciseProgress);

export function ExerciseProgressChart() {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <div style={{ width: data.length * 80, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />

            <YAxis
              yAxisId="left"
              label={{
                value: "Ciężar (kg)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Powtórzenia",
                angle: -90,
                position: "insideRight",
              }}
            />

            <Tooltip
              contentStyle={{ fontSize: 14 }}
              formatter={(value, name) => [
                value,
                name === "weight" ? "Ciężar (kg)" : "Powtórzenia",
              ]}
            />

            {/* Ciężar */}
            <Bar
              yAxisId="left"
              dataKey="weight"
              barSize={24}
              radius={[8, 8, 0, 0]}
            />

            {/* Powtórzenia */}
            <Scatter yAxisId="right" dataKey="reps" shape="circle" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
