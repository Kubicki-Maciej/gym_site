import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { SET_COLORS } from "./colorSetCharts";

// Mock danych
const exerciseProgress = [
  { date: "01-01", weight: 60, reps: 10 },
  { date: "01-01", weight: 70, reps: 7 },
  { date: "01-01", weight: 75, reps: 4 },
  { date: "05-01", weight: 65, reps: 9 },
  { date: "10-01", weight: 70, reps: 8 },
  { date: "15-01", weight: 75, reps: 6 },
];

// Grupowanie serii po dacie
function groupByDate(data) {
  const grouped = {};

  data.forEach(item => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  return Object.entries(grouped).map(([date, sets]) => ({
    date,
    sets: sets.map((set, index) => ({ ...set, setIndex: index })),
  }));
}

export function GroupedWeightChart() {
  // grupujemy dane
  const grouped = groupByDate(exerciseProgress);

  // maksymalna liczba serii w dniu
  const maxSets = Math.max(...grouped.map(d => d.sets.length));

  // przygotowanie chartData dla Recharts
  const chartData = grouped.map(day => {
    const obj = { date: day.date };
    day.sets.forEach(set => {
      obj[`set_${set.setIndex}`] = set.weight;
      obj[`set_${set.setIndex}_reps`] = set.reps;
    });
    return obj;
  });

  return (
    <div style={{ width: "100%", height: 320, overflowX: "auto" }}>
      <div style={{ width: chartData.length * 80, height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis
              label={{
                value: "Ciężar (kg)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              content={({ payload, label }) => {
                if (!payload?.length) return null;
                const day = chartData.find(d => d.date === label);

                return (
                  <div
                    style={{
                      background: "#fff",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <strong>{label}</strong>
                    {payload.map((item, i) => (
                      <div key={i}>
                        Seria {i + 1}: {item.value} kg ×{" "}
                        {day[`${item.dataKey}_reps`]} reps
                      </div>
                    ))}
                  </div>
                );
              }}
            />

            {Array.from({ length: maxSets }).map((_, setIndex) => (
              <Bar
                key={setIndex}
                dataKey={`set_${setIndex}`}
                barSize={14}
                radius={[6, 6, 0, 0]}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={SET_COLORS[setIndex % SET_COLORS.length]}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
